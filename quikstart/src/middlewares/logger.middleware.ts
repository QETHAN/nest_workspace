import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    console.log('args----->', args);
    return (req, res, next) => {
      console.log('Request...');
      next();
      console.log('Response...');
    };
  }
}
