import { IsString } from "class-validator";

export class GetTestIndexDto {
  @IsString({
    message: '缺少必要的参数'
  })
  name: string
}