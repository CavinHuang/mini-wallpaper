/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Controller, Get } from "@/core/decorator";
import { AdminUserService } from "../service/adminUser";

@Controller('/admin-user', { skipPerm: true })
class AdminUserController {

  @Inject()
  protected AdminUserService: AdminUserService
}