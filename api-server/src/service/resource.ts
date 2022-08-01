import { M } from '../models';
import { BaseService } from './baseService';
import { Resource as ResourceEntity } from '../models/entity/resource'
import { Pagination } from '../core';
import { BusinessError, BUSINESS_ERROR_CODE } from './../core/error/businessError';
import { SelectQueryBuilder } from 'typeorm';

/**
 * 资源类型
 */
export const enum ResourceType {
  image = 'image',
  video = 'video',
  audio = 'audio'
}

/**
 * 资源
 */
export class ResourceService extends BaseService {
  /**
   * 获取分页数据
   * @param type 资源类型
   * @param pageNum 当前页数
   * @param pageSize 总条数
   * @param extralWhere 额外的where条件
   * @returns Promise<Pagination>
   */
  public async getPageResourceByType(type: ResourceType, { pageNum = 1, pageSize = 10, offset = 0, limit = 15}, extral: {
    where: (query: SelectQueryBuilder<ResourceEntity>) => SelectQueryBuilder<ResourceEntity>
  }, isHot = false, isRecommend = false) {
    let query = M(ResourceEntity).createQueryBuilder('r').where('r.status = :status AND r.type = :type', { status: 1, type })

    if (extral.where) {
      query = extral.where(query)
    }

    if (isRecommend) {
      query = query.orderBy('r.is_recommend', 'DESC')
    }

    if (isHot) {
      query = query.addOrderBy('r.is_hot', 'DESC')
    }

    query = query.addOrderBy('r.sort', 'ASC').addOrderBy('r.id', 'DESC')

    const result = await Pagination.findByPage(query, { pageNum, pageSize, offset, limit })

    return result
  }

  /**
   * 保存单条的资源
   * @param resource 资源数据
   * @returns Promise<ResourceEntity>
   */
  public saveResource(resource: Partial<ResourceEntity>) {
    const resourceInstance = M(ResourceEntity)
    const raw = resourceInstance.create(resource)

    return resourceInstance.save(raw)
  }

  /**
   * 批量保存
   * @param resources 资源数据
   * @returns Promise<InsertResult>
   */
  public async saveAll(resources: Partial<ResourceEntity>[]) {
    const resource = M(ResourceEntity)
    const res = await resource.createQueryBuilder().insert().into(ResourceEntity).values(resources).execute()

    return res
  }

  /**
   * 更新资源
   * @param id 资源id
   * @param raw 更新字段
   * @returns Promise<ResourceEntity>
   */
  public async updateResource(id: number, raw: Partial<ResourceEntity>) {
    const resource = M(ResourceEntity)
    const result = await resource.findOne({
      where: {
        id
      }
    })

    if (!result) {
      throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '不存在的资源')
    }

    const rawData = resource.create(raw)
    return await resource.save(rawData)
  }

  /**
   * 标记资源删除
   * @param id 资源id
   * @returns Promise<ResourceEntity>
   */
  public async deleteResource(id: number) {
    return await this.updateResource(id, { is_deleted: true })
  }

  /**
   * 获取单个resource
   * @param id 资源id
   * @returns Promise<ResourceEntity>
   */
  public async getResourceById(id: number) {
    return await M(ResourceEntity).findOne({
      where: { id }
    })
  }
}