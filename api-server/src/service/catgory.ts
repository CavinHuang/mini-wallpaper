import { Catgory } from './../models/entity/catgory';
import { BusinessError, BUSINESS_ERROR_CODE } from '../core/error/businessError';
import { M } from "../models";
import { FindOptionsWhere } from 'typeorm';

export class CatgoryService {

  public async getCategoryByAppid(appid: string) {
    const categories = await M(Catgory).find({
      where: { appid }
    })

    const result: Record<string, Catgory[]> = {}

    categories.forEach(cate => {
      if (Object.prototype.hasOwnProperty.call(result, cate.type)) {
        result[cate.type].push(cate)
      } else {
        result[cate.type] = [cate]
      }
    })

    return result
  }

  /**
   * 
   * @param appid 
   * @returns 
   */
   public static async getAll(where?: FindOptionsWhere<Catgory>) {
    return await M(Catgory).find({
      where
    })
  }

  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public static create(raw: Partial<Catgory>) {
    const model = M(Catgory)
    const data = model.create(raw)
    return model.save(data)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public static update(id: number, raw: Partial<Catgory>) {
    const model = M(Catgory)
    const rawData = model.findOne({
      where: {
        id
      }
    })
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }
}