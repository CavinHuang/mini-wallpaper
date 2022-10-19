import { BannerService } from "@/admin/service/bannerService";
import { Inject } from "@/core/container";
import { Controller, Get, Query } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/content', { skipPerm: true })
export class ContentController {

  @Inject()
  private bannerService: BannerService

  @Get('/banner')
  public async bannerList(@Query() { position = '', pageNum = 1, pageSize = 1000 }: { position?: string; pageNum?: number; pageSize?: number }) {
    const res = await this.bannerService.getPageList({ pageNum, pageSize }, (query) => {
      if (position) query.where({
        position
      })
      return query
    })

    return Response.success(res.rows || [], Response.successMessage)
  }
}