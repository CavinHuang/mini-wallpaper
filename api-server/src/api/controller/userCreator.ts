import { Inject } from "@/core/container";
import { Body, Controller, Get, Params, Post, Put, Query } from "@/core/decorator";
import { BusinessError } from "@/core/error/businessError";
import { Response } from "@/core/responce";
import { UserCreator } from "@/models/entity/userCreator";
import { UserCreatorService } from "@/service/userCreator";
import { UserCreatorApplyDto } from '../dto/userCreator';
import { BUSINESS_ERROR_CODE } from '@/core/error/businessError';
import { UserContributionDto } from "../dto/userContribution";
import { UserContributionService } from '@/service/userContributionService';

@Controller('/user-creator', { skipPerm: true })
export class UserCreatorController {

  @Inject()
  private userCreatorService: UserCreatorService

  @Inject()
  private UserContributionService: UserContributionService

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

  @Post('/contribution')
  public async contribution(@Body() params: UserContributionDto ) {
    return Response.success(await this.UserContributionService.saveContribution(params))
  }

  @Get('/contribution/list')
  public async getList(@Query() { user_id, pageNum = 1, pageSize = 15 }: { user_id: number; pageNum?: number; pageSize?: number }) {
    if (!user_id) return Response.error('缺少必要参数')
    const res = await this.UserContributionService.getPageList({ pageNum, pageSize, alias: 'c' }, (query) => {
      query.leftJoinAndSelect('c.resources', 'cr')
      query.leftJoinAndSelect('cr.tags', 'crt')
      query.leftJoinAndSelect('c.user', 'cu')
      query.leftJoinAndSelect('cu.profile', 'cup')
      query.where('c.user=:user', { user: user_id })
      query.orderBy('c.create_at', 'DESC')
      query.addOrderBy('c.id', 'DESC')
      return query
    })
    return Response.success(res, Response.successMessage)
  }
}