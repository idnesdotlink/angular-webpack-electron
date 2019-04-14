import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
var MaskModule = /** @class */ (function () {
    function MaskModule() {
    }
    MaskModule_1 = MaskModule;
    MaskModule.forRoot = function (configValue) {
        return {
            ngModule: MaskModule_1,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG]
                },
            ]
        };
    };
    MaskModule.forChild = function (configValue) {
        return {
            ngModule: MaskModule_1,
        };
    };
    var MaskModule_1;
    MaskModule = MaskModule_1 = tslib_1.__decorate([
        NgModule({
            providers: [MaskApplierService],
            exports: [MaskDirective, MaskPipe],
            declarations: [MaskDirective, MaskPipe]
        })
    ], MaskModule);
    return MaskModule;
}());
export { MaskModule };
/**
 * @internal
 */
export function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : tslib_1.__assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2lucHV0LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQWlCLE1BQU0sVUFBVSxDQUFDO0FBQzVGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT3ZDO0lBQUE7SUEyQkEsQ0FBQzttQkEzQlksVUFBVTtJQUVQLGtCQUFPLEdBQXJCLFVBQXNCLFdBQTJCO1FBQy9DLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxNQUFNO29CQUNmLFVBQVUsRUFBRSxjQUFjO29CQUMxQixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFDYSxtQkFBUSxHQUF0QixVQUF1QixXQUEyQjtRQUNoRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVU7U0FDckIsQ0FBQztJQUNKLENBQUM7O0lBMUJVLFVBQVU7UUFMdEIsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztZQUNsQyxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1NBQ3hDLENBQUM7T0FDVyxVQUFVLENBMkJ0QjtJQUFELGlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksVUFBVTtBQTZCdkI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUMzQixVQUF5QixFQUFFLFdBQWtEO0lBQzlFLE9BQU8sQ0FBQyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxzQkFBTSxVQUFVLEVBQUssV0FBVyxDQUFFLENBQUM7QUFDakcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbmZpZywgSU5JVElBTF9DT05GSUcsIGluaXRpYWxDb25maWcsIE5FV19DT05GSUcsIG9wdGlvbnNDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hc2tEaXJlY3RpdmUgfSBmcm9tICcuL21hc2suZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hc2tQaXBlIH0gZnJvbSAnLi9tYXNrLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtNYXNrQXBwbGllclNlcnZpY2VdLFxuICBleHBvcnRzOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXNrRGlyZWN0aXZlLCBNYXNrUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgTWFza01vZHVsZSB7XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFza01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkVXX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnVmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiBpbml0aWFsQ29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBjb25maWcsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmZpZ0ZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0lOSVRJQUxfQ09ORklHLCBORVdfQ09ORklHXVxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH07XG4gIH1cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hc2tNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbmZpZ0ZhY3RvcnlcbiAgKGluaXRDb25maWc6IG9wdGlvbnNDb25maWcsIGNvbmZpZ1ZhbHVlOiBvcHRpb25zQ29uZmlnIHwgKCgpID0+IG9wdGlvbnNDb25maWcpKTogRnVuY3Rpb24gfCBvcHRpb25zQ29uZmlnIHtcbiAgcmV0dXJuICh0eXBlb2YgY29uZmlnVmFsdWUgPT09ICdmdW5jdGlvbicpID8gY29uZmlnVmFsdWUoKSA6IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnVmFsdWUgfTtcbn1cbiJdfQ==