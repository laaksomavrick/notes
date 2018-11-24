import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Note])],
    controllers: [],
    providers: []
})
export class NoteModule {}
