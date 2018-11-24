import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { Note } from '../notes/notes.entity';
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

    @OneToMany(type => Folder, folder => folder.user)
    folders: Folder[];

    @OneToMany(type => Note, note => note.user)
    notes: Note[];
}
