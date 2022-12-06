import { Inject, Service } from "@/core/container";
import { Posts } from "@/models/entity/posts";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Service()
export class PostsService extends BaseService {
  @Inject('Posts')
  public repository:Repository<Posts>
}