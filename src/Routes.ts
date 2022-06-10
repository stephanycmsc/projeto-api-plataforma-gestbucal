import RoutesUtils from "./utils/RoutesUtils";
import ExceptionsUtils from './utils/ExceptionsUtils'
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  ControllerMeta,
  ControllerRouteMetaInternal,
  ControllerTarget,
  getControllerMeta
} from "./types";
import { UserRegisterController } from "./modules/users/controllers/UserRegisterController";
import { PRINT_ROUTES_MAP } from './utils/EnvUtils'
import { BaseResponse } from "./types";
import { ENV } from './utils/EnvUtils'
import { validationResult } from "express-validator";
import { ExceptionCodesEnum } from "./enums";

export default class Routes {
  private router = Router()
  private routesUtils = new RoutesUtils()
  private controllerSet = new Set<ControllerTarget<unknown>>([UserRegisterController])

  registerControllers() {
    const metaList: ControllerMeta<unknown>[] = []
    this.controllerSet.forEach((controller) => {
      const { basePath, constructor, routes } = getControllerMeta(controller)
      const instance: any = new constructor()

      metaList.push(getControllerMeta(controller))
      routes.forEach((route) => this.registerRoute(instance, basePath, route))
    })

    if (PRINT_ROUTES_MAP === 'true') this.routesUtils.printRouteMap(metaList)

    return this.router
  }

  private registerRoute(instance: any, basePath: string, route: ControllerRouteMetaInternal) {
    const finalPath = `${basePath}${route.path}`
    const transform = route.transform ?? ((obj: unknown) => obj)
    const validator = route.validator ?? ((obj: unknown) => obj)
    let baseRes: BaseResponse<unknown> = { statusCode: StatusCodes.OK, body: {} }

    this.router[route.type](finalPath, validator, (req: any, res: any, next: any) =>
      Promise.resolve().then(async () => {
        /** O front nunca deverá receber essa mensagem de erro, pois estas validações devem barrar o usúario de fazer uma <request>. */
        const errors = validationResult(req).array().map(err => new ExceptionsUtils(ExceptionCodesEnum.INVALID_REQUEST_PARAMS, `Campo inválido: <${err.param}>. ${err.msg}`))

        if (errors.length !== 0) throw errors

        const result = await instance[route.functionName](req, res, next)

        if (route.type === 'post') baseRes.statusCode = StatusCodes.CREATED

        baseRes.body.status = result.status ?? 0

        if (result.message) baseRes.body.message = result.message
        if (result.data) baseRes.body.data = transform(result.data)
      }).catch(err => {
        if (!Array.isArray(err)) err = [err]

        //TODO: Verificar se esse [0] não vai dar peteco.
        baseRes.statusCode = err[0].statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
        baseRes.body.status = err[0].status ?? -1
        baseRes.body.errors = err.map(e => ({
          message: e.message ?? 'Erro não mapeado.',
          detail: e.detail ?? 'Não foi possível obter mais detalhes sobre este erro.',
          stack: ENV === 'LOCAL-1' || ENV === 'DEV' ? e.stack : undefined
        }))
      }).finally(() => {
        const temp = JSON.parse(JSON.stringify(baseRes))
        baseRes = { statusCode: StatusCodes.OK, body: {} }
        return res.status(temp.statusCode).json(temp.body)
      })
    )
  }
}