import { Controller, Get, UseGuard } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AuthGuard, Role } from '../guard/role';

@UseGuard(AuthGuard)
@Controller('/index', { skipPerm: true })
export class AdminIndex {

  @Role('admin')
  @Get('/index')
  public index () {
    return Response.success('成功')
  }
}