import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var TrurthifyPipe = /** @class */ (function () {
    function TrurthifyPipe() {
    }
    TrurthifyPipe.prototype.transform = function (input) {
        return Array.isArray(input) ? input.filter(function (e) { return !!e; }) : input;
    };
    TrurthifyPipe = tslib_1.__decorate([
        Pipe({ name: 'truthify' })
    ], TrurthifyPipe);
    return TrurthifyPipe;
}());
export { TrurthifyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1dGhpZnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvdHJ1dGhpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFPQSxDQUFDO0lBSEMsaUNBQVMsR0FBVCxVQUFVLEtBQVU7UUFDbEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQy9ELENBQUM7SUFOVSxhQUFhO1FBRHpCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztPQUNkLGFBQWEsQ0FPekI7SUFBRCxvQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3RydXRoaWZ5JyB9KVxuZXhwb3J0IGNsYXNzIFRydXJ0aGlmeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSk6IGFueVtdO1xuICB0cmFuc2Zvcm08VD4oaW5wdXQ6IFQpOiBUO1xuXG4gIHRyYW5zZm9ybShpbnB1dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dC5maWx0ZXIoZSA9PiAhIWUpIDogaW5wdXQ7XG4gIH1cbn1cbiJdfQ==