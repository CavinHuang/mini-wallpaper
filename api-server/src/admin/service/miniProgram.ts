import { Inject, Service } from "@/core/container";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { MiniProgram } from '@/models/entity/miniprogram';

@Service()
export class MiniProgramService extends BaseService {
  @Inject('MiniProgram')
  public repository:Repository<MiniProgram>

  public async 
}