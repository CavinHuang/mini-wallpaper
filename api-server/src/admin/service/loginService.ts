/**
 * 登录逻辑
 */
import { Inject, Service } from "@/core/container";
import { AdminUser } from "@/models/entity/adminUser";
import { string } from "joi";
import { AdminUserService } from "./adminUser";
import { BusinessError, BUSINESS_ERROR_CODE } from '@/core/error/businessError';
import { JwtService } from "@/service/jwt";
import { secret } from '@/config';

export interface ILoginParamers {
  username: string
  password: string
}

@Service()
export class LoginService {

  @Inject()
  private adminUserService: AdminUserService

  @Inject()
  private jwt: JwtService

  public async login({ username, password }: ILoginParamers) {

    const adminUserRes = (await this.adminUserService.getInfo<AdminUser>({ username }, { select: {
      password: true,
      id: true
    } })) as AdminUser
    if (!this.adminUserService.validatePassword(adminUserRes, password)) {
      return new BusinessError(BUSINESS_ERROR_CODE.PASSWORD_ERROR, '密码不正确')
    }

    const payload = {
      id: adminUserRes.id
    }
    
    const token = this.jwt.signSync(payload)
    return token
  }

  public async updateToken(token: string) {
    const userInfo = await this.jwt.decode(token, { complete: true })
    console.log(userInfo)
    const payload = {
      id: userInfo.payload.id
    }
    return this.jwt.signSync(payload)
  }
}