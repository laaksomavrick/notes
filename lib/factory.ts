import faker from 'faker';
import { getManager } from 'typeorm';

export const factories = {
    User: () => ({
        email: faker.internet.email(),
        // this is 'qweqweqwe'
        password: '$2b$10$Ai/AaD79Sib0A2aBEgBSrebmI9hglZUgZhyRltDxY2WtHhZtrKfpK'
    }),
    Folder: () => ({
        name: faker.random.word()
    })
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
    params !== null ? { ...factories[model.name](), ...params } : factories[model.name]();

const createModel = (manager, model, params) => {
    const instanceParams = getParams(model, params);
    return manager.save(model, instanceParams);
};
