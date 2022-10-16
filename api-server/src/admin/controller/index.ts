import { Context, Controller, Get, UseGuard } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AppContext } from '@/interface/application';

// @UseGuard(AuthGuard)
@Controller('/index', { skipPerm: true })
export class AdminIndex {

  // @Role('admin')
  @Get('/index')
  public index () {
    return Response.success('111')
  }
}