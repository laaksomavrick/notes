import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { create, factories } from '../../lib/factory';
import { AppModule } from '../../src/app/app.module';
import { buildApp } from '../../src/main';
import { User } from '../../src/user/user.entity';
import { UserService } from '../../src/user/user.service';
import { cleanDatabase } from '../test.utils';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let userService: UserService;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        userService = moduleFixture.get<UserService>(UserService);

        const raw = moduleFixture.createNestApplication();
        app = buildApp(raw);
        await app.init();
    });

    it('can authorize a user with a valid password', async () => {
        const payload = factories.User();
        await userService.create(payload);
        const response = await request(app.getHttpServer())
            .post('/auth')
            .send(payload);
        expect(response.status).toEqual(201);
        expect(response.body.token).toBeDefined();
        expect(response.body.email).toEqual(payload.email);
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
