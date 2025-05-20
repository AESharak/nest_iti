import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TodoCreated implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    const timestamp = now.toISOString();
    console.log(timestamp, req.body);
    next();
  }
}
