import { Inject, Service } from "@/core/container";
import { Category } from "@/models/entity/catgory";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Service()
export class CatgoryService extends BaseService {
  @Inject('Category')
  public repository:Repository<Category>
}