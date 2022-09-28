import { Inject, Provide } from "@/core/container";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { BaseService } from "@/service/baseService";
import { getTreeChildren } from "@/utils/data";
import { Repository, FindOptionsWhere, IsNull } from 'typeorm';

@Provide()
export class AdminAuthMenuService extends BaseService {
  @Inject('AdminAuthMenu')
  public repository:Repository<AdminAuthMenu>

  /**
   * 获取全部的数据
   * @param where
   * @returns 
   */
  public getMenusList(where: FindOptionsWhere<AdminAuthMenu> = {}) {
    const _where: FindOptionsWhere<AdminAuthMenu> = {...{delete_at: IsNull()}, ...where}
    return this.entity.find({
      where: _where,
      order: {sort: 'DESC', id: 'ASC'}
    })
  }

  /**
   * 获取节点数据
   * @param where 
   * @returns 
   */
  public async getTreeList(where: FindOptionsWhere<AdminAuthMenu> = {} ): Promise<Array<AdminAuthMenu & { children: AdminAuthMenu[] }>> {
    const result = await this.getMenusList(where)
    return getTreeChildren(result)
  }
}