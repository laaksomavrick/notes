import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { Token } from '../user/token/token.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly cryptoService: CryptoService,
        private readonly userService: UserService,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {}

    async authenticate(email: string, password: string): Promise<User> {
        const user = await this.userService.findOneByEmailWithToken(email);
        if (!user) {
            throw new NotFoundException();
        }
        const passwordMatches = await this.cryptoService.check(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async validate(token: string): Promise<User> {
        return this.userService.findOneByToken(token);
    }
}
