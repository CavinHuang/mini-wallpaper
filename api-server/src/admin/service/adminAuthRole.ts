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
   * 获取从表数据
   * @param param0 
   * @returns 
   */
  public getPageDataWithMenus({ pageNum, pageSize, where }: PageParams) {
    return this.getPageList({ pageNum, pageSize, alias: 'ar' }, (query: SelectQueryBuilder<AdminAuthRole>) => {
      // 链接中间表
      // query.leftJoinAndSelect(AdminAuthRoleMenu, 'arm', 'arm.role_id=ar.id')
      // query.leftJoinAndSelect(AdminAuthMenu, 'am', 'am.id=arm.menu_id')
      // query.andWhere({
      //   'am.delete_at': IsNull()
      // })
      query.andWhere(where)
      query.select(`
        ar.id as id,
        ar.role_code as role_code,
        ar.role_name as role_name,
        ar.status as status,
        ar.remark as remark,
        am.menu_name as menu_name
      `)
      return query
    })
  }


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