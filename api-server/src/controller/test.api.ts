import { Inject } from "@/core/container/container";
import { Controller, Get, Query } from "@/core/decorator";
import { GetTestIndexDto } from "@/dto";
import { TestService } from "@/service/test";

@Controller('/test1', { skipPerm: true })
export class Test {
  @Inject()
  testService: TestService

  constructor(test: TestService) {
  }

  @Get('/index')
  public test(@Query() query: GetTestIndexDto) {
    const a = this.testService.testHandler()
    return { code: 2, message: 'test controller', data: {
      service: a,
      query
    } }
  }
}