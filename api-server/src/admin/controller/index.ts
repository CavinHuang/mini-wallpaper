import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/index', { skipPerm: true })
export class AdminIndex {

  @Get('/index')
  public index () {
    return Response.success('成功')
  }
}