import { ValueTransformer } from "typeorm";
import { isNullOrUndefined } from '@/utils/is';

export class ArrayStringTransformer implements ValueTransformer {
  constructor(private readonly defaultValue? : string | string[]) {}

  /**
   * 取出时
   * @param value 
   */
  from(value: string) {
    return value ? value.split(';') : []
  }

  /**
   * 存起来时
   * @param value 
   */
  to(value: string | string[]) {
    if (isNullOrUndefined(value)) {
      value = this.defaultValue as string | string[]
    }
    if (isNullOrUndefined(value)) return

    if (Array.isArray(value)) {
      value = value.join(';')
    }
    return value
  }


}