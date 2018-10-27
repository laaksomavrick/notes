import { Injectable } from '@nestjs/common';
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

    async create(createWorkoutDto: CreateUserDto): Promise<User> {
        const model = this.userRepository.create(createWorkoutDto);
        const hashed = await this.cryptoService.hash(model.password);
        model.password = hashed;
        const user = await this.userRepository.save(model);
        await this.tokenService.generate(user);
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
}
