import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token/token.entity';
import { TokenService } from './token/token.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Token])],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [UserService, TokenService]
})
export class UserModule {}
