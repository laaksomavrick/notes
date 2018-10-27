import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { Token } from './token/token.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => Token, token => token.user)
    token: Token;

    @BeforeInsert()
    async hashPassword() {
        this.password = await new CryptoService().hash(this.password);
    }
}
