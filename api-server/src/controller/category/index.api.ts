// import { CatgoryService } from './../../service/catgory';
// import { Body, Controller, Get, Post } from "@/core/decorator";
// import { Response } from "@/core/responce";
// import { Catgory } from '@/models/entity/catgory';

// @Controller('/category', { skipPerm: true })
// export class BannerController {
//   @Get('/lists')
//   public async lists() {
//     return Response.success(await CatgoryService.getAll(), Response.successMessage)
//   }

//   @Post('/create')
//   public async createConfig(@Body() raw: Partial<Catgory>) {
//     return Response.success(await CatgoryService.create(raw), Response.successMessage)
//   }

//   @Post('/update')
//   public async updateConfig(@Body() raw: Partial<Catgory>) {
//     return Response.success(await CatgoryService.update(raw.id, raw), Response.successMessage)
//   }
// }