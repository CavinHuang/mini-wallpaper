/**
 * service基类
 */

import { M } from "@/models";

export class BaseService<ModelRepo = Record<string, any>> {

  public entity: any;
  
  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public create(raw: Partial<ModelRepo>) {
    const model = M(this.entity)
    const data = model.create(raw)
    return model.save(data)
  }

  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public delete(id: number) {
    return this.update(id, { delete_at: new Date() } as any)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public update(id: number, raw: Partial<ModelRepo>) {
    const model = M(this.entity)
    const rawData = model.findOne({
      where: {
        id
      }
    })
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }
}