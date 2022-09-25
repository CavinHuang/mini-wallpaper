import { Provide } from "@/core/container";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { BaseService } from "@/service/baseService";

@Provide()
export class AdminAuthMenuService extends BaseService {
  public entity = AdminAuthMenu
}