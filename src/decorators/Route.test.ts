import Controller from './Controller';
import { Get, Put, Post, Delete, Patch } from './Route';
import { getControllerMeta } from './types';

@Controller('base_url')
class TestController {
  @Get({
    path: 'get_route',
    transform: (obj) => obj,
  })
  getRoute() {
    //
  }

  @Put({
    path: 'put_route',
  })
  putRoute() {
    //
  }

  @Post({
    path: 'post_route',
  })
  postRoute() {
    //
  }

  @Delete({
    path: 'delete_route',
  })
  deleteRoute() {
    //
  }

  @Patch({
    path: 'patch_route',
  })
  patchRoute() {
    //
  }
}

describe('Router', () => {
  ['Get', 'Put', 'Post', 'Delete', 'Patch'].forEach((variant) => {
    const method = `${variant.toLowerCase()}Route`;

    it(`deve ter mapeado a rota do tipo "${variant}" no metodo ${method}`, () => {
      const meta = getControllerMeta(TestController);

      expect(meta).toBeTruthy();
      expect(meta.basePath).toEqual('base_url');
      expect(meta.routes).toBeInstanceOf(Array);

      const route = meta.routes.find((r) => r.type === variant.toLowerCase());
      expect(route).toBeTruthy();
      expect(route!.path).toBe(`${variant.toLowerCase()}_route`);
      expect(route!.functionName).toBe(method);

      if (variant === 'Get') {
        expect(route!.transform).toBeTruthy();
      } else {
        expect(route!.transform).toBeUndefined();
      }
    });
  });
});
