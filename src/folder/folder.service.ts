import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateFolderDto } from './folder.dto';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService {
    constructor(@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>) {}

    async create({ name }: CreateFolderDto, user: User): Promise<Folder> {
        const model = this.folderRepository.create({ name });
        model.user = user;
        const folder = await this.folderRepository.save(model);
        return folder;
    }

    async findAllByUser(user: User): Promise<Folder[]> {
        return this.folderRepository.find({
            where: { userId: user.id }
        });
    }

    // update

    // delete
}
