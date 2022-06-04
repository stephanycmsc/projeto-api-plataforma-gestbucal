import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  ControllerMeta,
  ControllerRouteMetaInternal,
  ControllerTarget,
  getControllerMeta,
} from '../decorators/types';
import { printRouteMap } from './printRouteMap';

const outputRouteMap = true;

function registerRoute(
  router: Router,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any,
  basePath: string,
  route: ControllerRouteMetaInternal,
) {
  const finalPath = `${basePath}${route.path}`;
  const transform = route.transform ?? ((obj: unknown) => obj);

  router[route.type](finalPath, (req, res, next) =>
    Promise.resolve()
      .then(async () => {
        let statusCode = StatusCodes.OK;
        const result = await instance[route.functionName](req, res, next);

        if (route.type === 'post') {
          statusCode = StatusCodes.CREATED;
        }
        return res.status(statusCode).json(transform(result));
      })
      .catch(next),
  );
}

export default function collectRoutes(controllerSet: Set<ControllerTarget<unknown>>) {
  const router = Router();
  const metaList: ControllerMeta<unknown>[] = [];

  controllerSet.forEach((controller) => {
    const { basePath, constructor, routes } = getControllerMeta(controller);

    metaList.push(getControllerMeta(controller));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance: any = new constructor();

    routes.forEach((route) => {
      registerRoute(router, instance, basePath, route);
    });
  });

  if (outputRouteMap) {
    printRouteMap(metaList);
  }

  return router;
}
