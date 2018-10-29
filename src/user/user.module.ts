import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from '../crypto/crypto.module';
import { FolderModule } from '../folder/folder.module';
import { Token } from './token/token.entity';
import { TokenService } from './token/token.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Token]), CryptoModule, FolderModule],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [UserService, TokenService]
})
export class UserModule {}
