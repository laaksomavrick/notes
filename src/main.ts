import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppExceptionFilter } from './app/app.exception-filter';
import { AppModule } from './app/app.module';
import config from './config';

async function bootstrap() {
    const raw = await NestFactory.create(AppModule);
    const app = buildApp(raw);
    await app.listen(config.get('port'));
}

bootstrap();

export function buildApp(raw: INestApplication): INestApplication {
    raw.useGlobalFilters(new AppExceptionFilter());
    raw.enableCors();
    return raw;
}
