import { MiniProgram } from '@/service/miniprogram';
import { Controller, Get, Post } from "@/core/decorator";
import { Response } from '@/core/responce';

@Controller('/min-program', { skipPerm: true})
class MiniProgramController {

  @Get('/list')
  public async list({ pageSize = 10, pageNum = 1 }: { pageSize: number, pageNum: number }) {
    return Response.success(await MiniProgram.getPageData({ pageNum, pageSize }), Response.successMessage)
  }
}