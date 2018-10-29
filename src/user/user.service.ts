import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { Token } from './token/token.entity';
import { TokenService } from './token/token.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly cryptoService: CryptoService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {}

    async create({ email, password }: CreateUserDto): Promise<User> {
        // todo confirm user doesn't already exist
        const exists = await this.findOneByEmailWithToken(email);
        if (exists) {
            throw new ForbiddenException();
        }
        const hashed = await this.cryptoService.hash(password);
        const model = this.userRepository.create({ email, password: hashed });
        const user = await this.userRepository.save(model);
        const token = await this.tokenService.generate(user);
        user.token = token;
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneByToken(input: string): Promise<User> {
        const token = await this.tokenRepository.findOne({
            where: { token: input },
            relations: ['user']
        });
        return token.user;
    }

    async findOneByEmailWithToken(input: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email: input },
            relations: ['token']
        });
    }
}
