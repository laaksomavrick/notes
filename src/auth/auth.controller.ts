import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async authenticate(@Body() payload: AuthDto): Promise<User> {
        const { email, password } = payload;
        return this.authService.authenticate(email, password);
    }
}
