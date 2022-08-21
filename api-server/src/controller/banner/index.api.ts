import { BannerService } from './../../service/banner';
import { Controller, Get, Post } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Banner } from '@/models/entity/banner';

@Controller('/banner', { skipPerm: true })
export class BannerController {
  @Get('/lists')
  public async lists() {
    return Response.success(await BannerService.getAll(), Response.successMessage)
  }

  @Post('/create')
  public async createConfig(raw: Partial<Banner>) {
    return Response.success(await BannerService.create(raw), Response.successMessage)
  }

  @Post('/update')
  public async updateConfig(raw: Partial<Banner>) {
    return Response.success(await BannerService.update(raw.id, raw), Response.successMessage)
  }
}