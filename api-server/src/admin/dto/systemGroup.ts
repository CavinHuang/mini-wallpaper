import { IsArray, IsString } from "class-validator";

export class SystemGroupDto {
  @IsString({
    message: '请输入数据组名称'
  })
  name: string

  @IsString({
    message: '请输入配置名称'
  })
  config_name: string

  @IsArray({
    message: '字段至少存在一个！'
  })
  fields: Array<{name: { value: string }; params: { value: string; placeholder: string; }; title: { value: string }; type: { value: string };}>
}