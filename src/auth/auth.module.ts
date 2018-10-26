import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, HttpStrategy],
  exports: [AuthService]
})
export class AuthModule {}