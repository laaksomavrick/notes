import { ConnectionOptions, createConnection, getManager } from 'typeorm';
import { dbConfig } from '../src/db/database.module';
import { Token } from '../src/user/token/token.entity';
import { User } from '../src/user/user.entity';
import { cleanDatabase } from './db';
import { create, factories } from './factory';

import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { TokenService } from '../src/user/token/token.service';

// todo clean this up

const seed = async () => {
    try {
        // await createConnection(dbConfig as ConnectionOptions);

        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        await cleanDatabase();

        const tokenService = moduleFixture.get<TokenService>(TokenService);

        await create(User, null, 5);

        const users = await getManager().find(User);

        users.forEach(async user => {
            await tokenService.generate(user);
        });

        // create tokens associated with those users
        // (users as User[]).forEach(async user => {
        //     // await create(Token, { userId: user.id });
        //     const tokenPayload = factories.Token({ userId: user.id });
        //     user.save();
        // });
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error('Seeding database failed');
        // tslint:disable-next-line:no-console
        console.error(e);
    }
};

seed();
