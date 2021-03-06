/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */
export function roundedRect(x, y, w, h, r, [tl, tr, bl, br]) {
    let retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = `M${[x + r, y]}`;
    retval += `h${w - 2 * r}`;
    if (tr) {
        retval += `a${[r, r]} 0 0 1 ${[r, r]}`;
    }
    else {
        retval += `h${r}v${r}`;
    }
    retval += `v${h - 2 * r}`;
    if (br) {
        retval += `a${[r, r]} 0 0 1 ${[-r, r]}`;
    }
    else {
        retval += `v${r}h${-r}`;
    }
    retval += `h${2 * r - w}`;
    if (bl) {
        retval += `a${[r, r]} 0 0 1 ${[-r, -r]}`;
    }
    else {
        retval += `h${-r}v${-r}`;
    }
    retval += `v${2 * r - h}`;
    if (tl) {
        retval += `a${[r, r]} 0 0 1 ${[r, -r]}`;
    }
    else {
        retval += `v${-r}h${r}`;
    }
    retval += `z`;
    return retval;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3NoYXBlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQVk7SUFDcEUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWhCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEIsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUIsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUUxQixJQUFJLEVBQUUsRUFBRTtRQUNOLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDeEM7U0FBTTtRQUNMLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUN4QjtJQUVELE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFFMUIsSUFBSSxFQUFFLEVBQUU7UUFDTixNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDekM7U0FBTTtRQUNMLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUUxQixJQUFJLEVBQUUsRUFBRTtRQUNOLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzFDO1NBQU07UUFDTCxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzFCO0lBRUQsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUUxQixJQUFJLEVBQUUsRUFBRTtRQUNOLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN6QztTQUFNO1FBQ0wsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDekI7SUFFRCxNQUFNLElBQUksR0FBRyxDQUFDO0lBRWQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogR2VuZXJhdGVzIGEgcm91bmRlZCByZWN0YW5nbGFyIHBhdGhcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IHgsIHksIHcsIGgsIHIsIHRsLCB0ciwgYmwsIGJyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmRlZFJlY3QoeCwgeSwgdywgaCwgciwgW3RsLCB0ciwgYmwsIGJyXTogYm9vbGVhbltdKSB7XG4gIGxldCByZXR2YWwgPSAnJztcblxuICB3ID0gTWF0aC5mbG9vcih3KTtcbiAgaCA9IE1hdGguZmxvb3IoaCk7XG5cbiAgdyA9IHcgPT09IDAgPyAxIDogdztcbiAgaCA9IGggPT09IDAgPyAxIDogaDtcblxuICByZXR2YWwgPSBgTSR7W3ggKyByLCB5XX1gO1xuICByZXR2YWwgKz0gYGgke3cgLSAyICogcn1gO1xuXG4gIGlmICh0cikge1xuICAgIHJldHZhbCArPSBgYSR7W3IsIHJdfSAwIDAgMSAke1tyLCByXX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHZhbCArPSBgaCR7cn12JHtyfWA7XG4gIH1cblxuICByZXR2YWwgKz0gYHYke2ggLSAyICogcn1gO1xuXG4gIGlmIChicikge1xuICAgIHJldHZhbCArPSBgYSR7W3IsIHJdfSAwIDAgMSAke1stciwgcl19YDtcbiAgfSBlbHNlIHtcbiAgICByZXR2YWwgKz0gYHYke3J9aCR7LXJ9YDtcbiAgfVxuXG4gIHJldHZhbCArPSBgaCR7MiAqIHIgLSB3fWA7XG5cbiAgaWYgKGJsKSB7XG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7Wy1yLCAtcl19YDtcbiAgfSBlbHNlIHtcbiAgICByZXR2YWwgKz0gYGgkey1yfXYkey1yfWA7XG4gIH1cblxuICByZXR2YWwgKz0gYHYkezIgKiByIC0gaH1gO1xuXG4gIGlmICh0bCkge1xuICAgIHJldHZhbCArPSBgYSR7W3IsIHJdfSAwIDAgMSAke1tyLCAtcl19YDtcbiAgfSBlbHNlIHtcbiAgICByZXR2YWwgKz0gYHYkey1yfWgke3J9YDtcbiAgfVxuXG4gIHJldHZhbCArPSBgemA7XG5cbiAgcmV0dXJuIHJldHZhbDtcbn1cbiJdfQ==