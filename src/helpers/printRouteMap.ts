import { ControllerMeta } from '../decorators/types';

export function printRouteMap(metaList: ControllerMeta<unknown>[]) {
  console.log('Mapa de rotas:');
  console.table(
    metaList.flatMap((controller) =>
      controller.routes.map((route) => ({
        type: route.type.toUpperCase(),
        path: `${controller.basePath}${route.path}`,
        controller: controller.constructor.name,
        method: route.functionName,
      })),
    ),
  );
}
