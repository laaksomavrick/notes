import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Get()
    // async findAll(): Promise<User[]> {
    //     return this.userService.findAll();
    // }

    // @Get('protected')
    // @UseGuards(AuthGuard('bearer'))
    // async findAllProtected(): Promise<User[]> {
    //     // todo delete, here for testing in dev
    //     return this.userService.findAll();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() payload: CreateUserDto): Promise<User> {
        return this.userService.create(payload);
    }
}
