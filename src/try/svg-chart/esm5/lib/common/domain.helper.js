import * as tslib_1 from "tslib";
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
export function getUniqueXDomainValues(results) {
    var e_1, _a, e_2, _b;
    var valueSet = new Set();
    try {
        for (var results_1 = tslib_1.__values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            try {
                for (var _c = tslib_1.__values(result.series), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var d = _d.value;
                    valueSet.add(d.name);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
export function getScaleType(values, checkDateType) {
    if (checkDateType === void 0) { checkDateType = true; }
    if (checkDateType) {
        var allDates = values.every(function (value) { return value instanceof Date; });
        if (allDates) {
            return 'time';
        }
    }
    var allNumbers = values.every(function (value) { return typeof value === 'number'; });
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9kb21haW4uaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsT0FBYzs7SUFDbkQsSUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7UUFDM0IsS0FBcUIsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtZQUF6QixJQUFNLE1BQU0sb0JBQUE7O2dCQUNmLEtBQWdCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO29CQUExQixJQUFNLENBQUMsV0FBQTtvQkFDVixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEI7Ozs7Ozs7OztTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWEsRUFBRSxhQUFvQjtJQUFwQiw4QkFBQSxFQUFBLG9CQUFvQjtJQUM5RCxJQUFJLGFBQWEsRUFBRTtRQUNqQixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLElBQUksRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBQzlELElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBRUQsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0lBQ3BFLElBQUksVUFBVSxFQUFFO1FBQ1osT0FBTyxRQUFRLENBQUM7S0FDakI7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYXNlZCBvbiB0aGUgZGF0YSwgcmV0dXJuIGFuIGFycmF5IHdpdGggdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcmV0dXJucyBhcnJheVxuICogQHBhcmFtIHJlc3VsdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXF1ZVhEb21haW5WYWx1ZXMocmVzdWx0czogYW55W10pOiBhbnlbXSB7XG4gIGNvbnN0IHZhbHVlU2V0ID0gbmV3IFNldCgpO1xuICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdC5zZXJpZXMpIHtcbiAgICAgIHZhbHVlU2V0LmFkZChkLm5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZVNldCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBzY2FsZVR5cGUgb2YgZW51bWVyYWJsZSBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0gdmFsdWVzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAndGltZScsICdsaW5lYXInIG9yICdvcmRpbmFsJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVUeXBlKHZhbHVlczogYW55W10sIGNoZWNrRGF0ZVR5cGUgPSB0cnVlKTogc3RyaW5nIHtcbiAgaWYgKGNoZWNrRGF0ZVR5cGUpIHtcbiAgICBjb25zdCBhbGxEYXRlcyA9IHZhbHVlcy5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuICAgIGlmIChhbGxEYXRlcykge1xuICAgICAgcmV0dXJuICd0aW1lJztcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxOdW1iZXJzID0gdmFsdWVzLmV2ZXJ5KHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpO1xuICBpZiAoYWxsTnVtYmVycykge1xuICAgICAgcmV0dXJuICdsaW5lYXInO1xuICAgIH1cblxuICByZXR1cm4gJ29yZGluYWwnO1xufVxuIl19