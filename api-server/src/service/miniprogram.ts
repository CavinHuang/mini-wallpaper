/**
 * 小程序
 */
import { M } from '../models';
import { BaseService } from './baseService';
import { MiniProgram as MiniProgramEntity } from '../models/entity/miniprogram'
import { SelectQueryBuilder } from 'typeorm';
import { Pagination } from '@/core';
export class MiniProgram extends BaseService {
  static getInfoByAppid(appId: string) {
    return M(MiniProgramEntity).findOne({
      where: { appid: appId }
    })
  }

  /**
   * 获取分页数据
   * @param type 资源类型
   * @param pageNum 当前页数
   * @param pageSize 总条数
   * @param extralWhere 额外的where条件
   * @returns Promise<Pagination>
   */
  public static async getPageData({ pageNum = 1, pageSize = 10, offset, limit}: { pageNum: number, pageSize: number, offset?: number, limit?: number }, extral?: {
    where: (query: SelectQueryBuilder<MiniProgramEntity>) => SelectQueryBuilder<MiniProgramEntity>
  }) {
    let query = M(MiniProgramEntity).createQueryBuilder('u')

    if (extral && extral.where) {
      query = extral.where(query)
    }

    query = query.addOrderBy('u.create_at', 'DESC').addOrderBy('u.id', 'DESC')

    const result = await Pagination.findByPage(query, { pageNum, pageSize, offset, limit })

    return result
  }

  /**
   * 创建新的小程序
   * @param raw 
   * @returns 
   */
  public static createMiniProgram(raw: Partial<MiniProgramEntity>) {
    const model = M(MiniProgramEntity)
    const data = model.create(raw)

    return model.save(data)
  }

  /**
   * 更新小程序信息
   * @param id 
   * @param raw 
   * @returns 
   */
  public static async updateMiniProgram(id: number, raw: Partial<MiniProgramEntity>) {
    const model = M(MiniProgramEntity)
    const miniData = await model.findOne({
      where: { id }
    })
    const data = Object.assign(miniData, raw)
    return model.save(data)
  }
}
