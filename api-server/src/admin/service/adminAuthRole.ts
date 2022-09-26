import { Inject, Provide } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository } from "typeorm";

@Provide()
export class AdminAuthRoleService extends BaseService {
  @Inject('AdminRole')
  public repository:Repository<AdminAuthRole>
}