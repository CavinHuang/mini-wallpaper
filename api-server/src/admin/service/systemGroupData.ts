import { Inject, Service } from "@/core/container";
import { BaseService } from "@/service/baseService";
import { Repository, FindOptionsWhere, SelectQueryBuilder, IsNull } from 'typeorm';
import { SystemGroup } from '@/models/entity/systemGroup';
import { SystemGroupData } from "@/models/entity/systemGroupData";
import { CommonType } from '@/interfaces/common';
import { SystemGroupService } from "./systemGroup";

@Service()
export class SystemGroupDataService extends BaseService {
  
  @Inject('SystemGroupData')
  public repository:Repository<SystemGroupData>

  @Inject()
  public systemGroupService: SystemGroupService

  /**
   * 获取组合数据列表
   * @param array $where
   * @return array
   */
  public async getGroupDataList({ pageNum, pageSize, gid }: CommonType.BasePageParams & { gid: number }, where?: FindOptionsWhere<SystemGroupData>) {

    const list = await this.getPageList({ pageNum, pageSize }, (query: SelectQueryBuilder<SystemGroupData>) => {
      if (where) {
        query = query.where(where)
      }
      query.andWhere({
        gid
      })
      return query
    }) as any

    const group = await this.systemGroupService.info(gid) as SystemGroup
    let type = ''
    const title = {} as any
    const headers = JSON.parse(group.fields)

    headers.forEach(item => {
      if (item.type === 'upload' || item.type === 'uploads') {
        title[item.title] = []
        type = item.title
      } else {
        title[item.title] = ''
      }
    })

    for (let i = 0; i < list.rows.length; i++) {
      const value = list.rows[i]
      list.rows[i] = {...value, ...title}
      const infos = JSON.parse(value.value) || []
      for (let j in infos) {
        const info = infos[j]
        if (info.type === 'upload') {
          list.rows[i][j] = info.value
        } else if (info.type === 'checkbox') {
          list.rows[i][j] = info.value.split(',')
        } else {
          list.rows[i][j] = info.value
        }
      }
    }

    list.type = type
    return list
  }

  /**
   * 获取某个配置下的数据重新组合成新的数据返回
   * @param configName 
   * @param limit 
   * @returns 
   */
  async getConfigNameValue(configName: string, limit = 0) {
    const group = await this.systemGroupService.repository.findOne({
      where: {
        config_name: configName
      }
    })
    const value = await this.getGroupData(group.id, limit)
    const data = []

    value.forEach((item, index) => {
      data[index] = {}
      data[index].id = item.id
      if (item.status) data[index].status = item.status
      const fields = (() => {
        try {
          return JSON.parse(item.value)
        } catch (e) {
          return []
        }
      })()

      for (let idx in fields) {
        const field = fields[idx]
        if (field.type === 'upload') {
          data[index][idx] = field.value
        } else {
          data[index][idx] = field.value
        }
      }
    })
    return data
  }

  /**
   * 
   * @param gid 查询gid下所有的数据
   * @param limit 
   * @returns 
   */
  async getGroupData(gid: number, limit: number = 0) {
    const query = this.repository.createQueryBuilder('').select('*').where({ gid, status: 1 })
    if (limit) query.limit(limit)
    return await query.execute()
  }
}