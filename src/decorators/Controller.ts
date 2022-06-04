import { ControllerTarget, getControllerMeta } from './types';

export default function Controller<T>(basePath = '') {
  return (target: ControllerTarget<T>) => {
    const ctor = getControllerMeta(target);
    ctor.basePath = basePath;
  };
}
