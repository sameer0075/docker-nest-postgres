import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwtDecode from 'jwt-decode';

function indexFind(value) {
  return value == 'Authorization';
}
export const LoggedInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let index = request.res.req.rawHeaders.findIndex(indexFind)
    if(index !== -1) {
      const BearerToken = request.res.req.rawHeaders[index + 1]
      const token = BearerToken.split('Bearer')[1]
      let user = jwtDecode(token)
      return user;
    }
  },
);