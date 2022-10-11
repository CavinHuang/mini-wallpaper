import { Inject, Provide } from "@/core/container";
import { Tag } from "@/models/entity/tag";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Provide()
export class TagService extends BaseService {
  @Inject('Tag')
  public repository:Repository<Tag>
}