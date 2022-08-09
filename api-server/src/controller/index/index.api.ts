import { userService } from './../../service/user';
import { Response } from "@/core/responce";
import { Controller, Get } from "@/core/decorator";
import { uploadToken } from '@/config/qiniu'
import { datesAreOnSameDay } from '@/utils';

@Controller('/index', { skipPerm: true })
class Index {

  @Get('/qiniu/token')
  public qiniuToken() {
    return Response.success(uploadToken(), Response.successMessage)
  }

  @Get('/index')
  public async index(params: { uid: number }) {
    const user = await userService.getUserById(params.uid)

    const lastSign = user.last_sign_date

    return Response.success({
      zczsjf: 10,
      yqzc: 20,
      mrcsjrk: 0,
      mrqdjrk: datesAreOnSameDay(new Date(), lastSign) ? 0 : 1
    }, Response.successMessage)
  }
}