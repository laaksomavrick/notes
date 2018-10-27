import { getConnection } from 'typeorm';

export async function cleanDatabase() {
    const entities = await getEntities();
    await cleanAll(entities);
}

async function getEntities() {
    const entities = [];
    (await (await getConnection()).entityMetadatas).forEach(x =>
        entities.push({ name: x.name, tableName: x.tableName })
    );
    return entities;
}

async function cleanAll(entities) {
    try {
        for (const entity of entities) {
            await getConnection().query(`TRUNCATE TABLE ${entity.tableName} CASCADE`);
        }
    } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
}
