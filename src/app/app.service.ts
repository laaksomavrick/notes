import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    root(): object {
        return { message: 'Hello, World!' };
    }
}
