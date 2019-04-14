const cache = {};
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
    let newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = `a${newId}`;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckYsb0NBQW9DO0lBQ3BDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXBCLDBCQUEwQjtJQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE9BQU8sRUFBRSxFQUFFLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2FjaGUgPSB7fTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBzaG9ydCBpZC5cbiAqXG4gKiBEZXNjcmlwdGlvbjpcbiAqICAgQSA0LWNoYXJhY3RlciBhbHBoYW51bWVyaWMgc2VxdWVuY2UgKDM2NCA9IDEuNiBtaWxsaW9uKVxuICogICBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIEphdmFTY3JpcHQgc3BlY2lmaWMgbW9kZWxzLlxuICogICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyNDg2NjYvaG93LXRvLWdlbmVyYXRlLXNob3J0LXVpZC1saWtlLWF4NGo5ei1pbi1qc1xuICpcbiAqICAgRXhhbXBsZTogYGViZ2ZgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpZCgpOiBzdHJpbmcge1xuICBsZXQgbmV3SWQgPSAoJzAwMDAnICsgKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgNCkgPDwgMCkudG9TdHJpbmcoMzYpKS5zbGljZSgtNCk7XG5cbiAgLy8gYXBwZW5kIGEgJ2EnIGJlY2F1c2UgbmVvIGdldHMgbWFkXG4gIG5ld0lkID0gYGEke25ld0lkfWA7XG5cbiAgLy8gZW5zdXJlIG5vdCBhbHJlYWR5IHVzZWRcbiAgaWYgKCFjYWNoZVtuZXdJZF0pIHtcbiAgICBjYWNoZVtuZXdJZF0gPSB0cnVlO1xuICAgIHJldHVybiBuZXdJZDtcbiAgfVxuXG4gIHJldHVybiBpZCgpO1xufVxuIl19