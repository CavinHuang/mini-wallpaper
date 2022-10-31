import { Inject } from "@/core/container";
import { Body, Controller, Params, Post, Put } from "@/core/decorator";
import { BusinessError } from "@/core/error/businessError";
import { Response } from "@/core/responce";
import { UserCreator } from "@/models/entity/userCreator";
import { UserCreatorService } from "@/service/userCreator";
import { UserCreatorApplyDto } from '../dto/userCreator';
import { BUSINESS_ERROR_CODE } from '../../core/error/businessError';

@Controller('/user-creator', { skipPerm: true })
export class UserCreatorController {

  @Inject()
  private userCreatorService: UserCreatorService

  @Post('/apply')
  public async apply(@Body() params: UserCreatorApplyDto ) {
    const res = await this.userCreatorService.getInfoByQueryBuilder<UserCreator>((query) => {
      query.where({
        code: params.code
      })
      return query
    })

    if (res) {
      throw new BusinessError(BUSINESS_ERROR_CODE.RAW_EXITS, '口令已被使用')
    }
    return Response.success(await this.userCreatorService.apply(params))
  }

  @Put('/:id')
  public async updateInfo(@Params('id') id: number, @Body() params: Partial<UserCreator> ) {
    return Response.success(await this.userCreatorService.update(id, params))
  }
}