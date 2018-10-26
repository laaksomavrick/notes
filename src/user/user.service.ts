import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token/token.entity';
import { TokenService } from './token/token.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly tokenService: TokenService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {}

    async create(createWorkoutDto: CreateUserDto): Promise<User> {
        // todo: hash password
        const model = this.userRepository.create(createWorkoutDto);
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
