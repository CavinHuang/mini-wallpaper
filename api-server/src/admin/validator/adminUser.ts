import { IsNotEmpty, Length } from "class-validator";

export class CreateAdminUserDto {
  @Length(6, 20,{ message: '用户名长度为6-20个字符' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string

  @IsNotEmpty({ message: '昵称不为空' })
  readonly nickname: string;

  @Length(6, 20,{ message: '用户密码长度为6-20个字符' })
  @IsNotEmpty({ message: '用户密码不能为空' })
  readonly password: string
}