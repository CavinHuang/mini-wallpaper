import { Inject, Service } from "@/core/container";
import { Category } from "@/models/entity/catgory";
import { Posts } from "@/models/entity/posts";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { Tag } from '@/models/entity/tag';

@Service()
export class PostsService extends BaseService {
  @Inject('Posts')
  public repository:Repository<Posts>

  @Inject('Tag')
  public tag: Repository<Tag>

  @Inject('Category')
  public category: Repository<Category>

  public async savePost(params: Partial<Posts>) {

    const saveInstance = {
      ...params,
      userId: params.userId ?? 0,
      coummentCount: 0
    }
    
    saveInstance.tags = (params.tags as unknown as number[]).map((item: number) => this.tag.create({ id: item }))
    saveInstance.categories = (params.categories as unknown as number[]).map(item => {
      return this.category.create({ id: item })
    })
    return await this.repository.save(saveInstance)
  }
}