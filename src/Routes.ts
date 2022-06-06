import RoutesUtils from "./utils/RoutesUtils";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  ControllerMeta,
  ControllerRouteMetaInternal,
  ControllerTarget,
  getControllerMeta
} from "./decorators/types";
import { UserRegisterController } from "./modules/users/controllers/UserRegisterController";
import { PRINT_ROUTES_MAP } from './utils/EnvUtils'
import { BaseResponse, BaseResponseBody } from "./types";
import { ENV } from './utils/EnvUtils'

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
    const baseRes: BaseResponse<BaseResponseBody<unknown>> = { statusCode: StatusCodes.OK, body: {} }

    this.router[route.type](finalPath, (req, res, next) =>
      Promise.resolve().then(async () => {
        const result = await instance[route.functionName](req, res, next)

        if (route.type === 'post') baseRes.statusCode = StatusCodes.CREATED

        baseRes.body.status = result.status ?? 0

        if (result.message) baseRes.body.message = result.message
        if (result.data) baseRes.body.data = transform(result.data)
      }).catch(err => {
        baseRes.statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
        baseRes.body.status = err.status ?? -1
        baseRes.body.error = {
          message: err.message ?? 'Erro não mapeado.',
          detail: err.detail ?? 'Não foi possível obter mais detalhes sobre este erro.',
          stack: ENV === 'LOCAL' || ENV === 'DEV' ? err.stack : undefined
        }
      }).finally(() => res.status(baseRes.statusCode).json(baseRes.body))
    )
  }
}