import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBody } from '../type/response.type';
import { HTTP_STATUS } from '../constants/common-constants';
import { CommonUtils } from '../utils/common.util';
import { ObjectFormatter } from '../utils/object-formatter.util';

@Catch(HttpException)
export class HttpExceptionFilter
  extends CommonUtils
  implements ExceptionFilter
{
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.log(`GlobalExceptionFilter 시작`);
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();
    const status = exception.getStatus();
    const message = (<any>exception.getResponse()).message;

    if (status === 500) {
      this.logger.error(exception.message, exception.stack);
    }

    const body: ResponseBody = {
      body: {
        status: HTTP_STATUS[status],
        message,
        data: null,
      },
    };

    this.logger.log(
      `GlobalExceptionFilter 종료`,
      `반환 값:\n${this.objectFormatter.format(body)}`,
    );
    
    res.status(status).json(body);
  }
}
