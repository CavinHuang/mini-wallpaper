import { Inject, Service } from "@/core/container";
import { User } from "@/models/entity/user";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Service()
export class UserService extends BaseService {
  @Inject('User')
  public repository:Repository<User>
}