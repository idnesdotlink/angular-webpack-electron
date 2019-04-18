import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var SqrtPipe = /** @class */ (function () {
    function SqrtPipe() {
    }
    SqrtPipe.prototype.transform = function (num) {
        return !isNaN(num) ? Math.sqrt(num) : num;
    };
    SqrtPipe = tslib_1.__decorate([
        Pipe({ name: 'sqrt' })
    ], SqrtPipe);
    return SqrtPipe;
}());
export { SqrtPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL3NxcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFPQSxDQUFDO0lBSEMsNEJBQVMsR0FBVCxVQUFVLEdBQVE7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFOVSxRQUFRO1FBRHBCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUNWLFFBQVEsQ0FPcEI7SUFBRCxlQUFDO0NBQUEsQUFQRCxJQU9DO1NBUFksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc3FydCcgfSlcbmV4cG9ydCBjbGFzcyBTcXJ0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0obnVtOiBudW1iZXIpOiBudW1iZXI7XG4gIHRyYW5zZm9ybTxUPihudW06IFQpOiBUO1xuXG4gIHRyYW5zZm9ybShudW06IGFueSk6IGFueSB7XG4gICAgcmV0dXJuICFpc05hTihudW0pID8gTWF0aC5zcXJ0KG51bSkgOiBudW07XG4gIH1cbn1cbiJdfQ==