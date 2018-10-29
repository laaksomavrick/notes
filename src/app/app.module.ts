import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/database.module';
import { FolderModule } from '../folder/folder.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppExceptionFilter } from './app.exception-filter';
import { AppService } from './app.service';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule, forwardRef(() => FolderModule)],
    controllers: [AppController],
    providers: [AppService, AppExceptionFilter]
})
export class AppModule {}
