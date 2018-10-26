import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { create } from '../../lib/factory';
import { AppModule } from '../../src/app/app.module';
import { User } from '../../src/user/user.entity';
import { UserModule } from '../../src/user/user.module';
import { cleanDatabase } from '../test.utils';

describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, UserModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET users', async () => {
        const user = {
            id: 1,
            email: 'laakso.mavrick@gmail.com',
            password: 'password'
        };

        await create(User, user);

        const response = await request(app.getHttpServer()).get('/users');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([user]);
    });

    afterEach(async () => {
        await cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });
});
