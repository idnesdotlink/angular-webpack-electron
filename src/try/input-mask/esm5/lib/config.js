import { InjectionToken } from '@angular/core';
export var config = new InjectionToken('config');
export var NEW_CONFIG = new InjectionToken('NEW_CONFIG');
export var INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
export var initialConfig = {
    sufix: '',
    prefix: '',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    dropSpecialCharacters: true,
    shownMaskExpression: '',
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '\"', '\''],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true
        },
        'A': {
            pattern: new RegExp('\[a-zA-Z0-9\]')
        },
        'S': {
            pattern: new RegExp('\[a-zA-Z\]')
        },
        'd': {
            pattern: new RegExp('\\d'),
        },
        'm': {
            pattern: new RegExp('\\d'),
        },
        'H': {
            pattern: new RegExp('\\d'),
        },
        'h': {
            pattern: new RegExp('\\d'),
        },
        's': {
            pattern: new RegExp('\\d'),
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9pbnB1dC1tYXNrLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0IvQyxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQTJCLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNFLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBMkIsSUFBSSxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbkYsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUE0QixJQUFJLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTVGLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBWTtJQUNsQyxLQUFLLEVBQUUsRUFBRTtJQUNULE1BQU0sRUFBRSxFQUFFO0lBQ1YsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsYUFBYSxFQUFFLEtBQUs7SUFDcEIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixtQkFBbUIsRUFBRSxFQUFFO0lBQ3ZCLGlCQUFpQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUMzRixRQUFRLEVBQUU7UUFDTixHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDdkM7UUFDRCxHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BDO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDN0I7UUFDRCxHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDN0I7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIHN1Zml4OiBzdHJpbmc7XG4gICAgcHJlZml4OiBzdHJpbmc7XG4gICAgY2xlYXJJZk5vdE1hdGNoOiBib29sZWFuO1xuICAgIHNob3dUZW1wbGF0ZTogYm9vbGVhbjtcbiAgICBzaG93TWFza1R5cGVkOiBib29sZWFuO1xuICAgIHNob3duTWFza0V4cHJlc3Npb246IHN0cmluZztcbiAgICBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IGJvb2xlYW4gfCBzdHJpbmdbXTtcbiAgICBzcGVjaWFsQ2hhcmFjdGVyczogc3RyaW5nW107XG4gICAgcGF0dGVybnM6IHtcbiAgICAgICAgW2NoYXJhY3Rlcjogc3RyaW5nXToge1xuICAgICAgICAgICAgcGF0dGVybjogUmVnRXhwLFxuICAgICAgICAgICAgb3B0aW9uYWw/OiBib29sZWFuXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBvcHRpb25zQ29uZmlnID0gUGFydGlhbDxJQ29uZmlnPjtcbmV4cG9ydCBjb25zdCBjb25maWc6IEluamVjdGlvblRva2VuPHN0cmluZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2NvbmZpZycpO1xuZXhwb3J0IGNvbnN0IE5FV19DT05GSUc6IEluamVjdGlvblRva2VuPHN0cmluZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ05FV19DT05GSUcnKTtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0NPTkZJRzogSW5qZWN0aW9uVG9rZW48SUNvbmZpZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0lOSVRJQUxfQ09ORklHJyk7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsQ29uZmlnOiBJQ29uZmlnID0ge1xuICAgIHN1Zml4OiAnJyxcbiAgICBwcmVmaXg6ICcnLFxuICAgIGNsZWFySWZOb3RNYXRjaDogZmFsc2UsXG4gICAgc2hvd1RlbXBsYXRlOiBmYWxzZSxcbiAgICBzaG93TWFza1R5cGVkOiBmYWxzZSxcbiAgICBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IHRydWUsXG4gICAgc2hvd25NYXNrRXhwcmVzc2lvbjogJycsXG4gICAgc3BlY2lhbENoYXJhY3RlcnM6IFsnLScsICcvJywgJygnLCAnKScsICcuJywgJzonLCAnICcsICcrJywgJywnLCAnQCcsICdbJywgJ10nLCAnXFxcIicsICdcXCcnXSxcbiAgICBwYXR0ZXJuczoge1xuICAgICAgICAnMCc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgIH0sXG4gICAgICAgICc5Jzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgICdBJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxbYS16QS1aMC05XFxdJylcbiAgICAgICAgfSxcbiAgICAgICAgJ1MnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFthLXpBLVpcXF0nKVxuICAgICAgICB9LFxuICAgICAgICAnZCc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgIH0sXG4gICAgICAgICdtJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgICAgfSxcbiAgICAgICAgJ0gnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgICB9LFxuICAgICAgICAnaCc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgIH0sXG4gICAgICAgICdzJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=