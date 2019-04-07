import { Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'trypipe'
})
export class PhonePipe implements PipeTransform {
  transform(val: any, args: any) {
    val = val.charAt(0) !== 0 ? '0' + val : '' + val;
    let newStr = '';
    let i: number;

    for (i = 0; i < (Math.floor(val.length / 2) - 1); i++) {
      newStr = newStr + val.substr(i * 2, 2) + '-';
    }
    return newStr + val.substr(i * 2);
  }
}

