/**
 * service基类
 */

import { Pagination } from "@/core";
import { Repository, DeepPartial, FindOptionsWhere, SelectQueryBuilder, IsNull, getConnection, QueryRunner, EntityTarget, FindOptionsSelect } from 'typeorm';
import { BusinessError } from '../core/error/businessError';

export class BaseService<ModelRepo = Record<string, any>> {
  constructor() {}

  public entity: Repository<ModelRepo>;

  public hiddens: string[] = []

  public setEntity(repo: Repository<ModelRepo>) {
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
  public async getPageList<T = unknown>(
    { pageNum, pageSize, offset, limit, alias = ''}: { pageNum?: number; pageSize?: number; offset?: number; limit?: number; alias?: string },
    extral?: (query: SelectQueryBuilder<T & ModelRepo>) => SelectQueryBuilder<T & ModelRepo>,
    resultHandler?: (res: any[]) => any[] 
  ) {
    try {
      let query = this.entity.createQueryBuilder(alias).where({
        delete_at: IsNull()
      }) as SelectQueryBuilder<T & ModelRepo>

      if (extral) {
        query = extral(query)
      }
      const result = await Pagination.findByPage(query, { pageNum, pageSize, offset, limit }, resultHandler)
      return result
    } catch (e) {
      throw e
    }
  }

  /**
   * 获取单个数据的信息
   * @param id 
   * @returns 
   */
  public info(id: number) {
    return this.getInfo({ id })
  }

  public getInfo<T = unknown>(where: FindOptionsWhere<T>, extra?: {
    select?: FindOptionsSelect<T>
  }) {
    const extraOptions = extra && extra.select ? { select: extra.select } : {} as any
    return this.entity.findOne({
      where: {
        ...where,
        delete_at: IsNull()
      } as unknown as FindOptionsWhere<ModelRepo & T>,
      ...extraOptions
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
    return model.save(data)
  }

  /**
   * 删除
   * @param raw 
   * @returns 
   */
  public delete(id: number, isDelete = false) {
    return isDelete ? this.entity.delete(id) : this.update(id, { delete_at: new Date() } as any)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public async update(id: number, raw: DeepPartial<ModelRepo>) {
    const rawData = await this.entity.findOne({
      where: {
        id
      } as unknown as FindOptionsWhere<ModelRepo>
    })
    if (!rawData) {
      return new BusinessError(404, '不存在的记录')
    }
    const data = Object.assign(rawData, raw)
    return await this.entity.save(data)
  }

  /**
   * 事务封装
   * @param commitHandler 
   * @returns 
   */
  public transaction<T = unknown>(commitHandler: (queryRunner?: QueryRunner) => T): Promise<T> {
    return new Promise(async(resolve, reject) => {
      // 获取连接并创建新的queryRunner
      const queryRunner = getConnection().createQueryRunner();
      try {
        // 使用我们的新queryRunner建立真正的数据库连
        await queryRunner.connect();
        // 开始事务：
        await queryRunner.startTransaction();
        let result = true as unknown as T
        if (commitHandler) {
          result = await commitHandler(queryRunner)
        }
        // 提交事务：
        await queryRunner.commitTransaction();
        resolve(result)
      } catch (error) {
        // 有错误做出回滚更改
        await queryRunner.rollbackTransaction();
        reject(error)
      }
    })
  }

  public saveAll(entity: EntityTarget<unknown>, values: unknown[]) {
    return new Promise((resolve, reject) => {
      this.transaction(async () => {
        const res = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(entity)
          .values(values)
          .execute()
        return res
      }).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  }

  public _injectAbleKey = 'repository'
  public _injectHandler = 'setEntity'
}