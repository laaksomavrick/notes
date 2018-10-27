import { NestFactory } from '@nestjs/core';
import { AppExceptionFilter } from './app/app.exception-filter';
import { AppModule } from './app/app.module';
import config from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AppExceptionFilter());
    app.enableCors();
    await app.listen(config.get('port'));
}
bootstrap();
