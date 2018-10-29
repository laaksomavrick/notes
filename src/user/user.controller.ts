import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() payload: CreateUserDto): Promise<User> {
        return this.userService.create(payload);
    }
}
