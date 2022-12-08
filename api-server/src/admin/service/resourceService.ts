import { Inject, Service } from "@/core/container";
import { Resource } from "@/models/entity/resource";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { Tag } from "@/models/entity/tag";
import { Category } from "@/models/entity/catgory";

@Service()
export class ResourceService extends BaseService {
  @Inject('Resource')
  public repository:Repository<Resource>

  @Inject('Tag')
  public tag: Repository<Tag>

  @Inject('Category')
  public category: Repository<Category>

  public async saveResource(row: Partial<Resource> & { url: string | Array<string>; }) {
    let url: string[] = []
    let thumb_url = ''
    if (Array.isArray(row.url)) {
      thumb_url = row.url[0]
      url = row.url
    } else if ((row.url as string).indexOf('\n')) {
      const arr = (row.url as string).replace(/\r\n/g, '\n').split('\n')
      url = arr
      thumb_url = arr[0]
    } else {
      url = row.url
      thumb_url = row.url
    }

    const saveData = {
      ...row,
      url,
      thumb_url,
      tags: (row.tags as unknown as number[]).map((item: number) => this.tag.create({ id: item })),
      categories: [this.category.create({ id: row.categories as unknown as number })]
    }
    return await this.repository.save(saveData)
  }
}