import { Inject, Service } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository, FindOptionsWhere, SelectQueryBuilder, IsNull } from 'typeorm';
import { AdminAuthMenu } from '@/models/entity/adminAuthMenu';
import { CommonType } from "@/interfaces/common";
import { AdminUser } from '@/models/entity/adminUser';

type PageParams = CommonType.BasePageParams & { where: FindOptionsWhere<AdminAuthRole> }

@Service()
export class AdminAuthRoleService extends BaseService {
  
  @Inject('AdminAuthRole')
  public repository:Repository<AdminAuthRole>

  @Inject('AdminAuthMenu')
  public adminAuthMenu: Repository<AdminAuthMenu>

  /**
   * 保存权限
   * @param adminRoleId 
   * @param menuIds 
   * @returns 
   */
  public async saveRole(params: Partial<AdminAuthRole> & { role_auth: number[] }) {
    const roleEntity = await this.entity.create(params)
    const roleEntitySave = { ...roleEntity, menus: params.role_auth.map(menuId => this.adminAuthMenu.create({ id: menuId })) }
    return this.entity.save(roleEntitySave)
  }

  public async deleteRelationData(role_id: number) {
    const roleEntity = await this.repository.create({ id: role_id })
    return this.repository.remove(roleEntity)
  }
}