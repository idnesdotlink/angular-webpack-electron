import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString, isUndefined } from '../helpers/helpers';
var ScanPipe = /** @class */ (function () {
    function ScanPipe() {
    }
    ScanPipe.prototype.transform = function (text, args) {
        if (args === void 0) { args = []; }
        return isString(text)
            ? text.replace(/\{(\d+)}/g, function (match, index) { return (!isUndefined(args[index]) ? args[index] : match); })
            : text;
    };
    ScanPipe = tslib_1.__decorate([
        Pipe({ name: 'scan' })
    ], ScanPipe);
    return ScanPipe;
}());
export { ScanPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2Nhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRDtJQUFBO0lBTUEsQ0FBQztJQUxDLDRCQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsSUFBbUI7UUFBbkIscUJBQUEsRUFBQSxTQUFtQjtRQUN6QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUM7WUFDaEcsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFMVSxRQUFRO1FBRHBCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUNWLFFBQVEsQ0FNcEI7SUFBRCxlQUFDO0NBQUEsQUFORCxJQU1DO1NBTlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nLCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3NjYW4nIH0pXG5leHBvcnQgY2xhc3MgU2NhblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgYXJnczogc3RyaW5nW10gPSBbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHRleHQpXG4gICAgICA/IHRleHQucmVwbGFjZSgvXFx7KFxcZCspfS9nLCAobWF0Y2gsIGluZGV4KSA9PiAoIWlzVW5kZWZpbmVkKGFyZ3NbaW5kZXhdKSA/IGFyZ3NbaW5kZXhdIDogbWF0Y2gpKVxuICAgICAgOiB0ZXh0O1xuICB9XG59XG4iXX0=