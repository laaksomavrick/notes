import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/database.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
