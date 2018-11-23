import faker from 'faker';
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';
import config from '../src/config';

export const factories = {
    User: (params = null) => ({
        email: faker.internet.email(),
        // this is 'qweqweqwe'
        password: '$2b$10$Ai/AaD79Sib0A2aBEgBSrebmI9hglZUgZhyRltDxY2WtHhZtrKfpK'
    }),
    Token: params => {
        const { userId } = params;
        return {
            token: jwt.sign({ id: userId.id }, config.get('secret.jwt')),
            userId
        };
    }
};

export async function create<T>(
    model: new () => T,
    params: object = null,
    times: number = 1
): Promise<object | object[]> {
    const manager = getManager();
    return times === 1
        ? createModel(manager, model, params)
        : Promise.all(
              Array(times)
                  .fill(null)
                  .map(async _ => createModel(manager, model, params))
          );
}

const getParams = (model, params) =>
    params !== null
        ? { ...factories[model.name](params), ...params }
        : factories[model.name](params);

const createModel = (manager, model, params) => {
    const instanceParams = getParams(model, params);
    return manager.save(model, instanceParams);
};
