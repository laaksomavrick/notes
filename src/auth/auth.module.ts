import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';

@Module({
    imports: [UserModule, CryptoModule],
    controllers: [AuthController],
    providers: [AuthService, HttpStrategy],
    exports: [AuthService]
})
export class AuthModule {}
