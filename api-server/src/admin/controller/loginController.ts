/**
 * login
 */

import { Inject } from "@/core/container";
import { Body, Controller, Get, Post } from "@/core/decorator";
import { Response } from "@/core/responce";
import { ILoginParamers, LoginService } from '../service/loginService';

@Controller('/login', { skipPerm: true })
export class LoginController {

  @Inject()
  loginService: LoginService

  @Post('')
  public async login(@Body() params: ILoginParamers) {
    return Response.success(await this.loginService.login(params)) 
  }

  @Get('/buttons')
  public list() {
    return Response.success({
        useHooks: {
          add: true,
          batchAdd: true,
          export: true,
          batchDelete: true,
          status: true,
          view: true,
          edit: true,
          reset: true,
          delete: true
        }
      }, Response.successMessage)
  }
}