import { Inject, Service } from "@/core/container";
import { AdminUser } from "@/models/entity/adminUser";
import { BaseService } from "@/service/baseService";
import { getConnection, Repository } from "typeorm";
import bcrypt from 'bcrypt'
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
// import { AdminAuthRoleUser } from "@/models/entity/adminAuthRoleUser";

@Service()
export class AdminUserService extends BaseService {
  
  @Inject('AdminUser')
  public repository:Repository<AdminUser>

  @Inject('AdminAuthRole')
  public adminAuthRole: Repository<AdminAuthRole>

  /**
   * 保存权限
   * @param adminRoleId 
   * @param menuIds 
   * @returns 
   */
  public async saveAdminUser(params: Partial<AdminUser> & { role_auth: number[] }) {
    console.log("🚀 ~ file: adminUser.ts ~ line 25 ~ AdminUserService ~ saveAdminUser ~ params", params)
    const adminUserEntity = await this.repository.create(params)
    const adminUserEntitySave: AdminUser = { ...adminUserEntity, roles: params.role_auth.map(menuId => this.adminAuthRole.create({ id: menuId })) }
    return this.repository.save(adminUserEntitySave)
  }

  public async deleteRelationData(role_id: number) {
    const roleEntity = await this.repository.create({ id: role_id })
    return this.repository.remove(roleEntity)
  }
  
  /**
   * 创建密码
   * @param pass 
   * @returns 
   */
  public genUserPassword(pass: string) {
    const slat = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(pass, slat)
    return {
      slat,
      password
    }
  }

  /**
   * 校验密码
   * @param user 
   * @param password 
   * @returns 
   */
  public validatePassword(user: AdminUser, password: string) {
    console.log(user.password, password)
    return user && bcrypt.compareSync(password, user.password)
  }
}