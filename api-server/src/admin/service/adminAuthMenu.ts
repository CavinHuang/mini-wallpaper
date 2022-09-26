import { Inject, Provide } from "@/core/container";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { BaseService } from "@/service/baseService";
import { Repository } from "typeorm";

@Provide()
export class AdminAuthMenuService extends BaseService {
  @Inject('AdminAuthMenu')
  public repository:Repository<AdminAuthMenu>
}