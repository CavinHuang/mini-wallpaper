import { Inject, Service } from "@/core/container";
import { User } from "@/models/entity/user";
import { UserCreator } from "@/models/entity/userCreator";
import { Repository } from "typeorm";
import { BaseService } from "./baseService";

@Service()
export class UserCreatorService extends BaseService{
  @Inject('UserCreator')
  public repository:Repository<UserCreator>

  @Inject('User')
  public userRespository: Repository<User>

  public async apply(params: Partial<UserCreator> & { user_id: number }) {
    const user = this.userRespository.create({
      id: params.user_id
    })
    const saveData = this.repository.create({
      ...params,
      status: 1
    })
    saveData.user = user

    return this.repository.save(saveData)
  }
}