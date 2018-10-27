import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { factories } from '../../lib/factory';
import { AppModule } from '../../src/app/app.module';
import { buildApp } from '../../src/main';
import { cleanDatabase } from '../test.utils';

describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        const raw = moduleFixture.createNestApplication();
        app = buildApp(raw);
        await app.init();
    });

    it('creates a user with a valid payload', async () => {
        const payload = factories.User();
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(payload);
        expect(response.status).toEqual(201);
        expect(response.body.email).toBe(payload.email);
    });

    it('does not create a user with an invalid payload', async () => {
        const payload = {};
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(payload);
        expect(response.status).toEqual(400);
    });

    afterEach(async () => {
        await cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });
});
