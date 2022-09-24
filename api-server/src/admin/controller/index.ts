import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/index')
export class AdminIndex {

  @Get('/index')
  public index () {
    return Response.success('成功')
  }
}