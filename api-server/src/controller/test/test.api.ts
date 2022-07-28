import { Controller, Get, Post } from '../../core/decorator'
import { CoreController } from '../CoreController'


@Controller('/test', {
  skipPerm: true
})
class Test {
  
  @Get('/index', {
    skipPerm: false
  })
  public index() {
    return {
      a: 11,
      b: 22
    }
  }

  @Post('/post')
  public post() {
    return {
      a: 22,
      b: 11
    }
  }
}