import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
export function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    let domain = [];
    if (scaleType === 'linear') {
        values = values.map(v => Number(v));
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        const min = minVal ? minVal : Math.min(...values);
        const max = maxVal ? maxVal : Math.max(...values);
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
export function getScale(domain, range, scaleType, roundDomains) {
    let scale;
    if (scaleType === 'time') {
        scale = scaleTime()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = scaleLinear()
            .range(range)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = scalePoint()
            .range([range[0], range[1]])
            .domain(domain);
    }
    return scale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYnViYmxlLWNoYXJ0L2J1YmJsZS1jaGFydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFPLEVBQUUsTUFBTztJQUNwRSxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDMUIsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7S0FDRjtJQUVELElBQUksU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2xELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUVsRCxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDckI7U0FBTTtRQUNMLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDakI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBZSxFQUFFLFNBQVMsRUFBRSxZQUFZO0lBQ3ZFLElBQUksS0FBVSxDQUFDO0lBRWYsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3hCLEtBQUssR0FBRyxTQUFTLEVBQUU7YUFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQjtTQUFNLElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUNqQyxLQUFLLEdBQUcsV0FBVyxFQUFFO2FBQ2xCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtLQUNGO1NBQU0sSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ2xDLEtBQUssR0FBRyxVQUFVLEVBQUU7YUFDakIsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVBvaW50LCBzY2FsZVRpbWUgfSBmcm9tICdkMy1zY2FsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21haW4odmFsdWVzLCBzY2FsZVR5cGUsIGF1dG9TY2FsZSwgbWluVmFsPywgbWF4VmFsPyk6IG51bWJlcltdIHtcbiAgICBsZXQgZG9tYWluOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmIChzY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgICAgIGlmICghYXV0b1NjYWxlKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY2FsZVR5cGUgPT09ICd0aW1lJyB8fCBzY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICBjb25zdCBtaW4gPSBtaW5WYWwgPyBtaW5WYWwgOiBNYXRoLm1pbiguLi52YWx1ZXMpO1xuICAgICAgY29uc3QgbWF4ID0gbWF4VmFsID8gbWF4VmFsIDogTWF0aC5tYXgoLi4udmFsdWVzKTtcblxuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdmFsdWVzO1xuICAgIH1cblxuICAgIHJldHVybiBkb21haW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZShkb21haW4sIHJhbmdlOiBudW1iZXJbXSwgc2NhbGVUeXBlLCByb3VuZERvbWFpbnMpOiBhbnkge1xuICBsZXQgc2NhbGU6IGFueTtcblxuICBpZiAoc2NhbGVUeXBlID09PSAndGltZScpIHtcbiAgICBzY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgICAucmFuZ2UocmFuZ2UpXG4gICAgICAuZG9tYWluKGRvbWFpbik7XG4gIH0gZWxzZSBpZiAoc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgIHNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgLnJhbmdlKHJhbmdlKVxuICAgICAgLmRvbWFpbihkb21haW4pO1xuXG4gICAgaWYgKHJvdW5kRG9tYWlucykge1xuICAgICAgc2NhbGUgPSBzY2FsZS5uaWNlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgc2NhbGUgPSBzY2FsZVBvaW50KClcbiAgICAgIC5yYW5nZShbcmFuZ2VbMF0sIHJhbmdlWzFdXSlcbiAgICAgIC5kb21haW4oZG9tYWluKTtcbiAgfVxuXG4gIHJldHVybiBzY2FsZTtcbn1cbiJdfQ==