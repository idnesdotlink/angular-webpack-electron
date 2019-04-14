export function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        var reduced = [];
        var modulus = Math.floor(ticks.length / maxTicks);
        for (var i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja3MuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2F4ZXMvdGlja3MuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVE7SUFDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRTtRQUMzQixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDRjtRQUNELEtBQUssR0FBRyxPQUFPLENBQUM7S0FDakI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKSB7XG4gIGlmICh0aWNrcy5sZW5ndGggPiBtYXhUaWNrcykge1xuICAgIGNvbnN0IHJlZHVjZWQgPSBbXTtcbiAgICBjb25zdCBtb2R1bHVzID0gTWF0aC5mbG9vcih0aWNrcy5sZW5ndGggLyBtYXhUaWNrcyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgJSBtb2R1bHVzID09PSAwKSB7XG4gICAgICAgIHJlZHVjZWQucHVzaCh0aWNrc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRpY2tzID0gcmVkdWNlZDtcbiAgfVxuXG4gIHJldHVybiB0aWNrcztcbn1cbiJdfQ==