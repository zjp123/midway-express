import { Pipe, PipeTransform, TransformOptions } from '@midwayjs/core';

@Pipe()
export class CutPipe implements PipeTransform {
  transform(value: number, options: TransformOptions): string {
    console.log(value, 'pipe');
    return String(value).slice(5);
  }
}
