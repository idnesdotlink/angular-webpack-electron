import { __decorate } from 'tslib';
import { Component, NgModule } from '@angular/core';

var CobaComponent = /** @class */ (function () {
    function CobaComponent() {
    }
    CobaComponent = __decorate([
        Component({
            selector: 'coba',
            template: '<p>coba-coba</p>'
        })
    ], CobaComponent);
    return CobaComponent;
}());

var CobaModule = /** @class */ (function () {
    function CobaModule() {
    }
    CobaModule = __decorate([
        NgModule({
            declarations: [
                CobaComponent
            ],
            exports: [
                CobaComponent
            ]
        })
    ], CobaModule);
    return CobaModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { CobaComponent, CobaModule };
//# sourceMappingURL=try-coba.js.map
