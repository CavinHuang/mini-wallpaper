import { Service } from "@/core/container";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { BaseService } from "@/service/baseService";

@Service()
export class AdminAuthMenuService extends BaseService {
  public entity = AdminAuthMenu
}