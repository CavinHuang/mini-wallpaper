import { isObject } from '@/utils';
import 'reflect-metadata'
import { APPLICATION_CONTEXT_KEY } from '../decorator/constant';

type ClassStruct<T = any> = (new (...args: any[]) => T ) | any;
type ServiceKey<T = any> = string | ClassStruct<T> | Function;

export class Container {
  public static propertyRegistry: Map<string, string> = new Map();

  public static services: Map<ServiceKey, ClassStruct> = new Map();

  public static set(key: ServiceKey, value: ClassStruct): void {
    Container.services.set(key, value);
  }

  public static get<T = any>(key: string): T | undefined {
    // 检查是否注册
    const Cons = Container.services.get(key);

    if (!Cons) {
      return undefined;
    }

    // 实例化这个类
    const ins = !isObject(Cons) ? new Cons() : Cons;

    // 遍历注册信息
    for (const info of Container.propertyRegistry) {
      // 注入标识符与要注入类的标识符
      const [injectKey, serviceKey] = info;
      // 拆分为 Class 名与属性名
      const [classKey, propKey] = injectKey.split(':');

      // 如果不是这个类，就跳过
      if (classKey !== Cons.name) continue;
      // 取出需要注入的类，这里拿到的是已经实例化的
      const target = Container.get(serviceKey);
      if (target) {
        // 赋值给对应的属性
        ins[propKey] = target;
      }
    }
     if (
      ins && 
      Object.prototype.hasOwnProperty.call(ins, '_injectAbleKey') &&
      Object.prototype.hasOwnProperty.call(ins, '_injectHandler')
    ) {
      ins[ins['_injectHandler']](ins[ins['_injectAbleKey']])
    }

    return ins;
  }

  private constructor() {}
}

export const MiniContainer = Container

export function Provide(key?: string): ClassDecorator {
  return (Target) => {
    Container.set(key ?? Target.name, Target as unknown as ClassStruct);
    // 不论是否传入 key，都使用 Class 作为 key 注册一份
    Container.set(Target, Target as unknown as ClassStruct);
  };
}

export const Service = Provide

export function Inject(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata('design:type', target, propertyKey)
    );
  };
}

/**
 * binding getter method for decorator
 *
 * @param prop
 * @param instance
 * @param getterHandler
 */
function defineGetterPropertyValue(prop, instance, getterHandler) {
    if (prop && getterHandler) {
      if (prop.propertyName) {
        Object.defineProperty(instance, prop.propertyName, {
          get: () => {
            // getterHandler(prop.propertyName, prop.metadata ?? {}, instance)
          },
          configurable: true, // 继承对象有可能会有相同属性，这里需要配置成 true
          enumerable: true,
        });
      }
    }
  }

export function Context() {
  return (target, propertyKey) => {
    const data = Container.get(APPLICATION_CONTEXT_KEY)
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      data
    );
  }
}