import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${responseTime}ms - ${ip}`,
      );
    });

    next();
  }
}
