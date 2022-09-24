export class Response {
  static successMessage = 'success'
  static errorMessage = 'error'

  public static return(data: any = {}, success = true, code = 1, message = '') {
    return {
      data,
      code,
      success,
      message
    }
  }

  public static success(data, message = '成功', code = 1) {
    return Response.return(data, true, code, message)
  }

  public static error(message = '失败', data = null, code = 0) {
    return Response.return(data, false, code, message)
  }
}