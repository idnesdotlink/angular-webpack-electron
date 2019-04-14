import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var LanguagePipe = /** @class */ (function () {
    function LanguagePipe() {
    }
    LanguagePipe.prototype.transform = function (value, language) {
        if (typeof value !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        if (typeof language !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid parameter [" + language + "]");
            return value;
        }
        return '```' + language + '\n' + value + '\n```';
    };
    LanguagePipe = tslib_1.__decorate([
        Pipe({
            name: 'language',
        })
    ], LanguagePipe);
    return LanguagePipe;
}());
export { LanguagePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL2xhbmd1YWdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BEO0lBQUE7SUFhQSxDQUFDO0lBWEMsZ0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFnQjtRQUN2QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLCtEQUE2RCxLQUFLLE1BQUcsQ0FBQyxDQUFDO1lBQ3JGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhEQUE0RCxRQUFRLE1BQUcsQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFJLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDcEQsQ0FBQztJQVpVLFlBQVk7UUFIeEIsSUFBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQztPQUNXLFlBQVksQ0FheEI7SUFBRCxtQkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2xhbmd1YWdlJyxcbn0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBMYW5ndWFnZVBpcGUgaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIGludmFsaWQgdmFsdWUgdHlwZSBbJHt2YWx1ZX1dYCk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGFuZ3VhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBMYW5ndWFnZVBpcGUgaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIGludmFsaWQgcGFyYW1ldGVyIFske2xhbmd1YWdlfV1gKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuICdgYGAnICsgbGFuZ3VhZ2UgKyAnXFxuJyArICB2YWx1ZSArICdcXG5gYGAnO1xuICB9XG59XG4iXX0=