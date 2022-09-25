import { Provide } from "@/core/container";
import { AdminUser } from "@/models/entity/adminUser";
import { BaseService } from "@/service/baseService";

@Provide()
export class AdminUserService extends BaseService {
  public entity = AdminUser
}