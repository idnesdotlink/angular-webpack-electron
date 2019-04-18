import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isVowel } from '../helpers/helpers';
let AorAnPipe = 
/**
 * Takes a string and returns the string prepended by 'a' or 'an'.
 * Uses both naive and holdout-list approaches.
 * @constructor
 * @param {string} stringEntity - Entity to prepend 'a' or 'an' to.
 */
class AorAnPipe {
    constructor() {
        this.irregularMap = {
            herb: 'an',
            honor: 'an',
            honorable: 'an',
            hour: 'an',
            mba: 'an',
            msc: 'an',
            'm.sc.': 'an',
            unicorn: 'a',
        };
    }
    transform(stringEntity) {
        if (!stringEntity || stringEntity === '') {
            return '';
        }
        else {
            const firstWord = stringEntity.trim().split(' ')[0];
            if (this.irregularMap[firstWord.toLocaleLowerCase()]) {
                return `${this.irregularMap[firstWord.toLocaleLowerCase()]} ${stringEntity}`;
            }
            else {
                return isVowel(stringEntity[0]) ? `an ${stringEntity}` : `a ${stringEntity}`;
            }
        }
    }
};
AorAnPipe = tslib_1.__decorate([
    Pipe({
        name: 'a-or-an',
    })
    /**
     * Takes a string and returns the string prepended by 'a' or 'an'.
     * Uses both naive and holdout-list approaches.
     * @constructor
     * @param {string} stringEntity - Entity to prepend 'a' or 'an' to.
     */
], AorAnPipe);
export { AorAnPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS1vci1hbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvYS1vci1hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBVTdDLElBQWEsU0FBUztBQU50Qjs7Ozs7R0FLRztBQUNILE1BQWEsU0FBUztJQVR0QjtRQVVVLGlCQUFZLEdBQVE7WUFDMUIsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUk7WUFDVixHQUFHLEVBQUUsSUFBSTtZQUNULEdBQUcsRUFBRSxJQUFJO1lBQ1QsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsR0FBRztTQUNiLENBQUM7SUFhSixDQUFDO0lBWkMsU0FBUyxDQUFDLFlBQW9CO1FBQzVCLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDO2FBQzlFO2lCQUFNO2dCQUNMLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRSxDQUFDO2FBQzlFO1NBQ0Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXZCWSxTQUFTO0lBVHJCLElBQUksQ0FBQztRQUNKLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUM7SUFDRjs7Ozs7T0FLRztHQUNVLFNBQVMsQ0F1QnJCO1NBdkJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1Zvd2VsIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcbkBQaXBlKHtcbiAgbmFtZTogJ2Etb3ItYW4nLFxufSlcbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgYW5kIHJldHVybnMgdGhlIHN0cmluZyBwcmVwZW5kZWQgYnkgJ2EnIG9yICdhbicuXG4gKiBVc2VzIGJvdGggbmFpdmUgYW5kIGhvbGRvdXQtbGlzdCBhcHByb2FjaGVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nRW50aXR5IC0gRW50aXR5IHRvIHByZXBlbmQgJ2EnIG9yICdhbicgdG8uXG4gKi9cbmV4cG9ydCBjbGFzcyBBb3JBblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBpcnJlZ3VsYXJNYXA6IGFueSA9IHtcbiAgICBoZXJiOiAnYW4nLFxuICAgIGhvbm9yOiAnYW4nLFxuICAgIGhvbm9yYWJsZTogJ2FuJyxcbiAgICBob3VyOiAnYW4nLFxuICAgIG1iYTogJ2FuJyxcbiAgICBtc2M6ICdhbicsXG4gICAgJ20uc2MuJzogJ2FuJyxcbiAgICB1bmljb3JuOiAnYScsXG4gIH07XG4gIHRyYW5zZm9ybShzdHJpbmdFbnRpdHk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFzdHJpbmdFbnRpdHkgfHwgc3RyaW5nRW50aXR5ID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaXJzdFdvcmQgPSBzdHJpbmdFbnRpdHkudHJpbSgpLnNwbGl0KCcgJylbMF07XG4gICAgICBpZiAodGhpcy5pcnJlZ3VsYXJNYXBbZmlyc3RXb3JkLnRvTG9jYWxlTG93ZXJDYXNlKCldKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmlycmVndWxhck1hcFtmaXJzdFdvcmQudG9Mb2NhbGVMb3dlckNhc2UoKV19ICR7c3RyaW5nRW50aXR5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNWb3dlbChzdHJpbmdFbnRpdHlbMF0pID8gYGFuICR7c3RyaW5nRW50aXR5fWAgOiBgYSAke3N0cmluZ0VudGl0eX1gO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19