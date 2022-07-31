import { ResourceWithCategory } from './../../models/entity/resourceWithCategory';
import { Resource } from '../../models/entity/resource'
import { Controller, Get, Post } from '../../core/decorator'
import datas from './data.json'
import { ResourceService } from '../../service/resource'
import { M } from '../../models';
import { Response } from '../../core/responce';

@Controller('/test', {
  skipPerm: true
})
class Test {
  
  @Get('/index', {
    skipPerm: false
  })
  public index() {
    return {
      a: 11,
      b: 22
    }
  }

  @Post('/post')
  public post() {
    return {
      a: 22,
      b: 11
    }
  }

  @Get('/data')
  public async get() {
    const raws: Partial<Resource>[] = []
    
    for (let i = 0; i <datas.length; i++) {
      const item = datas[i]
      raws.push({
        type: 'image',
        appid: 'wxf84a60c327db82a4',
        name: item.name,
        info: item.info,
        url: item.pic,
        thumb_url: item.img,
        price: Number(item.price),
        vip_price: Number(item.vipprice),
        sort: 0,
        is_hot: false,
        is_recommend: false,
        is_deleted: false,
        status: 1,
        author: 1,
        create_at: new Date()
      })
    }

    const saveRes = await (new ResourceService).saveAll(raws)

    const saveData: Partial<ResourceWithCategory>[] = []
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      const types = (() => {
        try {
          return JSON.parse(item.type) as number[]
        } catch(e) {
          return []
        }
      })()
      const r = saveRes.identifiers[i]
      types.forEach(element => {
        saveData.push({
          resource_id: r.id,
          category_id: element
        })
      });
    }

    const rwcRes = M(ResourceWithCategory).createQueryBuilder().insert().into(ResourceWithCategory).values(saveData).execute()

    return Response.success(rwcRes, '成功')
  }
}