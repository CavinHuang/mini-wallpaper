import { Inject, Provide, Service } from "@/core/container/container";
import { TestEntity } from "@/models/entity/test";
import { Repository } from "typeorm";

@Service()
export class TestService {
  @Inject('TestReopsitory')
  private testRepo: Repository<TestEntity>

  testHandler() {
    this.testRepo.save({
      name: '1'
    })
    return { a: 2, b: 3 }
  }
}