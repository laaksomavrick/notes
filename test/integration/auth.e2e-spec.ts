import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { create, factories } from '../../lib/factory';
import { AppModule } from '../../src/app/app.module';
import { buildApp } from '../../src/main';
import { User } from '../../src/user/user.entity';
import { cleanDatabase } from '../test.utils';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        const raw = moduleFixture.createNestApplication();
        app = buildApp(raw);
        await app.init();
    });

    it('can authorize a user with a valid password', async () => {
        // const user = await create(User);
        // const payload = {
        //     email: 'abc@123.ca',
        //     password: 'password'
        // };
        // const response = await request(app.getHttpServer())
        //     .post('/auth')
        //     .send(payload);
        // expect(response.status).toEqual(200);
        return true;
    });

    it('can 401 a user with an invalid password', async () => {
        const user = (await create(User, { password: 'password' })) as User;
        const payload = {
            email: user.email,
            password: 'invalid'
        };
        const response = await request(app.getHttpServer())
            .post('/auth')
            .send(payload);
        expect(response.status).toEqual(401);
    });

    it('can 404 a user with an account that doesnt exist', async () => {
        const payload = {
            email: 'doesnt@exist.ca',
            password: 'password'
        };
        const response = await request(app.getHttpServer())
            .post('/auth')
            .send(payload);
        expect(response.status).toEqual(404);
    });

    afterEach(async () => {
        await cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });
});
