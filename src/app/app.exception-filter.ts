import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    // tslint:disable-next-line:no-any
    public catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus ? exception.getStatus() : 500;
        const { name: error, message } = exception;
        response.status(status).json({
            error,
            message,
            status
        });
    }
}
