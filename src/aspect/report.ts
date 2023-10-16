import { Aspect, IMethodAspect, JoinPoint } from '@midwayjs/core';
import { HomeController } from '../controller/home.controller';

// export interface IMethodAspect {
//   after?(joinPoint: JoinPoint, result: any, error: Error);
//   afterReturn?(joinPoint: JoinPoint, result: any): any;
//   afterThrow?(joinPoint: JoinPoint, error: Error): void;
//   before?(joinPoint: JoinPoint): void;
//   around?(joinPoint: JoinPoint): any;
// }
// 一般情况下，我们只需要对某个 Class 特定的方法做拦截 @Aspect 装饰的第二个参数则是一个通配方法的字符串
@Aspect([HomeController], 'lanjieqi')
export class ReportInfo implements IMethodAspect {
  async before(point: JoinPoint) {
    console.log('before home router run');
  }
}
