var cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
export function id() {
    var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = "a" + newId;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckYsb0NBQW9DO0lBQ3BDLEtBQUssR0FBRyxNQUFJLEtBQU8sQ0FBQztJQUVwQiwwQkFBMEI7SUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLEVBQUUsRUFBRSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhY2hlID0ge307XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgc2hvcnQgaWQuXG4gKlxuICogRGVzY3JpcHRpb246XG4gKiAgIEEgNC1jaGFyYWN0ZXIgYWxwaGFudW1lcmljIHNlcXVlbmNlICgzNjQgPSAxLjYgbWlsbGlvbilcbiAqICAgVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGZvciBKYXZhU2NyaXB0IHNwZWNpZmljIG1vZGVscy5cbiAqICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjQ4NjY2L2hvdy10by1nZW5lcmF0ZS1zaG9ydC11aWQtbGlrZS1heDRqOXotaW4tanNcbiAqXG4gKiAgIEV4YW1wbGU6IGBlYmdmYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaWQoKTogc3RyaW5nIHtcbiAgbGV0IG5ld0lkID0gKCcwMDAwJyArIChNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMzYsIDQpIDw8IDApLnRvU3RyaW5nKDM2KSkuc2xpY2UoLTQpO1xuXG4gIC8vIGFwcGVuZCBhICdhJyBiZWNhdXNlIG5lbyBnZXRzIG1hZFxuICBuZXdJZCA9IGBhJHtuZXdJZH1gO1xuXG4gIC8vIGVuc3VyZSBub3QgYWxyZWFkeSB1c2VkXG4gIGlmICghY2FjaGVbbmV3SWRdKSB7XG4gICAgY2FjaGVbbmV3SWRdID0gdHJ1ZTtcbiAgICByZXR1cm4gbmV3SWQ7XG4gIH1cblxuICByZXR1cm4gaWQoKTtcbn1cbiJdfQ==