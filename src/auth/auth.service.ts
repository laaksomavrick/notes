import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../user/token/token.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {}

    async authenticate() {
        // given email and pass
        // validate email exists
        // validate password is correct
        // grab token and reply with that
    }

    async validate(token: string): Promise<User> {
        return this.userService.findOneByToken(token);
    }
}
