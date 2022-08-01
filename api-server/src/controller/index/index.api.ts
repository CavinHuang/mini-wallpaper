import { Response } from "../../core/responce";
import { Controller, Get } from "../../core/decorator";
import { uploadToken } from '../../config/qiniu'

@Controller('/index', { skipPerm: true })
class Index {

  @Get('/qiniu/token')
  public qiniuToken() {
    return Response.success(uploadToken, Response.successMessage)
  }
}