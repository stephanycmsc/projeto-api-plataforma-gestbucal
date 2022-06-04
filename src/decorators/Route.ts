import { RequestType, ControllerRouteMeta, getControllerMeta } from './types';

function RegisterRoute(type: RequestType, params: string | ControllerRouteMeta) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, functionName: string) => {
    const ctorMeta = getControllerMeta(target.constructor);
    const paramsStruct = typeof params === 'string' ? { path: params } : params;

    ctorMeta.routes.push({ ...paramsStruct, type, functionName });
  };
}

export function Get(params: string | ControllerRouteMeta) {
  return RegisterRoute('get', params);
}

export function Put(params: string | ControllerRouteMeta) {
  return RegisterRoute('put', params);
}

export function Post(params: string | ControllerRouteMeta) {
  return RegisterRoute('post', params);
}

export function Patch(params: string | ControllerRouteMeta) {
  return RegisterRoute('patch', params);
}

export function Delete(params: string | ControllerRouteMeta) {
  return RegisterRoute('delete', params);
}
