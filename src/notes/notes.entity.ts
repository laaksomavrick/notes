import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { User } from '../user/user.entity';

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    content: string;

    @ManyToOne(type => User, user => user.notes)
    user: User;

    @ManyToOne(type => Folder, folder => folder.notes)
    folder: Folder;
}
