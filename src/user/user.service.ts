import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createWorkoutDto: CreateUserDto): Promise<User> {
    // todo: hash password
    return await this.userRepository.create(createWorkoutDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
