import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var UnionPipe = /** @class */ (function () {
    function UnionPipe() {
    }
    UnionPipe.prototype.transform = function (input, args) {
        if (args === void 0) { args = []; }
        if (!Array.isArray(input) || !Array.isArray(args)) {
            return input;
        }
        return args.reduce(function (newArr, currArr) {
            return newArr.concat(currArr.reduce(function (noDupArr, curr) {
                // tslint:disable-next-line:no-bitwise
                return !~noDupArr.indexOf(curr) && !~newArr.indexOf(curr) ? noDupArr.concat([curr]) : noDupArr;
            }, []));
        }, input);
    };
    UnionPipe = tslib_1.__decorate([
        Pipe({ name: 'union' })
    ], UnionPipe);
    return UnionPipe;
}());
export { UnionPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvdW5pb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFrQkEsQ0FBQztJQWRDLDZCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxTQUFnQjtRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxPQUFPO1lBQ2pDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWUsRUFBRSxJQUFTO2dCQUN4QyxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDakcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUNQLENBQUM7UUFDSixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDWixDQUFDO0lBakJVLFNBQVM7UUFEckIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO09BQ1gsU0FBUyxDQWtCckI7SUFBRCxnQkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3VuaW9uJyB9KVxuZXhwb3J0IGNsYXNzIFVuaW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCBhcmdzPzogYW55W10pOiBhbnlbXTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCBhcmdzPzogYW55W10pOiBUO1xuXG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBhcmdzOiBhbnlbXSA9IFtdKTogYW55IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpIHx8ICFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKChuZXdBcnIsIGN1cnJBcnIpID0+IHtcbiAgICAgIHJldHVybiBuZXdBcnIuY29uY2F0KFxuICAgICAgICBjdXJyQXJyLnJlZHVjZSgobm9EdXBBcnI6IGFueVtdLCBjdXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICAgIHJldHVybiAhfm5vRHVwQXJyLmluZGV4T2YoY3VycikgJiYgIX5uZXdBcnIuaW5kZXhPZihjdXJyKSA/IG5vRHVwQXJyLmNvbmNhdChbY3Vycl0pIDogbm9EdXBBcnI7XG4gICAgICAgIH0sIFtdKVxuICAgICAgKTtcbiAgICB9LCBpbnB1dCk7XG4gIH1cbn1cbiJdfQ==