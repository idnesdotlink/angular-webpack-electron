import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isVowel } from '../helpers/helpers';
var AorAnPipe = /** @class */ (function () {
    function AorAnPipe() {
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
    AorAnPipe.prototype.transform = function (stringEntity) {
        if (!stringEntity || stringEntity === '') {
            return '';
        }
        else {
            var firstWord = stringEntity.trim().split(' ')[0];
            if (this.irregularMap[firstWord.toLocaleLowerCase()]) {
                return this.irregularMap[firstWord.toLocaleLowerCase()] + " " + stringEntity;
            }
            else {
                return isVowel(stringEntity[0]) ? "an " + stringEntity : "a " + stringEntity;
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
    return AorAnPipe;
}());
export { AorAnPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS1vci1hbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvYS1vci1hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBVTdDO0lBVEE7UUFVVSxpQkFBWSxHQUFRO1lBQzFCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLElBQUk7WUFDVCxHQUFHLEVBQUUsSUFBSTtZQUNULE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEdBQUc7U0FDYixDQUFDO0lBYUosQ0FBQztJQVpDLDZCQUFTLEdBQVQsVUFBVSxZQUFvQjtRQUM1QixJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksS0FBSyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxFQUFFLENBQUM7U0FDWDthQUFNO1lBQ0wsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRTtnQkFDcEQsT0FBVSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQUksWUFBYyxDQUFDO2FBQzlFO2lCQUFNO2dCQUNMLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFNLFlBQWMsQ0FBQyxDQUFDLENBQUMsT0FBSyxZQUFjLENBQUM7YUFDOUU7U0FDRjtJQUNILENBQUM7SUF0QlUsU0FBUztRQVRyQixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO1FBQ0Y7Ozs7O1dBS0c7T0FDVSxTQUFTLENBdUJyQjtJQUFELGdCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F2QlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzVm93ZWwgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuQFBpcGUoe1xuICBuYW1lOiAnYS1vci1hbicsXG59KVxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHByZXBlbmRlZCBieSAnYScgb3IgJ2FuJy5cbiAqIFVzZXMgYm90aCBuYWl2ZSBhbmQgaG9sZG91dC1saXN0IGFwcHJvYWNoZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdFbnRpdHkgLSBFbnRpdHkgdG8gcHJlcGVuZCAnYScgb3IgJ2FuJyB0by5cbiAqL1xuZXhwb3J0IGNsYXNzIEFvckFuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIGlycmVndWxhck1hcDogYW55ID0ge1xuICAgIGhlcmI6ICdhbicsXG4gICAgaG9ub3I6ICdhbicsXG4gICAgaG9ub3JhYmxlOiAnYW4nLFxuICAgIGhvdXI6ICdhbicsXG4gICAgbWJhOiAnYW4nLFxuICAgIG1zYzogJ2FuJyxcbiAgICAnbS5zYy4nOiAnYW4nLFxuICAgIHVuaWNvcm46ICdhJyxcbiAgfTtcbiAgdHJhbnNmb3JtKHN0cmluZ0VudGl0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXN0cmluZ0VudGl0eSB8fCBzdHJpbmdFbnRpdHkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpcnN0V29yZCA9IHN0cmluZ0VudGl0eS50cmltKCkuc3BsaXQoJyAnKVswXTtcbiAgICAgIGlmICh0aGlzLmlycmVndWxhck1hcFtmaXJzdFdvcmQudG9Mb2NhbGVMb3dlckNhc2UoKV0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaXJyZWd1bGFyTWFwW2ZpcnN0V29yZC50b0xvY2FsZUxvd2VyQ2FzZSgpXX0gJHtzdHJpbmdFbnRpdHl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpc1Zvd2VsKHN0cmluZ0VudGl0eVswXSkgPyBgYW4gJHtzdHJpbmdFbnRpdHl9YCA6IGBhICR7c3RyaW5nRW50aXR5fWA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=