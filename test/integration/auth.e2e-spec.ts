import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { create } from '../../lib/factory';
import { AppModule } from '../../src/app/app.module';
import { AuthModule } from '../../src/auth/auth.module';
import { User } from '../../src/user/user.entity';
import { UserModule } from '../../src/user/user.module';
import { cleanDatabase } from '../test.utils';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, UserModule, AuthModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('does nothing', async () => {
        return true;
    });

    afterEach(async () => {
        await cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });
});
