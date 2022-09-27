import { Inject, Service } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository } from "typeorm";

@Service()
export class AdminAuthRoleService extends BaseService {
  
  @Inject('AdminAuthRole')
  public repository:Repository<AdminAuthRole>
}