export function exclude<T = any, Key extends keyof T = any>(
  user: T,
  ...keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export function excludeDefaults(entity: any) {
  return exclude(entity, "id", "deleted");
}
