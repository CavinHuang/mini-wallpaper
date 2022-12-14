import 'reflect-metadata'
import { MiniContainer } from '../container';
import { getRepository } from "typeorm";

console.log(MiniContainer)

export const Repository = (name?: string) => (cls: any) => {
  // 向 ioc 容器注册
  MiniContainer.set(name ?? cls.name, getRepository(cls));
  // 不论是否传入 key，都使用 Class 作为 key 注册一份
  // Container.set(cls, getRepository(cls));
}

export const Repo = Repository
