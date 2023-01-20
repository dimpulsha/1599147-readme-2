import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator<string, ExecutionContext>(
  (data, context) => {
    const req = context.switchToHttp().getRequest();
    
    return req.user.id;
  }
);
