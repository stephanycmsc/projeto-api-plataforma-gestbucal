export type RequestType = 'get' | 'put' | 'post' | 'delete' | 'patch';

export const CONTROLLER_META = '__controller_meta_key';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControllerTransformCallback = (obj: any) => any;

export type RoutePermissionCallback = (permissions: string[]) => boolean;

export type ControllerRouteMeta = {
  path: string;
  permissions?: RoutePermissionCallback;
  transform?: ControllerTransformCallback;
};

export type ControllerTarget<T> = new () => T;

export type ControllerRouteMetaInternal = ControllerRouteMeta & {
  functionName: string;
  type: RequestType;
};

export type ControllerMeta<T> = {
  constructor: ControllerTarget<T>;
  basePath: string;
  routes: Array<ControllerRouteMetaInternal>;
};

export function getControllerMeta(target: ControllerTarget<unknown>) {
  const ctor = target as unknown as { [CONTROLLER_META]: ControllerMeta<unknown> };

  if (!ctor[CONTROLLER_META]) {
    ctor[CONTROLLER_META] = {
      constructor: target,
      basePath: '',
      routes: [],
    };
  }
  return ctor[CONTROLLER_META];
}
