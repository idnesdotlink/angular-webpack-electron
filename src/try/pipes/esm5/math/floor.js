import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var FloorPipe = /** @class */ (function () {
    function FloorPipe() {
    }
    FloorPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        if (precision <= 0) {
            return Math.floor(num);
        }
        var tho = Math.pow(10, precision);
        return Math.floor(num * tho) / tho;
    };
    FloorPipe = tslib_1.__decorate([
        Pipe({ name: 'floor' })
    ], FloorPipe);
    return FloorPipe;
}());
export { FloorPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsibWF0aC9mbG9vci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQVVBLENBQUM7SUFUQyw2QkFBUyxHQUFULFVBQVUsR0FBVyxFQUFFLFNBQXFCO1FBQXJCLDBCQUFBLEVBQUEsYUFBcUI7UUFDMUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELElBQU0sR0FBRyxHQUFHLFNBQUEsRUFBRSxFQUFJLFNBQVMsQ0FBQSxDQUFDO1FBRTVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFUVSxTQUFTO1FBRHJCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztPQUNYLFNBQVMsQ0FVckI7SUFBRCxnQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2Zsb29yJyB9KVxuZXhwb3J0IGNsYXNzIEZsb29yUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0obnVtOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgaWYgKHByZWNpc2lvbiA8PSAwKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihudW0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRobyA9IDEwICoqIHByZWNpc2lvbjtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIHRobykgLyB0aG87XG4gIH1cbn1cbiJdfQ==