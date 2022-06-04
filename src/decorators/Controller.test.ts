import Controller from './Controller';
import { getControllerMeta } from './types';

@Controller('path_teste')
class TestController {}

describe('Controller', () => {
  it('deve conter dados de decorator na classe definida', () => {
    const meta = getControllerMeta(TestController);

    expect(meta).toBeTruthy();
    expect(meta.basePath).toEqual('path_teste');
    expect(meta.routes).toBeInstanceOf(Array);
    expect(meta.constructor).toBe(TestController.prototype.constructor);
  });
});
