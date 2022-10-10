import { uploadToken } from "@/config/qiniu";
import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/qiniu', { skipPerm: true })
export class QiNiu {

  /**
   * 获取七牛云的token
   * @returns 
   */
  @Get('/token')
  public qiniuToken() {
    return Response.success(uploadToken(), Response.successMessage)
  }
}