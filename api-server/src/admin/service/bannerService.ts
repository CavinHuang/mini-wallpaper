import { Inject, Provide } from "@/core/container";
import { ContentBanner } from "@/models/entity/contentBanner";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Provide()
export class BannerService extends BaseService {
  @Inject('ContentBanner')
  public repository:Repository<ContentBanner>
}