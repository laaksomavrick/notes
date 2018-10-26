import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
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

    async validate(token: string): Promise<User> {
        // todo model
        // return this.userService.findOneByToken(model);
        return null;
    }

    async generate(user: User): Promise<Token> {
        const token = jwt.sign({ id: user.id }, 'todo a secret');
        const model = this.tokenRepository.create({token, user});
        return this.tokenRepository.save(model);
    }
}
