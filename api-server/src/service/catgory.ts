import { Catgory } from './../models/entity/catgory';
import { BusinessError, BUSINESS_ERROR_CODE } from '../core/error/businessError';
import { M } from "../models";

export class CatgoryService {

  public async getCategoryByAppid(appid: string) {
    const categories = await M(Catgory).find({
      where: { appid }
    })

    const result: Record<string, Catgory> = {}

    categories.forEach(cate => {
      result[cate.type] = cate
    })

    return result
  }
}