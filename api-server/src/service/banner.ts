import { Banner } from './../models/entity/banner';
import { M } from "../models";
import { FindOptionsWhere } from 'typeorm';

export class BannerService {
  public async getBannerByAppid(appid: string) {
    const banners = await M(Banner).find({
      where: { appid }
    })
    return banners
  }

  /**
   * 
   * @param appid 
   * @returns 
   */
   public static async getAll(where?: FindOptionsWhere<Banner>) {
    const banners = await M(Banner).find({
      where
    })
    return banners
  }

  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public static create(raw: Partial<Banner>) {
    const model = M(Banner)
    const data = model.create(raw)
    return model.save(data)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public static update(id: number, raw: Partial<Banner>) {
    const model = M(Banner)
    const rawData = model.findOne({
      where: {
        id
      }
    })
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }
}