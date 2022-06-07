import {
  ControllerRouteMeta,
  ControllerTarget,
  getControllerMeta,
  RequestType
} from "./types";

export function Controller<T>(basePath = '') {
  return (target: ControllerTarget<T>) => {
    const ctor = getControllerMeta(target)
    ctor.basePath = basePath
  }
}

export function Get(params: string | ControllerRouteMeta) {
  return RegisterRoute('get', params)
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

function RegisterRoute(type: RequestType, params: string | ControllerRouteMeta) {
  return (target: any, functionName: string) => {
    const ctorMeta = getControllerMeta(target.constructor)
    const paramsStruct = typeof params === 'string' ? { path: params } : params

    ctorMeta.routes.push({ ...paramsStruct, type, functionName })
  }
}