import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../notes/notes.entity';
import { User } from '../user/user.entity';

@Entity('folders')
export class Folder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Note, note => note.folder)
    notes: Note[];

    @ManyToOne(type => User, user => user.folders)
    user: User;
}
