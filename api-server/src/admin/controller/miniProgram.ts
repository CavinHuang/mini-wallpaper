/**
 * 小程序
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { MiniProgramService } from "../service/miniProgram";
import { MiniProgram as MiniProgramEntity } from '@/models/entity/miniprogram';

@Controller('/mini-program', { skipPerm: true })
export class MiniProgramController {

  @Inject()
  protected miniProgram: MiniProgramService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.miniProgram.getPageList({ pageNum, pageSize })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<MiniProgramEntity>) {
    if (this.miniProgram.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<MiniProgramEntity>) {
    if (this.miniProgram.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.miniProgram.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}