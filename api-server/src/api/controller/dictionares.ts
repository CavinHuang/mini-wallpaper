import { Inject } from "@/core/container";
import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AppDataService } from "@/service/appDataService";

@Controller('/dict', { skipPerm: true })
export class Dictionares {

  @Inject()
  appData: AppDataService

  @Get('/all')
  async getData() {
    const appData = await this.appData.getAll()
    return Response.success({ appData }, Response.successMessage)
  }
}
