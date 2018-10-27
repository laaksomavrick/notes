import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, 10);
    }

    async check(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}
