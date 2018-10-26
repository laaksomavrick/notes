import faker from 'faker';
import { getManager } from 'typeorm';

const factories = {
    User: () => {
        return {
            email: faker.internet.email(),
            password: faker.internet.password()
        };
    }
};

export async function create<T>(
    model: new () => T,
    params: object = null,
    times: number = 1
): Promise<object | object[]> {
    const manager = getManager();
    params = params ? params : factories[model.name]();
    return times === 1
        ? manager.save(model, params)
        : Array(times).map(async _ => await manager.create(model, params));
}
