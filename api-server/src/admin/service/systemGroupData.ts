import { Inject, Service } from "@/core/container";
import { AdminAuthRole } from "@/models/entity/adminAuthRole";
import { BaseService } from "@/service/baseService";
import { Repository, FindOptionsWhere, SelectQueryBuilder, IsNull } from 'typeorm';
import { CommonType } from "@/interfaces/common";
import { SystemGroup } from '@/models/entity/systemGroup';
import { SystemGroupData } from "@/models/entity/systemGroupData";

type PageParams = CommonType.BasePageParams & { where: FindOptionsWhere<AdminAuthRole> }

@Service()
export class SystemGroupDataService extends BaseService {
  
  @Inject('SystemGroupData')
  public repository:Repository<SystemGroupData>
}