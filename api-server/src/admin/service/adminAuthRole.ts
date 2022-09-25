import { Provide } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";

@Provide()
export class AdminAuthRoleService extends BaseService {
  public entity = AdminAuthRole
}