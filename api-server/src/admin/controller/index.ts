import { ApplicationContext } from '@/server/context';
import { Inject } from "@/core/container";
import { Controller, Get, UseGuard } from "@/core/decorator";
import { Response } from "@/core/responce";

// @UseGuard(AuthGuard)
@Controller('/index', { skipPerm: true })
export class AdminIndex {

  @Inject()
  ctx: ApplicationContext

  // @Role('admin')
  @Get('/index')
  public index () {
    console.log(this.ctx)
    return Response.success('成功')
  }
}