import { Inject, Service } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository, FindOptionsWhere, SelectQueryBuilder, IsNull } from 'typeorm';
import { CommonType } from "@/interfaces/common";
import { SystemGroup } from '@/models/entity/systemGroup';

type PageParams = CommonType.BasePageParams & { where: FindOptionsWhere<AdminAuthRole> }

@Service()
export class SystemGroupService extends BaseService {
  
  @Inject('SystemGroup')
  public repository:Repository<SystemGroup>

  public async getGroupDataTabHeader(id: number) {
    const info = await this.info(id)
    const fields = JSON.parse(info.fields)
    const header = [
      {key: 'id', title: '编号', minWidth: 35}
    ] as any[]

    for (let i = 0; i < fields.length; i ++) {
      const item = fields[i]
      if (item.type === 'upload' || item.type === 'uploads') {
        header[i].key = item.title
        header[i].minWidth = 60
        header[i].type = 'img'
      } else if (item.title === 'url' || item.title === 'wap_url' || item.title === 'link' || item.title === 'wap_link') {
        header[i].key = item['title']
        header[i].minWidth = 200
      } else {
        header[i].key = item['title']
        header[i].minWidth = 100
      }
      header[i].title = item.name
    }
    header.push(...[
      { slot: 'status', title: '是否可用', minWidth: 80},
      { key: 'sort', title: '排序', minWidth: 80}
    ])
    return header
  }
}