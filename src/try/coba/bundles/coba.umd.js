(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('coba', ['exports', '@angular/core'], factory) :
    (factory((global.coba = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CobaComponent = /** @class */ (function () {
        function CobaComponent() {
        }
        CobaComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'coba',
                        template: '<p>coba-coba</p>'
                    }] }
        ];
        return CobaComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CobaModule = /** @class */ (function () {
        function CobaModule() {
        }
        CobaModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            CobaComponent
                        ],
                        exports: [
                            CobaComponent
                        ]
                    },] }
        ];
        return CobaModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.CobaComponent = CobaComponent;
    exports.CobaModule = CobaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=coba.umd.js.map