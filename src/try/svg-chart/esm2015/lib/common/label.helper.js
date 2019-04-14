/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
export function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2xhYmVsLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQVU7SUFDcEMsSUFBSSxLQUFLLFlBQVksSUFBSSxFQUFFO1FBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUNwQztTQUFNO1FBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNoQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRm9ybWF0cyBhIGxhYmVsIGdpdmVuIGEgZGF0ZSwgbnVtYmVyIG9yIHN0cmluZy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IGxhYmVsXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TGFiZWwobGFiZWw6IGFueSk6IHN0cmluZyB7XG4gIGlmIChsYWJlbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBsYWJlbCA9IGxhYmVsLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbDtcbn1cbiJdfQ==