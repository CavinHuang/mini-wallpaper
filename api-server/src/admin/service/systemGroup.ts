import { Inject, Service } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository, FindOptionsWhere, SelectQueryBuilder, IsNull } from 'typeorm';
import { CommonType } from "@/interfaces/common";
import { SystemGroup } from '@/models/entity/systemGroup';

type PageParams = CommonType.BasePageParams & { where: FindOptionsWhere<AdminAuthRole> }

@Service()
export class SystemGroupService extends BaseService {
  
  @Inject('SystemGroup')
  public repository:Repository<SystemGroup>
}