import { Test } from '@nestjs/testing';
import { getManager } from 'typeorm';
import { AppModule } from '../src/app/app.module';
import { FolderService } from '../src/folder/folder.service';
import { TokenService } from '../src/user/token/token.service';
import { User } from '../src/user/user.entity';
import { cleanDatabase } from './db';
import { create, factories } from './factory';

const seed = async () => {
    try {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        await cleanDatabase();
        const tokenService = moduleFixture.get<TokenService>(TokenService);
        const folderService = moduleFixture.get<FolderService>(FolderService);

        await create(User, null, 5);
        const users = await getManager().find(User);

        users.forEach(async user => {
            await tokenService.generate(user);
            Array(5)
                .fill(null)
                .forEach(async _ => {
                    await folderService.create(factories.Folder(), user);
                });
        });

        process.exit(1);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error('Seeding database failed');
        // tslint:disable-next-line:no-console
        console.error(e);
    }
};

seed();
