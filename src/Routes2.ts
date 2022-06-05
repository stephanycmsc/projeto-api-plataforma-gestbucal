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

    this.router[route.type](finalPath, (req, res, next) =>
      Promise.resolve()
        .then(async () => {
          let statusCode = StatusCodes.OK;
          const result = await instance[route.functionName](req, res, next)

          if (route.type === 'post') statusCode = StatusCodes.CREATED
          return res.status(statusCode).json(transform(result))
        })
        .catch(next)
    )
  }
}