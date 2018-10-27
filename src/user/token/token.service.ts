import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import config from '../../config';
import { User } from '../user.entity';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
    constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) {}

    async generate(user: User): Promise<Token> {
        const token = jwt.sign({ id: user.id }, config.get('secret.jwt'));
        const model = this.tokenRepository.create({ token, user });
        return this.tokenRepository.save(model);
    }
}
