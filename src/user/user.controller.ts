import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @UseGuards(AuthGuard('bearer'))
    async me(@Req() req): Promise<User> {
        return req.user;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() payload: CreateUserDto): Promise<User> {
        return this.userService.create(payload);
    }
}
