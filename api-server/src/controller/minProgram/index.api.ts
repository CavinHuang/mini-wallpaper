import { MiniProgram } from '@/service/miniprogram';
import { Controller, Get, Post } from "@/core/decorator";
import { Response } from '@/core/responce';
import { MiniProgram as MiniProgramEntity } from '@/models/entity/miniprogram'
import { BusinessError, BUSINESS_ERROR_CODE } from '@/core/error/businessError';

@Controller('/min-program', { skipPerm: true})
export class MiniProgramController {

  @Get('/list')
  public async list({ pageSize = 10, pageNum = 1 }: { pageSize: number, pageNum: number }) {
    return Response.success(await MiniProgram.getPageData({ pageNum, pageSize }), Response.successMessage)
  }

  @Post('/create')
  public async create(raw: Partial<MiniProgramEntity>) {
    return Response.success(await MiniProgram.createMiniProgram(raw), Response.successMessage)
  }

  @Post('/update')
  public async update(raw: Partial<MiniProgramEntity>) {
    if (!raw.id) throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '不存在的数据')
    return Response.success(await MiniProgram.updateMiniProgram(raw.id, raw), Response.successMessage)
  }

  @Post('/delete')
  public async delete({ id }: { id: number }) {
    if (!id) throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '不存在的数据')
    return Response.success(await MiniProgram.updateMiniProgram(id, { is_deleted: true }), Response.successMessage)
  }
}