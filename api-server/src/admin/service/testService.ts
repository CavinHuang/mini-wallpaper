import { Inject, Service } from "@/core/container";
import { Test } from "@/models/entity/test";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Service()
export class TestService extends BaseService {
  @Inject('Test')
  public repository:Repository<Test>
}