import { IsString, IsEmpty, IsNotEmpty, isNotEmpty } from "class-validator";

export class UserContributionDto {
  @IsNotEmpty({
    message: '缺少必要的参数user_id'
  })
  user_id: number

  @IsString({
    message: '请输入标题'
  })
  @IsNotEmpty({
    message: '标题不能为空'
  })
  title: string

  @IsNotEmpty({
    message: '请选择关联标签'
  })
  tags: number[]

  @IsNotEmpty({
    message: '请选择分类'
  })
  category: number

  @IsNotEmpty({
    message: '请上传图片'
  })
  resource: string[]
}