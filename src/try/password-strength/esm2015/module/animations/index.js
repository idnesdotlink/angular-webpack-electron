import { animate, animation, keyframes, style } from '@angular/animations';
export function flipIn(timing, rotateX, rotateY) {
    const params = { timing: timing, delay: 0, rotateX, rotateY };
    return animation([
        style({ 'backface-visibility': 'visible' }),
        animate('{{ timing }}s {{ delay }}s ease-in', keyframes([
            style({
                opacity: 0,
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                offset: 0.4,
            }),
            style({
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                offset: 0.6,
            }),
            style({
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                offset: 0.8,
            }),
            style({
                transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                offset: 1,
            }),
        ])),
    ], { params });
}
export const flipInX = flipIn(1, 1, 0);
export const flipInY = flipIn(1, 0, 1);
export const shake = animation(animate('{{ timing }}s {{ delay }}s', keyframes([
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
    style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
])), { params: { timing: 1, delay: 0 } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3Bhc3N3b3JkLXN0cmVuZ3RoLyIsInNvdXJjZXMiOlsibW9kdWxlL2FuaW1hdGlvbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQThCLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRyxNQUFNLFVBQVUsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsT0FBZTtJQUNyRSxNQUFNLE1BQU0sR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUM7SUFFNUQsT0FBTyxTQUFTLENBQ2Q7UUFDRSxLQUFLLENBQUMsRUFBQyxxQkFBcUIsRUFBRSxTQUFTLEVBQUMsQ0FBQztRQUN6QyxPQUFPLENBQ0wsb0NBQW9DLEVBQ3BDLFNBQVMsQ0FBQztZQUNSLEtBQUssQ0FBQztnQkFDSixPQUFPLEVBQUUsQ0FBQztnQkFDVixTQUFTLEVBQ1AscUVBQXFFO2dCQUN2RSxNQUFNLEVBQUUsQ0FBQzthQUNWLENBQUM7WUFDRixLQUFLLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUyxFQUNQLHNFQUFzRTtnQkFDeEUsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLFNBQVMsRUFDUCxxRUFBcUU7Z0JBQ3ZFLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztZQUNGLEtBQUssQ0FBQztnQkFDSixTQUFTLEVBQ1AscUVBQXFFO2dCQUN2RSxNQUFNLEVBQUUsR0FBRzthQUNaLENBQUM7WUFDRixLQUFLLENBQUM7Z0JBQ0osU0FBUyxFQUFFLHlDQUF5QztnQkFDcEQsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO1NBQ0gsQ0FBQyxDQUNIO0tBQ0YsRUFDRCxFQUFDLE1BQU0sRUFBQyxDQUNULENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV2QyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUM1QixPQUFPLENBQ0wsNEJBQTRCLEVBQzVCLFNBQVMsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7SUFDckQsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMzRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzFELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDM0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzNELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMzRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzFELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDM0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztDQUN0RCxDQUFDLENBQ0gsRUFDRCxFQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFDLENBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FuaW1hdGUsIGFuaW1hdGlvbiwgQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEsIGtleWZyYW1lcywgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmxpcEluKHRpbWluZzogbnVtYmVyLCByb3RhdGVYOiBudW1iZXIsIHJvdGF0ZVk6IG51bWJlcik6IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhIHtcbiAgY29uc3QgcGFyYW1zID0ge3RpbWluZzogdGltaW5nLCBkZWxheTogMCwgcm90YXRlWCwgcm90YXRlWX07XG5cbiAgcmV0dXJuIGFuaW1hdGlvbihcbiAgICBbXG4gICAgICBzdHlsZSh7J2JhY2tmYWNlLXZpc2liaWxpdHknOiAndmlzaWJsZSd9KSxcbiAgICAgIGFuaW1hdGUoXG4gICAgICAgICd7eyB0aW1pbmcgfX1zIHt7IGRlbGF5IH19cyBlYXNlLWluJyxcbiAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKHt7IHJvdGF0ZVggfX0sIHt7IHJvdGF0ZVkgfX0sIDAsIDkwZGVnKScsXG4gICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCAtMjBkZWcpJyxcbiAgICAgICAgICAgIG9mZnNldDogMC40LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCAxMGRlZyknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLjYsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKHt7IHJvdGF0ZVggfX0sIHt7IHJvdGF0ZVkgfX0sIDAsIC01ZGVnKScsXG4gICAgICAgICAgICBvZmZzZXQ6IDAuOCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdLFxuICAgIHtwYXJhbXN9XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBmbGlwSW5YID0gZmxpcEluKDEsIDEsIDApO1xuZXhwb3J0IGNvbnN0IGZsaXBJblkgPSBmbGlwSW4oMSwgMCwgMSk7XG5cbmV4cG9ydCBjb25zdCBzaGFrZSA9IGFuaW1hdGlvbihcbiAgYW5pbWF0ZShcbiAgICAne3sgdGltaW5nIH19cyB7eyBkZWxheSB9fXMnLFxuICAgIGtleWZyYW1lcyhbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknLCBvZmZzZXQ6IDB9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLCBvZmZzZXQ6IDAuMX0pLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjJ9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLCBvZmZzZXQ6IDAuM30pLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjR9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLCBvZmZzZXQ6IDAuNX0pLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjZ9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLCBvZmZzZXQ6IDAuN30pLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjh9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLCBvZmZzZXQ6IDAuOX0pLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJywgb2Zmc2V0OiAxfSksXG4gICAgXSlcbiAgKSxcbiAge3BhcmFtczoge3RpbWluZzogMSwgZGVsYXk6IDB9fVxuKTtcbiJdfQ==