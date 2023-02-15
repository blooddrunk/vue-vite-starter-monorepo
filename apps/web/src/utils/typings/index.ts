import { Ref, App } from 'vue';

export * from './auth';
export * from './misc';

export * from './biz';

export type MaybeRef<T> = T | Ref<T>;

export type DeepMaybeRef<T> = T extends Ref<infer V>
  ? MaybeRef<V>
  : T extends Array<any> | object
  ? { [K in keyof T]: DeepMaybeRef<T[K]> }
  : MaybeRef<T>;

export type UserPlugin = (app: App) => void | Promise<void>;
