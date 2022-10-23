import { Inject } from "@/core/container";
import { Controller, Get, Post, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { UserCreatorService } from "@/service/userCreator";
import { UserCreatorApply } from '../dto/userCreator';

@Controller('/user-creator', { skipPerm: true })
export class UserCreatorController {

  @Inject()
  private userCreatorService: UserCreatorService

  @Post('/apply')
  public async apply(@Query() params: UserCreatorApply ) {
    return Response.success(await this.userCreatorService.apply(params))
  }
}