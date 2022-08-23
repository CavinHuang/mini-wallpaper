import { BannerService } from './../../service/banner';
import { Body, Controller, Get, Post } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Banner } from '@/models/entity/banner';

@Controller('/banner', { skipPerm: true })
export class BannerController {
  @Get('/lists')
  public async lists() {
    return Response.success(await BannerService.getAll(), Response.successMessage)
  }

  @Post('/create')
  public async createConfig(@Body() raw: Partial<Banner>) {
    return Response.success(await BannerService.create(raw), Response.successMessage)
  }

  @Post('/update')
  public async updateConfig(@Body() raw: Partial<Banner>) {
    return Response.success(await BannerService.update(raw.id, raw), Response.successMessage)
  }
}