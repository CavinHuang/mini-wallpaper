import { IsArray, IsString } from "class-validator";

export class UserCreatorApply {
  @IsString({
    message: '缺少必要的参数user_id'
  })
  user_id: number

  @IsString({
    message: '请输入您的口令'
  })
  computed: string
}