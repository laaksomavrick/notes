import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token/token.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {}

    async create(createWorkoutDto: CreateUserDto): Promise<User> {
        // todo: hash password
        const user = this.userRepository.create(createWorkoutDto);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneByToken(token: Token): Promise<User> {
        // todo
        return null;
    }
}
