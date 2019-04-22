import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var TrimPipe = /** @class */ (function () {
    function TrimPipe() {
    }
    TrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("^[" + chars + "]+|[" + chars + "]+$", 'g'), '') : text;
    };
    TrimPipe = tslib_1.__decorate([
        Pipe({ name: 'trim' })
    ], TrimPipe);
    return TrimPipe;
}());
export { TrimPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvdHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFJQSxDQUFDO0lBSEMsNEJBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFxQjtRQUFyQixzQkFBQSxFQUFBLGFBQXFCO1FBQzNDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQUssS0FBSyxZQUFPLEtBQUssUUFBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEcsQ0FBQztJQUhVLFFBQVE7UUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ1YsUUFBUSxDQUlwQjtJQUFELGVBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICd0cmltJyB9KVxuZXhwb3J0IGNsYXNzIFRyaW1QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBzdHJpbmcsIGNoYXJzOiBzdHJpbmcgPSAnXFxcXHMnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodGV4dCkgPyB0ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cChgXlske2NoYXJzfV0rfFske2NoYXJzfV0rJGAsICdnJyksICcnKSA6IHRleHQ7XG4gIH1cbn1cbiJdfQ==