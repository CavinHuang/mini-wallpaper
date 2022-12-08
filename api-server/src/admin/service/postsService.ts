import { Inject, Service } from "@/core/container";
import { Category } from "@/models/entity/catgory";
import { Posts } from "@/models/entity/posts";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { TagService } from "./tag";

@Service()
export class PostsService extends BaseService {
  @Inject('Posts')
  public repository:Repository<Posts>

  @Inject()
  public tagService: TagService

  @Inject('Category')
  public category: Repository<Category>

  public savePost(params: Partial<Posts>) {

    const saveData = {
      ...params,
      tags: (params.tags as unknown as number[]).map((item: number) => this.tagService.entity.create({ id: item })),
      categories: [this.category.create({ id: params.categories as unknown as number })]
    }

    return this.repository.save(saveData)
  }
}