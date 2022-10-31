import { IsString, IsEmpty, IsNotEmpty } from "class-validator";

export class UserCreatorApplyDto {
  @IsNotEmpty({
    message: '缺少必要的参数user_id'
  })
  user_id: number

  @IsString({
    message: '请输入您的口令'
  })
  @IsNotEmpty({
    message: '口令不能为空'
  })
  code: string
}