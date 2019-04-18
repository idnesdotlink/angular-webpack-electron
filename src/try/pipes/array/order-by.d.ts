import { PipeTransform } from '@angular/core';
export declare class OrderByPipe implements PipeTransform {
    private static simpleSort;
    private static orderCompare;
    private static extractFromConfig;
    transform(input: any[], config?: any): any[];
    transform<T>(input: T, config?: any): T;
}
