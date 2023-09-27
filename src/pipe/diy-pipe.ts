import {
  Pipe,
  PipeTransform,
  PipeUnionTransform,
  TransformOptions,
  createCustomParamDecorator,
} from '@midwayjs/core';

export function RegValid(reg: RegExp, pipe: PipeUnionTransform) {
  return createCustomParamDecorator(
    'reg-valid',
    {
      reg,
    },
    {
      // ...
      pipes: [pipe],
    }
  );
}

@Pipe()
export class CutPipe implements PipeTransform {
  transform(value: number, options: TransformOptions): string {
    console.log(value, 'llll');
    return String(value).slice(5);
  }
}

// eslint-disable-line
// eslint-disable-next-line

// class UserService {
//   invoke(@RegValid(/\d{11}/, CutPipe) phoneNumber: string) {
//     // eslint-disable-line
//     return phoneNumber;
//   }
// }

// const us = new UserService();
// console.log(us.invoke('123456789'), 'aaaaa');
