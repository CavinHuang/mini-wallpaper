import { CoreController } from '../CoreController'
import { ApiOptions } from '../interface'

export default class Test extends CoreController {
  public method: string = 'get'

  public handle() {

    return {
      a: 11,
      b: 22
    }
  }
}