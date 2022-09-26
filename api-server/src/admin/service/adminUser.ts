import { Inject, Provide } from "@/core/container";
import { AdminUser } from "@/models/entity/adminUser";
import { BaseService } from "@/service/baseService";
import { Repository } from "typeorm";

@Provide()
export class AdminUserService extends BaseService {
  @Inject('AdminUser')
  public repository:Repository<AdminUser>
}