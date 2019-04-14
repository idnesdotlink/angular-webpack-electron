import * as tslib_1 from "tslib";
var MaskModule_1;
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
let MaskModule = MaskModule_1 = class MaskModule {
    static forRoot(configValue) {
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
    }
    static forChild(configValue) {
        return {
            ngModule: MaskModule_1,
        };
    }
};
MaskModule = MaskModule_1 = tslib_1.__decorate([
    NgModule({
        providers: [MaskApplierService],
        exports: [MaskDirective, MaskPipe],
        declarations: [MaskDirective, MaskPipe]
    })
], MaskModule);
export { MaskModule };
/**
 * @internal
 */
export function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : Object.assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2lucHV0LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUM1RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU92QyxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVTtJQUVkLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBMkI7UUFDL0MsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsVUFBVTtvQkFDbkIsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLE1BQU07b0JBQ2YsVUFBVSxFQUFFLGNBQWM7b0JBQzFCLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUM7aUJBQ25DO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBMkI7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1NBQ3JCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTNCWSxVQUFVO0lBTHRCLFFBQVEsQ0FBQztRQUNSLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7UUFDbEMsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztLQUN4QyxDQUFDO0dBQ1csVUFBVSxDQTJCdEI7U0EzQlksVUFBVTtBQTZCdkI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUMzQixVQUF5QixFQUFFLFdBQWtEO0lBQzlFLE9BQU8sQ0FBQyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxtQkFBTSxVQUFVLEVBQUssV0FBVyxDQUFFLENBQUM7QUFDakcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbmZpZywgSU5JVElBTF9DT05GSUcsIGluaXRpYWxDb25maWcsIE5FV19DT05GSUcsIG9wdGlvbnNDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hc2tEaXJlY3RpdmUgfSBmcm9tICcuL21hc2suZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hc2tQaXBlIH0gZnJvbSAnLi9tYXNrLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtNYXNrQXBwbGllclNlcnZpY2VdLFxuICBleHBvcnRzOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXNrRGlyZWN0aXZlLCBNYXNrUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgTWFza01vZHVsZSB7XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFza01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkVXX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnVmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiBpbml0aWFsQ29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBjb25maWcsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmZpZ0ZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0lOSVRJQUxfQ09ORklHLCBORVdfQ09ORklHXVxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH07XG4gIH1cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hc2tNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbmZpZ0ZhY3RvcnlcbiAgKGluaXRDb25maWc6IG9wdGlvbnNDb25maWcsIGNvbmZpZ1ZhbHVlOiBvcHRpb25zQ29uZmlnIHwgKCgpID0+IG9wdGlvbnNDb25maWcpKTogRnVuY3Rpb24gfCBvcHRpb25zQ29uZmlnIHtcbiAgcmV0dXJuICh0eXBlb2YgY29uZmlnVmFsdWUgPT09ICdmdW5jdGlvbicpID8gY29uZmlnVmFsdWUoKSA6IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnVmFsdWUgfTtcbn1cbiJdfQ==