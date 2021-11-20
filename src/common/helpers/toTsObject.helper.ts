export async function toObject<T>(object: T): Promise<T> {
  return JSON.parse(JSON.stringify(object));
}
