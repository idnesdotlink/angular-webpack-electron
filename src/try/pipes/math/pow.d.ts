import { PipeTransform } from '@angular/core';
export declare class PowerPipe implements PipeTransform {
    transform(num: number, power?: number): number;
    transform(num: any, power?: number): any;
}
