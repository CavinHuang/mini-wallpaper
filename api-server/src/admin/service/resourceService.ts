import { Inject, Service } from "@/core/container";
import { Resource } from "@/models/entity/resource";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Service()
export class ResourceService extends BaseService {
  @Inject('Resource')
  public repository:Repository<Resource>
}