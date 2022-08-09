import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/auth')
class Menu {

  @Get('/buttons', { skipPerm: true })
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