/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
export function getUniqueXDomainValues(results) {
    const valueSet = new Set();
    for (const result of results) {
        for (const d of result.series) {
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
export function getScaleType(values, checkDateType = true) {
    if (checkDateType) {
        const allDates = values.every(value => value instanceof Date);
        if (allDates) {
            return 'time';
        }
    }
    const allNumbers = values.every(value => typeof value === 'number');
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9kb21haW4uaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUFjO0lBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDM0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWEsRUFBRSxhQUFhLEdBQUcsSUFBSTtJQUM5RCxJQUFJLGFBQWEsRUFBRTtRQUNqQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLElBQUksVUFBVSxFQUFFO1FBQ1osT0FBTyxRQUFRLENBQUM7S0FDakI7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYXNlZCBvbiB0aGUgZGF0YSwgcmV0dXJuIGFuIGFycmF5IHdpdGggdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcmV0dXJucyBhcnJheVxuICogQHBhcmFtIHJlc3VsdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXF1ZVhEb21haW5WYWx1ZXMocmVzdWx0czogYW55W10pOiBhbnlbXSB7XG4gIGNvbnN0IHZhbHVlU2V0ID0gbmV3IFNldCgpO1xuICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdC5zZXJpZXMpIHtcbiAgICAgIHZhbHVlU2V0LmFkZChkLm5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZVNldCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBzY2FsZVR5cGUgb2YgZW51bWVyYWJsZSBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0gdmFsdWVzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAndGltZScsICdsaW5lYXInIG9yICdvcmRpbmFsJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVUeXBlKHZhbHVlczogYW55W10sIGNoZWNrRGF0ZVR5cGUgPSB0cnVlKTogc3RyaW5nIHtcbiAgaWYgKGNoZWNrRGF0ZVR5cGUpIHtcbiAgICBjb25zdCBhbGxEYXRlcyA9IHZhbHVlcy5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuICAgIGlmIChhbGxEYXRlcykge1xuICAgICAgcmV0dXJuICd0aW1lJztcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxOdW1iZXJzID0gdmFsdWVzLmV2ZXJ5KHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpO1xuICBpZiAoYWxsTnVtYmVycykge1xuICAgICAgcmV0dXJuICdsaW5lYXInO1xuICAgIH1cblxuICByZXR1cm4gJ29yZGluYWwnO1xufVxuIl19