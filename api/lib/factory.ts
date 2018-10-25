import { getManager } from 'typeorm';

// todo check for factory fns; faker
export async function create<T>(
  model: new () => T,
  params: object,
  times: number = 1,
): Promise<void> {
  const manager = getManager();
  if (times === 1) {
    await manager.save(model, params);
  } else {
    Array(times).map(async _ => await manager.create(model, params));
  }
}
