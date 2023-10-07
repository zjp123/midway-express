import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Response, Context } from '@midwayjs/express';
import { ReportMiddleware } from '../middleware/reportMiddleware';
import { StudyTestService } from '../service/study.test.service'

// import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost:27017/mock');
// const db: any = mongoose.connection;
// // 处理连接事件
// db.on('error', console.error.bind(console, '连接错误:'));
// db.once('open', async () => {
//   console.log('成功连接到数据库');
//   const studyRes = await db.collection('orders').findOne();
//   console.log(studyRes, 'studyRes')
//   // 在这里可以使用 db 进行原生的 MongoDB 操作
//   // 例如，db.collection('your-collection').find({}).toArray((err, result) => { /* 处理结果 */ });
// });


@Controller('/study')
export class StudyController {
  @Inject()
  ctx: any;

  @Inject()
  res: Response;

  @Inject()
  studyService: StudyTestService;

  @Get('/userTest', { middleware: [ReportMiddleware] })
  async getUserTest(@Query() query){
    console.log(query, 'hhhhhhhhhh')
    // console.log(db.dataSource, db.collections, 'queryquery');
    const studyRes = await this.studyService.getUserTest();
    // const studyRes = await db.collection('orders').findOne();
    return { success: true, message: 'OK', data: studyRes};
  }
}
