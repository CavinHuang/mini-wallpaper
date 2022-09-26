/**
 * service基类
 */

import { Pagination } from "@/core";
import { M } from "@/models";
import { Repository, DeepPartial, FindOptionsWhere, SelectQueryBuilder } from "typeorm";

export class BaseService<ModelRepo = Record<string, any>> {

  public entity: Repository<ModelRepo>;

  public setEntity(repo: Repository<ModelRepo>) {
    console.log('======')
    this.entity = repo
  }

  /**
   * 获取分页数据
   * @param type 资源类型
   * @param pageNum 当前页数
   * @param pageSize 总条数
   * @param extralWhere 额外的where条件
   * @returns Promise<Pagination>
   */
  public async getPageList(
    { pageNum = 1, pageSize = 10, offset = 0, limit = 15, alias = ''},
    extral?: (query: SelectQueryBuilder<ModelRepo>) => SelectQueryBuilder<ModelRepo>
  ) {
    let query = this.entity.createQueryBuilder(alias)

    if (extral) {
      query = extral(query)
    }
    const result = await Pagination.findByPage(query, { pageNum, pageSize, offset, limit })
    return result
  }

  /**
   * 获取单个数据的信息
   * @param id 
   * @returns 
   */
  public info(id: number) {
    return this.entity.findOne({
      where: {
        id
      } as unknown as FindOptionsWhere<ModelRepo>
    })
  }
  
  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public create(raw: DeepPartial<ModelRepo>) {
    const model = this.entity
    const data = model.create(raw)
    console.log("🚀 ~ file: baseService.ts ~ line 25 ~ BaseService<ModelRepo ~ create ~ data", data)
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
  public async update(id: number, raw: DeepPartial<ModelRepo>) {
    const model = this.entity
    const rawData = await model.findOne({
      where: {
        id
      } as unknown as FindOptionsWhere<ModelRepo>
    })
    console.log("🚀 ~ file: baseService.ts ~ line 63 ~ BaseService<ModelRepo ~ update ~ rawData", rawData)
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }

  public _injectAbleKey = 'repository'
  public _injectHandler = 'setEntity'
}