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

  public async getGroupDataList({ pageNum, pageSize, gid }: CommonType.BasePageParams & { gid: number }, where?: FindOptionsWhere<SystemGroupData>) {

    const list = await this.getPageList({ pageNum, pageSize }, (query: SelectQueryBuilder<SystemGroupData>) => {
      if (where) {
        query = query.where(where)
      }
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
      delete list.rows[i].value
    }

    list.type = type
    return list
  }
}