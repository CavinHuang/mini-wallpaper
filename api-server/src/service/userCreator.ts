import { Inject, Service } from "@/core/container";
import { UserCreator } from "@/models/entity/userCreator";
import { Repository } from "typeorm";
import { BaseService } from "./baseService";

@Service()
export class UserCreatorService extends BaseService{
  @Inject('UserCreator')
  public repository:Repository<UserCreator>

  public async apply(params: Partial<UserCreator>) {
    const saveData = this.repository.create({
      ...params,
      status: 1
    })

    return this.repository.save(saveData)
  }
}