import faker from 'faker';
import { getManager } from 'typeorm';

export const factories = {
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
        : Promise.all(Array(times).map(async _ => manager.save(model, params)));
}
