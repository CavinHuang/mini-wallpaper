import { Inject, Service } from "@/core/container";
import { AdminUser } from "@/models/entity/adminUser";
import { BaseService } from "@/service/baseService";
import { getConnection, Repository } from "typeorm";
import bcrypt from 'bcrypt'
// import { AdminAuthRoleUser } from "@/models/entity/adminAuthRoleUser";

@Service()
export class AdminUserService extends BaseService {
  
  @Inject('AdminUser')
  public repository:Repository<AdminUser>

  // @Inject('AdminAuthRoleUser')
  // public adminAuthRoleUser: Repository<AdminAuthRoleUser>

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
   * 清空所有的
   * @param adminUserId 
   * @returns 
   */
  public clearRoleData(adminUserId: number) {
    // return this.adminAuthRoleUser.delete({
    //   user_id: adminUserId
    // })
  }

  /**
   * 保存角色问题
   * @param adminUserId 
   * @param roleIds 
   * @returns 
   */
  public async saveRoleData(adminUserId: number, roleIds: number[]) {
    // try {
    //   const res = await this.transaction(async () => {
        
    //     await this.clearRoleData(adminUserId)

    //     // 提交所有的
    //     const res = await this.saveAll(AdminAuthRoleUser, roleIds.map(roleId => {
    //       return {
    //         role_id: roleId,
    //         user_id: adminUserId
    //       }
    //     }))
    //     return res
    //   })
    //   return res
    // } catch(e) {
    //   return e
    // }
  }

  public deleteData(id: number) {
    return this.transaction(async () => {
      await this.delete(id)
      await this.clearRoleData(id)
      return true
    })
  }
}