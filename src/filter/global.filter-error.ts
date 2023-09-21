import { Catch } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

@Catch()
export class GlobalError {
  catch(err: Error | any, req: Context, res: Response) {
    if (err) {
      console.log(111111, err);
      return {
        status: err.status ?? 500,
        message: err.message,
      };
    }
  }
}
