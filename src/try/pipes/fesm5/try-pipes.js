import { __decorate, __spread, __read, __extends } from 'tslib';
import { Pipe, NgModule } from '@angular/core';

var DiffPipe = /** @class */ (function () {
    function DiffPipe() {
    }
    DiffPipe.prototype.transform = function (input) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(input)) {
            return input;
        }
        // tslint:disable-next-line no-bitwise
        return args.reduce(function (d, c) { return d.filter(function (e) { return !~c.indexOf(e); }); }, input);
    };
    DiffPipe = __decorate([
        Pipe({ name: 'diff' })
    ], DiffPipe);
    return DiffPipe;
}());

var InitialPipe = /** @class */ (function () {
    function InitialPipe() {
    }
    InitialPipe.prototype.transform = function (input, num) {
        if (num === void 0) { num = 0; }
        return Array.isArray(input) ? input.slice(0, input.length - num) : input;
    };
    InitialPipe = __decorate([
        Pipe({ name: 'initial' })
    ], InitialPipe);
    return InitialPipe;
}());

var FlattenPipe = /** @class */ (function () {
    function FlattenPipe() {
    }
    FlattenPipe.prototype.transform = function (input, shallow) {
        if (shallow === void 0) { shallow = false; }
        if (!Array.isArray(input)) {
            return input;
        }
        return shallow ? [].concat.apply([], input) : this.flatten(input);
    };
    FlattenPipe.prototype.flatten = function (array) {
        var _this = this;
        return array.reduce(function (arr, elm) {
            if (Array.isArray(elm)) {
                return arr.concat(_this.flatten(elm));
            }
            return arr.concat(elm);
        }, []);
    };
    FlattenPipe = __decorate([
        Pipe({ name: 'flatten' })
    ], FlattenPipe);
    return FlattenPipe;
}());

var IntersectionPipe = /** @class */ (function () {
    function IntersectionPipe() {
    }
    IntersectionPipe.prototype.transform = function (input) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(input)) {
            return input;
        }
        // tslint:disable-next-line no-bitwise
        return args.reduce(function (n, c) { return n.filter(function (e) { return !!~c.indexOf(e); }); }, input);
    };
    IntersectionPipe = __decorate([
        Pipe({ name: 'intersection' })
    ], IntersectionPipe);
    return IntersectionPipe;
}());

function isUndefined(value) {
    return typeof value === 'undefined';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isString(value) {
    return typeof value === 'string';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
function isNumberFinite(value) {
    return isNumber(value) && isFinite(value);
}
function isVowel(letter) {
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.indexOf(letter) !== -1;
}
function applyPrecision(num, precision) {
    if (precision <= 0) {
        return Math.round(num);
    }
    var tho = Math.pow(10, precision);
    return Math.round(num * tho) / tho;
}
function extractDeepPropertyByMapKey(obj, map) {
    var keys = map.split('.');
    var head = keys.shift();
    return keys.reduce(function (prop, key) {
        return !isUndefined(prop) && !isUndefined(prop[key]) ? prop[key] : undefined;
    }, obj[head || '']);
}
function extractDeepPropertyByParentMapKey(obj, map) {
    var keys = map.split('.');
    var tail = keys.pop();
    var props = extractDeepPropertyByMapKey(obj, keys.join('.'));
    return { props: props, tail: tail };
}
function getKeysTwoObjects(obj, other) {
    return __spread(Object.keys(obj), Object.keys(other)).filter(function (key, index, array) { return array.indexOf(key) === index; });
}
function isDeepEqual(obj, other) {
    if (!isObject(obj) || !isObject(other)) {
        return obj === other;
    }
    return getKeysTwoObjects(obj, other).every(function (key) {
        if (!isObject(obj[key]) && !isObject(other[key])) {
            return obj[key] === other[key];
        }
        if (!isObject(obj[key]) || !isObject(other[key])) {
            return false;
        }
        return isDeepEqual(obj[key], other[key]);
    });
}

var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (input) {
        if (isString(input)) {
            return input
                .split('')
                .reverse()
                .join('');
        }
        return Array.isArray(input) ? input.slice().reverse() : input;
    };
    ReversePipe = __decorate([
        Pipe({ name: 'reverse' })
    ], ReversePipe);
    return ReversePipe;
}());

var TailPipe = /** @class */ (function () {
    function TailPipe() {
    }
    TailPipe.prototype.transform = function (input, num) {
        if (num === void 0) { num = 0; }
        return Array.isArray(input) ? input.slice(num) : input;
    };
    TailPipe = __decorate([
        Pipe({ name: 'tail' })
    ], TailPipe);
    return TailPipe;
}());

var TrurthifyPipe = /** @class */ (function () {
    function TrurthifyPipe() {
    }
    TrurthifyPipe.prototype.transform = function (input) {
        return Array.isArray(input) ? input.filter(function (e) { return !!e; }) : input;
    };
    TrurthifyPipe = __decorate([
        Pipe({ name: 'truthify' })
    ], TrurthifyPipe);
    return TrurthifyPipe;
}());

var UnionPipe = /** @class */ (function () {
    function UnionPipe() {
    }
    UnionPipe.prototype.transform = function (input, args) {
        if (args === void 0) { args = []; }
        if (!Array.isArray(input) || !Array.isArray(args)) {
            return input;
        }
        return args.reduce(function (newArr, currArr) {
            return newArr.concat(currArr.reduce(function (noDupArr, curr) {
                // tslint:disable-next-line:no-bitwise
                return !~noDupArr.indexOf(curr) && !~newArr.indexOf(curr) ? noDupArr.concat([curr]) : noDupArr;
            }, []));
        }, input);
    };
    UnionPipe = __decorate([
        Pipe({ name: 'union' })
    ], UnionPipe);
    return UnionPipe;
}());

var UniquePipe = /** @class */ (function () {
    function UniquePipe() {
    }
    UniquePipe.prototype.transform = function (input, propertyName) {
        var uniques = [];
        return Array.isArray(input)
            ? isUndefined(propertyName)
                ? input.filter(function (e, i) { return input.indexOf(e) === i; })
                : input.filter(function (e, i) {
                    var value = extractDeepPropertyByMapKey(e, propertyName);
                    value = isObject(value) ? JSON.stringify(value) : value;
                    if (isUndefined(value) || uniques[value]) {
                        return false;
                    }
                    uniques[value] = true;
                    return true;
                })
            : input;
    };
    UniquePipe = __decorate([
        Pipe({ name: 'unique' })
    ], UniquePipe);
    return UniquePipe;
}());

var WithoutPipe = /** @class */ (function () {
    function WithoutPipe() {
    }
    WithoutPipe.prototype.transform = function (input, args) {
        if (args === void 0) { args = []; }
        return Array.isArray(input)
            ? // tslint:disable-next-line:no-bitwise
                input.filter(function (e) { return !~args.indexOf(e); })
            : input;
    };
    WithoutPipe = __decorate([
        Pipe({ name: 'without' })
    ], WithoutPipe);
    return WithoutPipe;
}());

var PluckPipe = /** @class */ (function () {
    function PluckPipe() {
    }
    PluckPipe.prototype.transform = function (input, map) {
        if (Array.isArray(input)) {
            return input.map(function (e) { return extractDeepPropertyByMapKey(e, map); });
        }
        return isObject(input) ? extractDeepPropertyByMapKey(input, map) : input;
    };
    PluckPipe = __decorate([
        Pipe({ name: 'pluck', pure: false })
    ], PluckPipe);
    return PluckPipe;
}());

var ShufflePipe = /** @class */ (function () {
    function ShufflePipe() {
    }
    // Using a version of the Fisher-Yates shuffle algorithm
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    ShufflePipe.prototype.transform = function (input) {
        var _a;
        if (!Array.isArray(input)) {
            return input;
        }
        var shuffled = __spread(input);
        var n = input.length - 1;
        for (var i = 0; i < n; ++i) {
            var j = Math.floor(Math.random() * (n - i + 1)) + i;
            _a = __read([shuffled[j], shuffled[i]], 2), shuffled[i] = _a[0], shuffled[j] = _a[1];
        }
        return shuffled;
    };
    ShufflePipe = __decorate([
        Pipe({ name: 'shuffle' })
    ], ShufflePipe);
    return ShufflePipe;
}());

var EveryPipe = /** @class */ (function () {
    function EveryPipe() {
    }
    EveryPipe.prototype.transform = function (input, predicate) {
        return Array.isArray(input) ? input.every(predicate) : false;
    };
    EveryPipe = __decorate([
        Pipe({ name: 'every' })
    ], EveryPipe);
    return EveryPipe;
}());

var SomePipe = /** @class */ (function () {
    function SomePipe() {
    }
    SomePipe.prototype.transform = function (input, predicate) {
        return Array.isArray(input) ? input.some(predicate) : input;
    };
    SomePipe = __decorate([
        Pipe({ name: 'some' })
    ], SomePipe);
    return SomePipe;
}());

var SamplePipe = /** @class */ (function () {
    function SamplePipe() {
    }
    SamplePipe.prototype.transform = function (input, len) {
        if (len === void 0) { len = 1; }
        if (!Array.isArray(input)) {
            return input;
        }
        var sample = [];
        var tmp = __spread(input);
        var l = len < tmp.length ? len : tmp.length;
        for (var i = 0; i < l; ++i) {
            sample = sample.concat(tmp.splice(Math.floor(Math.random() * tmp.length), 1));
        }
        return sample;
    };
    SamplePipe = __decorate([
        Pipe({ name: 'sample' })
    ], SamplePipe);
    return SamplePipe;
}());

var GroupByPipe = /** @class */ (function () {
    function GroupByPipe() {
    }
    GroupByPipe.prototype.transform = function (input, discriminator, delimiter) {
        if (discriminator === void 0) { discriminator = []; }
        if (delimiter === void 0) { delimiter = '|'; }
        if (!Array.isArray(input)) {
            return input;
        }
        return this.groupBy(input, discriminator, delimiter);
    };
    GroupByPipe.prototype.groupBy = function (list, discriminator, delimiter) {
        var _this = this;
        return list.reduce(function (acc, payload) {
            var key = _this.extractKeyByDiscriminator(discriminator, payload, delimiter);
            acc[key] = Array.isArray(acc[key]) ? acc[key].concat([payload]) : [payload];
            return acc;
        }, {});
    };
    GroupByPipe.prototype.extractKeyByDiscriminator = function (discriminator, payload, delimiter) {
        if (isFunction(discriminator)) {
            // tslint:disable-next-line: ban-types
            return discriminator(payload);
        }
        if (Array.isArray(discriminator)) {
            return discriminator.map(function (k) { return extractDeepPropertyByMapKey(payload, k); }).join(delimiter);
        }
        return extractDeepPropertyByMapKey(payload, discriminator);
    };
    GroupByPipe = __decorate([
        Pipe({ name: 'groupBy' })
    ], GroupByPipe);
    return GroupByPipe;
}());

// tslint:disable no-bitwise
var FilterByPipe = /** @class */ (function () {
    function FilterByPipe() {
    }
    FilterByPipe.prototype.transform = function (input, props, search, strict) {
        if (search === void 0) { search = ''; }
        if (strict === void 0) { strict = false; }
        if (!Array.isArray(input) ||
            (!Array.isArray(search) && !isString(search) && !isNumberFinite(search) && !isBoolean(search))) {
            return input;
        }
        var terms = String(search)
            .toLowerCase()
            .split(',');
        return input.filter(function (obj) {
            return props.some(function (prop) {
                return terms.some(function (term) {
                    var value = extractDeepPropertyByMapKey(obj, prop);
                    var _a = extractDeepPropertyByParentMapKey(obj, prop), props = _a.props, tail = _a.tail;
                    if (isUndefined(value) && !isUndefined(props) && Array.isArray(props)) {
                        return props.some(function (parent) {
                            var str = String(parent[tail]).toLowerCase();
                            return strict ? str === term : !!~str.indexOf(term);
                        });
                    }
                    if (isUndefined(value)) {
                        return false;
                    }
                    var strValue = String(value).toLowerCase();
                    return strict ? term === strValue : !!~strValue.indexOf(term);
                });
            });
        });
    };
    FilterByPipe = __decorate([
        Pipe({ name: 'filterBy' })
    ], FilterByPipe);
    return FilterByPipe;
}());

var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe_1 = OrderByPipe;
    OrderByPipe.simpleSort = function (a, b) {
        return isString(a) && isString(b) ? a.toLowerCase().localeCompare(b.toLowerCase()) : a - b;
    };
    OrderByPipe.orderCompare = function (prop, asc, a, b) {
        var first = extractDeepPropertyByMapKey(a, prop);
        var second = extractDeepPropertyByMapKey(b, prop);
        if (first === second) {
            return 0;
        }
        if (isUndefined(first) || first === '') {
            return 1;
        }
        if (isUndefined(second) || second === '') {
            return -1;
        }
        if (isString(first) && isString(second)) {
            var pos = first.toLowerCase().localeCompare(second.toLowerCase());
            return asc ? pos : -pos;
        }
        return asc ? first - second : second - first;
    };
    OrderByPipe.extractFromConfig = function (config) {
        var sign = config.substr(0, 1);
        var prop = config.replace(/^[-+]/, '');
        var asc = sign !== '-';
        return [prop, asc, sign];
    };
    OrderByPipe.prototype.transform = function (input, config) {
        if (!Array.isArray(input)) {
            return input;
        }
        var out = __spread(input);
        // sort by multiple properties
        if (Array.isArray(config)) {
            return out.sort(function (a, b) {
                var l = config.length;
                for (var i = 0; i < l; ++i) {
                    var _a = __read(OrderByPipe_1.extractFromConfig(config[i]), 2), prop = _a[0], asc = _a[1];
                    var pos = OrderByPipe_1.orderCompare(prop, asc, a, b);
                    if (pos !== 0) {
                        return pos;
                    }
                }
                return 0;
            });
        }
        // sort by a single property value
        if (isString(config)) {
            var _a = __read(OrderByPipe_1.extractFromConfig(config), 3), prop = _a[0], asc = _a[1], sign = _a[2];
            if (config.length === 1) {
                // tslint:disable-next-line:switch-default
                switch (sign) {
                    case '+':
                        return out.sort(OrderByPipe_1.simpleSort.bind(this));
                    case '-':
                        return out.sort(OrderByPipe_1.simpleSort.bind(this)).reverse();
                }
            }
            return out.sort(OrderByPipe_1.orderCompare.bind(this, prop, asc));
        }
        // default sort by value
        return out.sort(OrderByPipe_1.simpleSort.bind(this));
    };
    var OrderByPipe_1;
    OrderByPipe = OrderByPipe_1 = __decorate([
        Pipe({ name: 'orderBy' })
    ], OrderByPipe);
    return OrderByPipe;
}());

// tslint:disable use-pipe-transform-interface
var GroupByImpurePipe = /** @class */ (function (_super) {
    __extends(GroupByImpurePipe, _super);
    function GroupByImpurePipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupByImpurePipe = __decorate([
        Pipe({ name: 'groupByImpure', pure: false })
    ], GroupByImpurePipe);
    return GroupByImpurePipe;
}(GroupByPipe));

// tslint:disable use-pipe-transform-interface
var FilterByImpurePipe = /** @class */ (function (_super) {
    __extends(FilterByImpurePipe, _super);
    function FilterByImpurePipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterByImpurePipe = __decorate([
        Pipe({ name: 'filterByImpure', pure: false })
    ], FilterByImpurePipe);
    return FilterByImpurePipe;
}(FilterByPipe));

// tslint:disable use-pipe-transform-interface
var OrderByImpurePipe = /** @class */ (function (_super) {
    __extends(OrderByImpurePipe, _super);
    function OrderByImpurePipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderByImpurePipe = __decorate([
        Pipe({ name: 'orderByImpure', pure: false })
    ], OrderByImpurePipe);
    return OrderByImpurePipe;
}(OrderByPipe));

var RangePipe = /** @class */ (function () {
    function RangePipe() {
    }
    RangePipe.prototype.transform = function (start, count, step) {
        if (start === void 0) { start = 1; }
        if (count === void 0) { count = 0; }
        if (step === void 0) { step = 1; }
        return Array(count)
            .fill('')
            .map(function (v, i) { return step * i + start; });
    };
    RangePipe = __decorate([
        Pipe({ name: 'range' })
    ], RangePipe);
    return RangePipe;
}());

var ARRAY_PIPES = [
    DiffPipe,
    FlattenPipe,
    InitialPipe,
    IntersectionPipe,
    ReversePipe,
    TailPipe,
    TrurthifyPipe,
    UnionPipe,
    UniquePipe,
    WithoutPipe,
    PluckPipe,
    ShufflePipe,
    EveryPipe,
    SomePipe,
    SamplePipe,
    GroupByPipe,
    GroupByImpurePipe,
    FilterByPipe,
    FilterByImpurePipe,
    OrderByPipe,
    OrderByImpurePipe,
    RangePipe,
];
var NgArrayPipesModule = /** @class */ (function () {
    function NgArrayPipesModule() {
    }
    NgArrayPipesModule = __decorate([
        NgModule({
            declarations: ARRAY_PIPES,
            imports: [],
            exports: ARRAY_PIPES,
        })
    ], NgArrayPipesModule);
    return NgArrayPipesModule;
}());

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj);
    };
    KeysPipe = __decorate([
        Pipe({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());

var ValuesPipe = /** @class */ (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).map(function (k) { return obj[k]; });
    };
    ValuesPipe = __decorate([
        Pipe({ name: 'values' })
    ], ValuesPipe);
    return ValuesPipe;
}());

var PairsPipe = /** @class */ (function () {
    function PairsPipe() {
    }
    PairsPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).map(function (k) { return [k, obj[k]]; });
    };
    PairsPipe = __decorate([
        Pipe({ name: 'pairs' })
    ], PairsPipe);
    return PairsPipe;
}());

var PickPipe = /** @class */ (function () {
    function PickPipe() {
    }
    // tslint:disable-next-line: ban-types
    PickPipe.prototype.transform = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return args.reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[k] = obj[k], _a));
        }, {});
    };
    PickPipe = __decorate([
        Pipe({ name: 'pick' })
    ], PickPipe);
    return PickPipe;
}());

var OmitPipe = /** @class */ (function () {
    function OmitPipe() {
    }
    OmitPipe.prototype.transform = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return (Object.keys(obj)
            // tslint:disable-next-line:no-bitwise
            .filter(function (k) { return !~args.indexOf(k); })
            .reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[k] = obj[k], _a));
        }, {}));
    };
    OmitPipe = __decorate([
        Pipe({ name: 'omit' })
    ], OmitPipe);
    return OmitPipe;
}());

var InvertPipe = /** @class */ (function () {
    function InvertPipe() {
    }
    // tslint:disable-next-line: ban-types
    InvertPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[obj[k]] = k, _a));
        }, {});
    };
    InvertPipe = __decorate([
        Pipe({ name: 'invert' })
    ], InvertPipe);
    return InvertPipe;
}());

var InvertByPipe = /** @class */ (function () {
    function InvertByPipe() {
    }
    // tslint:disable-next-line: ban-types
    InvertByPipe.prototype.transform = function (obj, cb) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).reduce(function (o, k) {
            var _a;
            var key = cb ? cb(obj[k]) : obj[k];
            return Array.isArray(o[key]) ? (o[key].push(k), o) : Object.assign(o, (_a = {}, _a[key] = [k], _a));
        }, {});
    };
    InvertByPipe = __decorate([
        Pipe({ name: 'invertBy' })
    ], InvertByPipe);
    return InvertByPipe;
}());

var DiffObjPipe = /** @class */ (function () {
    function DiffObjPipe() {
    }
    DiffObjPipe.prototype.transform = function (obj, original) {
        if (original === void 0) { original = {}; }
        if (Array.isArray(obj) || Array.isArray(original) || !isObject(obj) || !isObject(original)) {
            return {};
        }
        return getKeysTwoObjects(obj, original).reduce(function (diff, key) {
            if (!isDeepEqual(original[key], obj[key])) {
                diff[key] = obj[key];
            }
            return diff;
        }, {});
    };
    DiffObjPipe = __decorate([
        Pipe({ name: 'diffObj' })
    ], DiffObjPipe);
    return DiffObjPipe;
}());

var OBJECT_PIPES = [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe];
var NgObjectPipesModule = /** @class */ (function () {
    function NgObjectPipesModule() {
    }
    NgObjectPipesModule = __decorate([
        NgModule({
            declarations: OBJECT_PIPES,
            imports: [],
            exports: OBJECT_PIPES,
        })
    ], NgObjectPipesModule);
    return NgObjectPipesModule;
}());

var AorAnPipe = /** @class */ (function () {
    function AorAnPipe() {
        this.irregularMap = {
            herb: 'an',
            honor: 'an',
            honorable: 'an',
            hour: 'an',
            mba: 'an',
            msc: 'an',
            'm.sc.': 'an',
            unicorn: 'a',
        };
    }
    AorAnPipe.prototype.transform = function (stringEntity) {
        if (!stringEntity || stringEntity === '') {
            return '';
        }
        else {
            var firstWord = stringEntity.trim().split(' ')[0];
            if (this.irregularMap[firstWord.toLocaleLowerCase()]) {
                return this.irregularMap[firstWord.toLocaleLowerCase()] + " " + stringEntity;
            }
            else {
                return isVowel(stringEntity[0]) ? "an " + stringEntity : "a " + stringEntity;
            }
        }
    };
    AorAnPipe = __decorate([
        Pipe({
            name: 'a-or-an',
        })
        /**
         * Takes a string and returns the string prepended by 'a' or 'an'.
         * Uses both naive and holdout-list approaches.
         * @constructor
         * @param {string} stringEntity - Entity to prepend 'a' or 'an' to.
         */
    ], AorAnPipe);
    return AorAnPipe;
}());

var UcWordsPipe = /** @class */ (function () {
    function UcWordsPipe() {
    }
    UcWordsPipe.prototype.transform = function (text) {
        if (isString(text)) {
            return text
                .split(' ')
                .map(function (sub) { return sub.slice(0, 1).toUpperCase() + sub.slice(1); })
                .join(' ');
        }
        return text;
    };
    UcWordsPipe = __decorate([
        Pipe({ name: 'ucwords' })
    ], UcWordsPipe);
    return UcWordsPipe;
}());

var LeftTrimPipe = /** @class */ (function () {
    function LeftTrimPipe() {
    }
    LeftTrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("^[" + chars + "]+"), '') : text;
    };
    LeftTrimPipe = __decorate([
        Pipe({ name: 'ltrim' })
    ], LeftTrimPipe);
    return LeftTrimPipe;
}());

var RepeatPipe = /** @class */ (function () {
    function RepeatPipe() {
    }
    RepeatPipe.prototype.transform = function (str, n, separator) {
        if (n === void 0) { n = 1; }
        if (separator === void 0) { separator = ''; }
        if (n <= 0) {
            throw new RangeError();
        }
        return n === 1 ? str : this.repeat(str, n - 1, separator);
    };
    RepeatPipe.prototype.repeat = function (str, n, separator) {
        return isString(str) ? (n === 0 ? str : str + separator + this.repeat(str, n - 1, separator)) : str;
    };
    RepeatPipe = __decorate([
        Pipe({ name: 'repeat' })
    ], RepeatPipe);
    return RepeatPipe;
}());

var RightTrimPipe = /** @class */ (function () {
    function RightTrimPipe() {
    }
    RightTrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("[" + chars + "]+$"), '') : text;
    };
    RightTrimPipe = __decorate([
        Pipe({ name: 'rtrim' })
    ], RightTrimPipe);
    return RightTrimPipe;
}());

var ScanPipe = /** @class */ (function () {
    function ScanPipe() {
    }
    ScanPipe.prototype.transform = function (text, args) {
        if (args === void 0) { args = []; }
        return isString(text)
            ? text.replace(/\{(\d+)}/g, function (match, index) { return (!isUndefined(args[index]) ? args[index] : match); })
            : text;
    };
    ScanPipe = __decorate([
        Pipe({ name: 'scan' })
    ], ScanPipe);
    return ScanPipe;
}());

var ShortenPipe = /** @class */ (function () {
    function ShortenPipe() {
    }
    ShortenPipe.prototype.transform = function (text, length, suffix, wordBreak) {
        if (length === void 0) { length = 0; }
        if (suffix === void 0) { suffix = ''; }
        if (wordBreak === void 0) { wordBreak = true; }
        if (!isString(text)) {
            return text;
        }
        if (text.length > length) {
            if (wordBreak) {
                return text.slice(0, length) + suffix;
            }
            // tslint:disable-next-line:no-bitwise
            if (!!~text.indexOf(' ', length)) {
                return text.slice(0, text.indexOf(' ', length)) + suffix;
            }
        }
        return text;
    };
    ShortenPipe = __decorate([
        Pipe({ name: 'shorten' })
    ], ShortenPipe);
    return ShortenPipe;
}());

var StripTagsPipe = /** @class */ (function () {
    function StripTagsPipe() {
    }
    StripTagsPipe.prototype.transform = function (text) {
        var allowedTags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            allowedTags[_i - 1] = arguments[_i];
        }
        return allowedTags.length > 0
            ? text.replace(new RegExp("<(?!/?(" + allowedTags.join('|') + ")s*/?)[^>]+>", 'g'), '')
            : text.replace(/<(?:.|\s)*?>/g, '');
    };
    StripTagsPipe = __decorate([
        Pipe({ name: 'stripTags' })
    ], StripTagsPipe);
    return StripTagsPipe;
}());

var TrimPipe = /** @class */ (function () {
    function TrimPipe() {
    }
    TrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("^[" + chars + "]+|[" + chars + "]+$", 'g'), '') : text;
    };
    TrimPipe = __decorate([
        Pipe({ name: 'trim' })
    ], TrimPipe);
    return TrimPipe;
}());

var UcFirstPipe = /** @class */ (function () {
    function UcFirstPipe() {
    }
    UcFirstPipe.prototype.transform = function (text) {
        return isString(text) ? text.slice(0, 1).toUpperCase() + text.slice(1) : text;
    };
    UcFirstPipe = __decorate([
        Pipe({ name: 'ucfirst' })
    ], UcFirstPipe);
    return UcFirstPipe;
}());

var SlugifyPipe = /** @class */ (function () {
    function SlugifyPipe() {
    }
    SlugifyPipe.prototype.transform = function (str) {
        return isString(str)
            ? str
                .toLowerCase()
                .trim()
                .replace(/[^\w\-]+/g, ' ')
                .replace(/\s+/g, '-')
            : str;
    };
    SlugifyPipe = __decorate([
        Pipe({ name: 'slugify' })
    ], SlugifyPipe);
    return SlugifyPipe;
}());

var CamelizePipe = /** @class */ (function () {
    function CamelizePipe() {
    }
    CamelizePipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        if (!isString(text)) {
            return text;
        }
        return text
            .toLowerCase()
            .split(/[-_\s]/g)
            .filter(function (v) { return !!v; })
            .map(function (word, key) {
            return !key ? word : word.slice(0, 1).toUpperCase() + word.slice(1);
        })
            .join('');
    };
    CamelizePipe = __decorate([
        Pipe({ name: 'camelize' })
    ], CamelizePipe);
    return CamelizePipe;
}());

var LatinisePipe = /** @class */ (function () {
    function LatinisePipe() {
        // Source: http://semplicewebsites.com/removing-accents-javascript
        // tslint:disable-next-line whitespace max-line-length object-literal-key-quotes
        this.latinMap = {
            Á: 'A',
            Ă: 'A',
            Ắ: 'A',
            Ặ: 'A',
            Ằ: 'A',
            Ẳ: 'A',
            Ẵ: 'A',
            Ǎ: 'A',
            Â: 'A',
            Ấ: 'A',
            Ậ: 'A',
            Ầ: 'A',
            Ẩ: 'A',
            Ẫ: 'A',
            Ä: 'A',
            Ǟ: 'A',
            Ȧ: 'A',
            Ǡ: 'A',
            Ạ: 'A',
            Ȁ: 'A',
            À: 'A',
            Ả: 'A',
            Ȃ: 'A',
            Ā: 'A',
            Ą: 'A',
            Å: 'A',
            Ǻ: 'A',
            Ḁ: 'A',
            Ⱥ: 'A',
            Ã: 'A',
            Ꜳ: 'AA',
            Æ: 'AE',
            Ǽ: 'AE',
            Ǣ: 'AE',
            Ꜵ: 'AO',
            Ꜷ: 'AU',
            Ꜹ: 'AV',
            Ꜻ: 'AV',
            Ꜽ: 'AY',
            Ḃ: 'B',
            Ḅ: 'B',
            Ɓ: 'B',
            Ḇ: 'B',
            Ƀ: 'B',
            Ƃ: 'B',
            Ć: 'C',
            Č: 'C',
            Ç: 'C',
            Ḉ: 'C',
            Ĉ: 'C',
            Ċ: 'C',
            Ƈ: 'C',
            Ȼ: 'C',
            Ď: 'D',
            Ḑ: 'D',
            Ḓ: 'D',
            Ḋ: 'D',
            Ḍ: 'D',
            Ɗ: 'D',
            Ḏ: 'D',
            ǲ: 'D',
            ǅ: 'D',
            Đ: 'D',
            Ƌ: 'D',
            Ǳ: 'DZ',
            Ǆ: 'DZ',
            É: 'E',
            Ĕ: 'E',
            Ě: 'E',
            Ȩ: 'E',
            Ḝ: 'E',
            Ê: 'E',
            Ế: 'E',
            Ệ: 'E',
            Ề: 'E',
            Ể: 'E',
            Ễ: 'E',
            Ḙ: 'E',
            Ë: 'E',
            Ė: 'E',
            Ẹ: 'E',
            Ȅ: 'E',
            È: 'E',
            Ẻ: 'E',
            Ȇ: 'E',
            Ē: 'E',
            Ḗ: 'E',
            Ḕ: 'E',
            Ę: 'E',
            Ɇ: 'E',
            Ẽ: 'E',
            Ḛ: 'E',
            Ꝫ: 'ET',
            Ḟ: 'F',
            Ƒ: 'F',
            Ǵ: 'G',
            Ğ: 'G',
            Ǧ: 'G',
            Ģ: 'G',
            Ĝ: 'G',
            Ġ: 'G',
            Ɠ: 'G',
            Ḡ: 'G',
            Ǥ: 'G',
            Ḫ: 'H',
            Ȟ: 'H',
            Ḩ: 'H',
            Ĥ: 'H',
            Ⱨ: 'H',
            Ḧ: 'H',
            Ḣ: 'H',
            Ḥ: 'H',
            Ħ: 'H',
            Í: 'I',
            Ĭ: 'I',
            Ǐ: 'I',
            Î: 'I',
            Ï: 'I',
            Ḯ: 'I',
            İ: 'I',
            Ị: 'I',
            Ȉ: 'I',
            Ì: 'I',
            Ỉ: 'I',
            Ȋ: 'I',
            Ī: 'I',
            Į: 'I',
            Ɨ: 'I',
            Ĩ: 'I',
            Ḭ: 'I',
            Ꝺ: 'D',
            Ꝼ: 'F',
            Ᵹ: 'G',
            Ꞃ: 'R',
            Ꞅ: 'S',
            Ꞇ: 'T',
            Ꝭ: 'IS',
            Ĵ: 'J',
            Ɉ: 'J',
            Ḱ: 'K',
            Ǩ: 'K',
            Ķ: 'K',
            Ⱪ: 'K',
            Ꝃ: 'K',
            Ḳ: 'K',
            Ƙ: 'K',
            Ḵ: 'K',
            Ꝁ: 'K',
            Ꝅ: 'K',
            Ĺ: 'L',
            Ƚ: 'L',
            Ľ: 'L',
            Ļ: 'L',
            Ḽ: 'L',
            Ḷ: 'L',
            Ḹ: 'L',
            Ⱡ: 'L',
            Ꝉ: 'L',
            Ḻ: 'L',
            Ŀ: 'L',
            Ɫ: 'L',
            ǈ: 'L',
            Ł: 'L',
            Ǉ: 'LJ',
            Ḿ: 'M',
            Ṁ: 'M',
            Ṃ: 'M',
            Ɱ: 'M',
            Ń: 'N',
            Ň: 'N',
            Ņ: 'N',
            Ṋ: 'N',
            Ṅ: 'N',
            Ṇ: 'N',
            Ǹ: 'N',
            Ɲ: 'N',
            Ṉ: 'N',
            Ƞ: 'N',
            ǋ: 'N',
            Ñ: 'N',
            Ǌ: 'NJ',
            Ó: 'O',
            Ŏ: 'O',
            Ǒ: 'O',
            Ô: 'O',
            Ố: 'O',
            Ộ: 'O',
            Ồ: 'O',
            Ổ: 'O',
            Ỗ: 'O',
            Ö: 'O',
            Ȫ: 'O',
            Ȯ: 'O',
            Ȱ: 'O',
            Ọ: 'O',
            Ő: 'O',
            Ȍ: 'O',
            Ò: 'O',
            Ỏ: 'O',
            Ơ: 'O',
            Ớ: 'O',
            Ợ: 'O',
            Ờ: 'O',
            Ở: 'O',
            Ỡ: 'O',
            Ȏ: 'O',
            Ꝋ: 'O',
            Ꝍ: 'O',
            Ō: 'O',
            Ṓ: 'O',
            Ṑ: 'O',
            Ɵ: 'O',
            Ǫ: 'O',
            Ǭ: 'O',
            Ø: 'O',
            Ǿ: 'O',
            Õ: 'O',
            Ṍ: 'O',
            Ṏ: 'O',
            Ȭ: 'O',
            Ƣ: 'OI',
            Ꝏ: 'OO',
            Ɛ: 'E',
            Ɔ: 'O',
            Ȣ: 'OU',
            Ṕ: 'P',
            Ṗ: 'P',
            Ꝓ: 'P',
            Ƥ: 'P',
            Ꝕ: 'P',
            Ᵽ: 'P',
            Ꝑ: 'P',
            Ꝙ: 'Q',
            Ꝗ: 'Q',
            Ŕ: 'R',
            Ř: 'R',
            Ŗ: 'R',
            Ṙ: 'R',
            Ṛ: 'R',
            Ṝ: 'R',
            Ȑ: 'R',
            Ȓ: 'R',
            Ṟ: 'R',
            Ɍ: 'R',
            Ɽ: 'R',
            Ꜿ: 'C',
            Ǝ: 'E',
            Ś: 'S',
            Ṥ: 'S',
            Š: 'S',
            Ṧ: 'S',
            Ş: 'S',
            Ŝ: 'S',
            Ș: 'S',
            Ṡ: 'S',
            Ṣ: 'S',
            Ṩ: 'S',
            ẞ: 'SS',
            Ť: 'T',
            Ţ: 'T',
            Ṱ: 'T',
            Ț: 'T',
            Ⱦ: 'T',
            Ṫ: 'T',
            Ṭ: 'T',
            Ƭ: 'T',
            Ṯ: 'T',
            Ʈ: 'T',
            Ŧ: 'T',
            Ɐ: 'A',
            Ꞁ: 'L',
            Ɯ: 'M',
            Ʌ: 'V',
            Ꜩ: 'TZ',
            Ú: 'U',
            Ŭ: 'U',
            Ǔ: 'U',
            Û: 'U',
            Ṷ: 'U',
            Ü: 'U',
            Ǘ: 'U',
            Ǚ: 'U',
            Ǜ: 'U',
            Ǖ: 'U',
            Ṳ: 'U',
            Ụ: 'U',
            Ű: 'U',
            Ȕ: 'U',
            Ù: 'U',
            Ủ: 'U',
            Ư: 'U',
            Ứ: 'U',
            Ự: 'U',
            Ừ: 'U',
            Ử: 'U',
            Ữ: 'U',
            Ȗ: 'U',
            Ū: 'U',
            Ṻ: 'U',
            Ų: 'U',
            Ů: 'U',
            Ũ: 'U',
            Ṹ: 'U',
            Ṵ: 'U',
            Ꝟ: 'V',
            Ṿ: 'V',
            Ʋ: 'V',
            Ṽ: 'V',
            Ꝡ: 'VY',
            Ẃ: 'W',
            Ŵ: 'W',
            Ẅ: 'W',
            Ẇ: 'W',
            Ẉ: 'W',
            Ẁ: 'W',
            Ⱳ: 'W',
            Ẍ: 'X',
            Ẋ: 'X',
            Ý: 'Y',
            Ŷ: 'Y',
            Ÿ: 'Y',
            Ẏ: 'Y',
            Ỵ: 'Y',
            Ỳ: 'Y',
            Ƴ: 'Y',
            Ỷ: 'Y',
            Ỿ: 'Y',
            Ȳ: 'Y',
            Ɏ: 'Y',
            Ỹ: 'Y',
            Ź: 'Z',
            Ž: 'Z',
            Ẑ: 'Z',
            Ⱬ: 'Z',
            Ż: 'Z',
            Ẓ: 'Z',
            Ȥ: 'Z',
            Ẕ: 'Z',
            Ƶ: 'Z',
            Ĳ: 'IJ',
            Œ: 'OE',
            ᴀ: 'A',
            ᴁ: 'AE',
            ʙ: 'B',
            ᴃ: 'B',
            ᴄ: 'C',
            ᴅ: 'D',
            ᴇ: 'E',
            ꜰ: 'F',
            ɢ: 'G',
            ʛ: 'G',
            ʜ: 'H',
            ɪ: 'I',
            ʁ: 'R',
            ᴊ: 'J',
            ᴋ: 'K',
            ʟ: 'L',
            ᴌ: 'L',
            ᴍ: 'M',
            ɴ: 'N',
            ᴏ: 'O',
            ɶ: 'OE',
            ᴐ: 'O',
            ᴕ: 'OU',
            ᴘ: 'P',
            ʀ: 'R',
            ᴎ: 'N',
            ᴙ: 'R',
            ꜱ: 'S',
            ᴛ: 'T',
            ⱻ: 'E',
            ᴚ: 'R',
            ᴜ: 'U',
            ᴠ: 'V',
            ᴡ: 'W',
            ʏ: 'Y',
            ᴢ: 'Z',
            á: 'a',
            ă: 'a',
            ắ: 'a',
            ặ: 'a',
            ằ: 'a',
            ẳ: 'a',
            ẵ: 'a',
            ǎ: 'a',
            â: 'a',
            ấ: 'a',
            ậ: 'a',
            ầ: 'a',
            ẩ: 'a',
            ẫ: 'a',
            ä: 'a',
            ǟ: 'a',
            ȧ: 'a',
            ǡ: 'a',
            ạ: 'a',
            ȁ: 'a',
            à: 'a',
            ả: 'a',
            ȃ: 'a',
            ā: 'a',
            ą: 'a',
            ᶏ: 'a',
            ẚ: 'a',
            å: 'a',
            ǻ: 'a',
            ḁ: 'a',
            ⱥ: 'a',
            ã: 'a',
            ꜳ: 'aa',
            æ: 'ae',
            ǽ: 'ae',
            ǣ: 'ae',
            ꜵ: 'ao',
            ꜷ: 'au',
            ꜹ: 'av',
            ꜻ: 'av',
            ꜽ: 'ay',
            ḃ: 'b',
            ḅ: 'b',
            ɓ: 'b',
            ḇ: 'b',
            ᵬ: 'b',
            ᶀ: 'b',
            ƀ: 'b',
            ƃ: 'b',
            ɵ: 'o',
            ć: 'c',
            č: 'c',
            ç: 'c',
            ḉ: 'c',
            ĉ: 'c',
            ɕ: 'c',
            ċ: 'c',
            ƈ: 'c',
            ȼ: 'c',
            ď: 'd',
            ḑ: 'd',
            ḓ: 'd',
            ȡ: 'd',
            ḋ: 'd',
            ḍ: 'd',
            ɗ: 'd',
            ᶑ: 'd',
            ḏ: 'd',
            ᵭ: 'd',
            ᶁ: 'd',
            đ: 'd',
            ɖ: 'd',
            ƌ: 'd',
            ı: 'i',
            ȷ: 'j',
            ɟ: 'j',
            ʄ: 'j',
            ǳ: 'dz',
            ǆ: 'dz',
            é: 'e',
            ĕ: 'e',
            ě: 'e',
            ȩ: 'e',
            ḝ: 'e',
            ê: 'e',
            ế: 'e',
            ệ: 'e',
            ề: 'e',
            ể: 'e',
            ễ: 'e',
            ḙ: 'e',
            ë: 'e',
            ė: 'e',
            ẹ: 'e',
            ȅ: 'e',
            è: 'e',
            ẻ: 'e',
            ȇ: 'e',
            ē: 'e',
            ḗ: 'e',
            ḕ: 'e',
            ⱸ: 'e',
            ę: 'e',
            ᶒ: 'e',
            ɇ: 'e',
            ẽ: 'e',
            ḛ: 'e',
            ꝫ: 'et',
            ḟ: 'f',
            ƒ: 'f',
            ᵮ: 'f',
            ᶂ: 'f',
            ǵ: 'g',
            ğ: 'g',
            ǧ: 'g',
            ģ: 'g',
            ĝ: 'g',
            ġ: 'g',
            ɠ: 'g',
            ḡ: 'g',
            ᶃ: 'g',
            ǥ: 'g',
            ḫ: 'h',
            ȟ: 'h',
            ḩ: 'h',
            ĥ: 'h',
            ⱨ: 'h',
            ḧ: 'h',
            ḣ: 'h',
            ḥ: 'h',
            ɦ: 'h',
            ẖ: 'h',
            ħ: 'h',
            ƕ: 'hv',
            í: 'i',
            ĭ: 'i',
            ǐ: 'i',
            î: 'i',
            ï: 'i',
            ḯ: 'i',
            ị: 'i',
            ȉ: 'i',
            ì: 'i',
            ỉ: 'i',
            ȋ: 'i',
            ī: 'i',
            į: 'i',
            ᶖ: 'i',
            ɨ: 'i',
            ĩ: 'i',
            ḭ: 'i',
            ꝺ: 'd',
            ꝼ: 'f',
            ᵹ: 'g',
            ꞃ: 'r',
            ꞅ: 's',
            ꞇ: 't',
            ꝭ: 'is',
            ǰ: 'j',
            ĵ: 'j',
            ʝ: 'j',
            ɉ: 'j',
            ḱ: 'k',
            ǩ: 'k',
            ķ: 'k',
            ⱪ: 'k',
            ꝃ: 'k',
            ḳ: 'k',
            ƙ: 'k',
            ḵ: 'k',
            ᶄ: 'k',
            ꝁ: 'k',
            ꝅ: 'k',
            ĺ: 'l',
            ƚ: 'l',
            ɬ: 'l',
            ľ: 'l',
            ļ: 'l',
            ḽ: 'l',
            ȴ: 'l',
            ḷ: 'l',
            ḹ: 'l',
            ⱡ: 'l',
            ꝉ: 'l',
            ḻ: 'l',
            ŀ: 'l',
            ɫ: 'l',
            ᶅ: 'l',
            ɭ: 'l',
            ł: 'l',
            ǉ: 'lj',
            ſ: 's',
            ẜ: 's',
            ẛ: 's',
            ẝ: 's',
            ḿ: 'm',
            ṁ: 'm',
            ṃ: 'm',
            ɱ: 'm',
            ᵯ: 'm',
            ᶆ: 'm',
            ń: 'n',
            ň: 'n',
            ņ: 'n',
            ṋ: 'n',
            ȵ: 'n',
            ṅ: 'n',
            ṇ: 'n',
            ǹ: 'n',
            ɲ: 'n',
            ṉ: 'n',
            ƞ: 'n',
            ᵰ: 'n',
            ᶇ: 'n',
            ɳ: 'n',
            ñ: 'n',
            ǌ: 'nj',
            ó: 'o',
            ŏ: 'o',
            ǒ: 'o',
            ô: 'o',
            ố: 'o',
            ộ: 'o',
            ồ: 'o',
            ổ: 'o',
            ỗ: 'o',
            ö: 'o',
            ȫ: 'o',
            ȯ: 'o',
            ȱ: 'o',
            ọ: 'o',
            ő: 'o',
            ȍ: 'o',
            ò: 'o',
            ỏ: 'o',
            ơ: 'o',
            ớ: 'o',
            ợ: 'o',
            ờ: 'o',
            ở: 'o',
            ỡ: 'o',
            ȏ: 'o',
            ꝋ: 'o',
            ꝍ: 'o',
            ⱺ: 'o',
            ō: 'o',
            ṓ: 'o',
            ṑ: 'o',
            ǫ: 'o',
            ǭ: 'o',
            ø: 'o',
            ǿ: 'o',
            õ: 'o',
            ṍ: 'o',
            ṏ: 'o',
            ȭ: 'o',
            ƣ: 'oi',
            ꝏ: 'oo',
            ɛ: 'e',
            ᶓ: 'e',
            ɔ: 'o',
            ᶗ: 'o',
            ȣ: 'ou',
            ṕ: 'p',
            ṗ: 'p',
            ꝓ: 'p',
            ƥ: 'p',
            ᵱ: 'p',
            ᶈ: 'p',
            ꝕ: 'p',
            ᵽ: 'p',
            ꝑ: 'p',
            ꝙ: 'q',
            ʠ: 'q',
            ɋ: 'q',
            ꝗ: 'q',
            ŕ: 'r',
            ř: 'r',
            ŗ: 'r',
            ṙ: 'r',
            ṛ: 'r',
            ṝ: 'r',
            ȑ: 'r',
            ɾ: 'r',
            ᵳ: 'r',
            ȓ: 'r',
            ṟ: 'r',
            ɼ: 'r',
            ᵲ: 'r',
            ᶉ: 'r',
            ɍ: 'r',
            ɽ: 'r',
            ↄ: 'c',
            ꜿ: 'c',
            ɘ: 'e',
            ɿ: 'r',
            ś: 's',
            ṥ: 's',
            š: 's',
            ṧ: 's',
            ş: 's',
            ŝ: 's',
            ș: 's',
            ṡ: 's',
            ṣ: 's',
            ṩ: 's',
            ʂ: 's',
            ᵴ: 's',
            ᶊ: 's',
            ȿ: 's',
            ɡ: 'g',
            ß: 'ss',
            ᴑ: 'o',
            ᴓ: 'o',
            ᴝ: 'u',
            ť: 't',
            ţ: 't',
            ṱ: 't',
            ț: 't',
            ȶ: 't',
            ẗ: 't',
            ⱦ: 't',
            ṫ: 't',
            ṭ: 't',
            ƭ: 't',
            ṯ: 't',
            ᵵ: 't',
            ƫ: 't',
            ʈ: 't',
            ŧ: 't',
            ᵺ: 'th',
            ɐ: 'a',
            ᴂ: 'ae',
            ǝ: 'e',
            ᵷ: 'g',
            ɥ: 'h',
            ʮ: 'h',
            ʯ: 'h',
            ᴉ: 'i',
            ʞ: 'k',
            ꞁ: 'l',
            ɯ: 'm',
            ɰ: 'm',
            ᴔ: 'oe',
            ɹ: 'r',
            ɻ: 'r',
            ɺ: 'r',
            ⱹ: 'r',
            ʇ: 't',
            ʌ: 'v',
            ʍ: 'w',
            ʎ: 'y',
            ꜩ: 'tz',
            ú: 'u',
            ŭ: 'u',
            ǔ: 'u',
            û: 'u',
            ṷ: 'u',
            ü: 'u',
            ǘ: 'u',
            ǚ: 'u',
            ǜ: 'u',
            ǖ: 'u',
            ṳ: 'u',
            ụ: 'u',
            ű: 'u',
            ȕ: 'u',
            ù: 'u',
            ủ: 'u',
            ư: 'u',
            ứ: 'u',
            ự: 'u',
            ừ: 'u',
            ử: 'u',
            ữ: 'u',
            ȗ: 'u',
            ū: 'u',
            ṻ: 'u',
            ų: 'u',
            ᶙ: 'u',
            ů: 'u',
            ũ: 'u',
            ṹ: 'u',
            ṵ: 'u',
            ᵫ: 'ue',
            ꝸ: 'um',
            ⱴ: 'v',
            ꝟ: 'v',
            ṿ: 'v',
            ʋ: 'v',
            ᶌ: 'v',
            ⱱ: 'v',
            ṽ: 'v',
            ꝡ: 'vy',
            ẃ: 'w',
            ŵ: 'w',
            ẅ: 'w',
            ẇ: 'w',
            ẉ: 'w',
            ẁ: 'w',
            ⱳ: 'w',
            ẘ: 'w',
            ẍ: 'x',
            ẋ: 'x',
            ᶍ: 'x',
            ý: 'y',
            ŷ: 'y',
            ÿ: 'y',
            ẏ: 'y',
            ỵ: 'y',
            ỳ: 'y',
            ƴ: 'y',
            ỷ: 'y',
            ỿ: 'y',
            ȳ: 'y',
            ẙ: 'y',
            ɏ: 'y',
            ỹ: 'y',
            ź: 'z',
            ž: 'z',
            ẑ: 'z',
            ʑ: 'z',
            ⱬ: 'z',
            ż: 'z',
            ẓ: 'z',
            ȥ: 'z',
            ẕ: 'z',
            ᵶ: 'z',
            ᶎ: 'z',
            ʐ: 'z',
            ƶ: 'z',
            ɀ: 'z',
            ﬀ: 'ff',
            ﬃ: 'ffi',
            ﬄ: 'ffl',
            ﬁ: 'fi',
            ﬂ: 'fl',
            ĳ: 'ij',
            œ: 'oe',
            ﬆ: 'st',
            ₐ: 'a',
            ₑ: 'e',
            ᵢ: 'i',
            ⱼ: 'j',
            ₒ: 'o',
            ᵣ: 'r',
            ᵤ: 'u',
            ᵥ: 'v',
            ₓ: 'x',
        };
    }
    LatinisePipe.prototype.transform = function (text, chars) {
        var _this = this;
        if (chars === void 0) { chars = '\\s'; }
        return isString(text)
            ? text.replace(/[^A-Za-z0-9]/g, function (key) {
                return _this.latinMap[key] || key;
            })
            : text;
    };
    LatinisePipe = __decorate([
        Pipe({ name: 'latinise' })
    ], LatinisePipe);
    return LatinisePipe;
}());

var LinesPipe = /** @class */ (function () {
    function LinesPipe() {
    }
    LinesPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(/\r\n/g, '\n').split('\n') : text;
    };
    LinesPipe = __decorate([
        Pipe({ name: 'lines' })
    ], LinesPipe);
    return LinesPipe;
}());

var UnderscorePipe = /** @class */ (function () {
    function UnderscorePipe() {
    }
    UnderscorePipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text)
            ? text
                .trim()
                .replace(/\s+/g, '')
                .replace(/[A-Z]/g, function (c, k) {
                return k ? "_" + c.toLowerCase() : c.toLowerCase();
            })
            : text;
    };
    UnderscorePipe = __decorate([
        Pipe({ name: 'underscore' })
    ], UnderscorePipe);
    return UnderscorePipe;
}());

var MatchPipe = /** @class */ (function () {
    function MatchPipe() {
    }
    MatchPipe.prototype.transform = function (text, pattern, flags) {
        if (!isString(text)) {
            return text;
        }
        return text.match(new RegExp(pattern, flags));
    };
    MatchPipe = __decorate([
        Pipe({ name: 'match' })
    ], MatchPipe);
    return MatchPipe;
}());

var TestPipe = /** @class */ (function () {
    function TestPipe() {
    }
    TestPipe.prototype.transform = function (text, pattern, flags) {
        if (!isString(text)) {
            return text;
        }
        return new RegExp(pattern, flags).test(text);
    };
    TestPipe = __decorate([
        Pipe({ name: 'test' })
    ], TestPipe);
    return TestPipe;
}());

var LeftPadPipe = /** @class */ (function () {
    function LeftPadPipe() {
    }
    LeftPadPipe.prototype.transform = function (str, length, padCharacter) {
        if (padCharacter === void 0) { padCharacter = ' '; }
        if (!isString(str) || str.length >= length) {
            return str;
        }
        while (str.length < length) {
            str = padCharacter + str;
        }
        return str;
    };
    LeftPadPipe = __decorate([
        Pipe({ name: 'lpad' })
    ], LeftPadPipe);
    return LeftPadPipe;
}());

var RightPadPipe = /** @class */ (function () {
    function RightPadPipe() {
    }
    RightPadPipe.prototype.transform = function (str, length, padCharacter) {
        if (length === void 0) { length = 1; }
        if (padCharacter === void 0) { padCharacter = ' '; }
        if (!isString(str) || str.length >= length) {
            return str;
        }
        while (str.length < length) {
            str = str + padCharacter;
        }
        return str;
    };
    RightPadPipe = __decorate([
        Pipe({ name: 'rpad' })
    ], RightPadPipe);
    return RightPadPipe;
}());

var MakePluralStringPipe = /** @class */ (function () {
    function MakePluralStringPipe() {
        this.irregularMap = {
            addendum: 'addenda',
            alga: 'algae',
            alumna: 'alumnae',
            alumnus: 'alumni',
            analysis: 'analyses',
            antenna: 'antennae',
            appendix: 'appendices',
            aquarium: 'aquaria',
            arch: 'arches',
            axe: 'axes',
            axis: 'axes',
            bacillus: 'bacilli',
            bacterium: 'bacteria',
            basis: 'bases',
            batch: 'batches',
            beach: 'beaches',
            beau: 'beaux',
            bison: 'bison',
            brush: 'brushes',
            buffalo: 'buffaloes',
            bureau: 'bureaus',
            bus: 'busses',
            cactus: 'cacti',
            calf: 'calves',
            chateau: 'chateaux',
            cherry: 'cherries',
            child: 'children',
            church: 'churches',
            circus: 'circuses',
            cod: 'cod',
            corps: 'corps',
            corpus: 'corpora',
            crisis: 'crises',
            criterion: 'criteria',
            curriculum: 'curricula',
            datum: 'data',
            deer: 'deer',
            diagnosis: 'diagnoses',
            die: 'dice',
            domino: 'dominoes',
            dwarf: 'dwarves',
            echo: 'echoes',
            elf: 'elves',
            ellipsis: 'ellipses',
            embargo: 'embargoes',
            emphasis: 'emphases',
            erratum: 'errata',
            fax: 'faxes',
            fireman: 'firemen',
            fish: 'fish',
            flush: 'flushes',
            focus: 'foci',
            foot: 'feet',
            formula: 'formulas',
            fungus: 'fungi',
            genus: 'genera',
            goose: 'geese',
            grafito: 'grafiti',
            half: 'halves',
            hero: 'heroes',
            hoax: 'hoaxes',
            hoof: 'hooves',
            hypothesis: 'hypotheses',
            index: 'indices',
            kiss: 'kisses',
            knife: 'knives',
            leaf: 'leaves',
            life: 'lives',
            loaf: 'loaves',
            louse: 'lice',
            man: 'men',
            mango: 'mangoes',
            matrix: 'matrices',
            means: 'means',
            medium: 'media',
            memorandum: 'memoranda',
            millennium: 'milennia',
            moose: 'moose',
            mosquito: 'mosquitoes',
            motto: 'mottoes',
            mouse: 'mice',
            nebula: 'nebulae',
            neurosis: 'neuroses',
            nucleus: 'nuclei',
            oasis: 'oases',
            octopus: 'octopodes',
            ovum: 'ova',
            ox: 'oxen',
            paralysis: 'paralyses',
            parenthesis: 'parentheses',
            person: 'people',
            phenomenon: 'phenomena',
            plateau: 'plateaux',
            potato: 'potatoes',
            quiz: 'quizzes',
            radius: 'radii',
            reflex: 'reflexes',
            'runner-up': 'runners-up',
            scampo: 'scampi',
            scarf: 'scarves',
            scissors: 'scissors',
            scratch: 'scratches',
            self: 'selves',
            series: 'series',
            sheaf: 'sheaves',
            sheep: 'sheep',
            shelf: 'shelves',
            'son-in-law': 'sons-in-law',
            species: 'species',
            splash: 'splashes',
            stimulus: 'stimuli',
            stitch: 'stitches',
            stratum: 'strata',
            syllabus: 'syllabi',
            symposium: 'symposia',
            synopsis: 'synopses',
            synthesis: 'syntheses',
            tableau: 'tableaux',
            tax: 'taxes',
            that: 'those',
            thesis: 'theses',
            thief: 'thieves',
            this: 'these',
            tomato: 'tomatoes',
            tooth: 'teeth',
            tornado: 'tornadoes',
            torpedo: 'torpedoes',
            vertebra: 'vertebrae',
            veto: 'vetoes',
            vita: 'vitae',
            volcano: 'volcanoes',
            waltz: 'waltzes',
            wash: 'washes',
            watch: 'watches',
            wharf: 'wharves',
            wife: 'wives',
            wolf: 'wolves',
            woman: 'women',
            zero: 'zeroes',
        };
    }
    MakePluralStringPipe.prototype.transform = function (singularEntity, quantity) {
        if (quantity === void 0) { quantity = 0; }
        if (!singularEntity || singularEntity === '') {
            return '';
        }
        if (quantity === 1) {
            return singularEntity;
        }
        else {
            var lastWord = singularEntity.trim().split(' ')[singularEntity.trim().split(' ').length - 1];
            if (this.irregularMap[lastWord.toLocaleLowerCase()]) {
                if (lastWord[0] === lastWord[0].toLocaleUpperCase()) {
                    return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()].replace(this.irregularMap[lastWord.toLocaleLowerCase()][0], this.irregularMap[lastWord.toLocaleLowerCase()][0].toLocaleUpperCase()));
                }
                return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()]);
            }
            else if (lastWord[lastWord.length - 1] === 'y') {
                // Naive approach:
                // consonant+y = word - 'y' +'ies'
                // vowel+y = word + 's'
                return isVowel(lastWord[lastWord.length - 2])
                    ? singularEntity + 's'
                    : singularEntity.replace(lastWord, lastWord.slice(0, -1) + 'ies');
            }
            else if (lastWord[lastWord.length - 1] === 's') {
                return singularEntity + 'es';
            }
            else {
                return singularEntity + 's';
            }
        }
    };
    MakePluralStringPipe = __decorate([
        Pipe({
            name: 'make-plural-string',
        })
        /**
         * Takes a singular entity string and pluralizes it.
         * Uses both naive and holdout-list approaches.
         * If several words appear in the string, only the last word is pluralized -- this
         * means that if 'your story' was passed in, 'your stories' would be passed out.
         * @constructor
         * @param {string} singularEntity - Entity to pluralize. Pass as a singular ('story' or 'house').
         *          NOTE: The last word is examined. So you can pass in e.g. 'my story'.
         * @param {number} [quantity=0] quantity - How many of the entity are there? If left blank, this will
         *          pluralize the string (e.g. 'story' -> 'stories', 'house' -> 'houses'). If given a value,
         *          this will pluralize appropriately (e.g. ('story', 1) -> 'story', ('story', 2) -> 'stories').
         */
    ], MakePluralStringPipe);
    return MakePluralStringPipe;
}());

var WrapPipe = /** @class */ (function () {
    function WrapPipe() {
    }
    WrapPipe.prototype.transform = function (str, prefix, suffix) {
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = ''; }
        if (!isString(str)) {
            return str;
        }
        return (!!prefix && isString(prefix) ? prefix : '') + str + (!!suffix && isString(suffix) ? suffix : '');
    };
    WrapPipe = __decorate([
        Pipe({ name: 'wrap' })
    ], WrapPipe);
    return WrapPipe;
}());

var STRING_PIPES = [
    AorAnPipe,
    LeftTrimPipe,
    RepeatPipe,
    RightTrimPipe,
    ScanPipe,
    ShortenPipe,
    StripTagsPipe,
    TrimPipe,
    UcFirstPipe,
    UcWordsPipe,
    SlugifyPipe,
    CamelizePipe,
    LatinisePipe,
    LinesPipe,
    UnderscorePipe,
    MatchPipe,
    TestPipe,
    LeftPadPipe,
    RightPadPipe,
    MakePluralStringPipe,
    WrapPipe,
];
var NgStringPipesModule = /** @class */ (function () {
    function NgStringPipesModule() {
    }
    NgStringPipesModule = __decorate([
        NgModule({
            declarations: STRING_PIPES,
            imports: [],
            exports: STRING_PIPES,
        })
    ], NgStringPipesModule);
    return NgStringPipesModule;
}());

var MaxPipe = /** @class */ (function () {
    function MaxPipe() {
    }
    MaxPipe.prototype.transform = function (arr) {
        return Array.isArray(arr) ? Math.max.apply(Math, __spread(arr)) : arr;
    };
    MaxPipe = __decorate([
        Pipe({ name: 'max' })
    ], MaxPipe);
    return MaxPipe;
}());

var MinPipe = /** @class */ (function () {
    function MinPipe() {
    }
    MinPipe.prototype.transform = function (arr) {
        return Array.isArray(arr) ? Math.min.apply(Math, __spread(arr)) : arr;
    };
    MinPipe = __decorate([
        Pipe({ name: 'min' })
    ], MinPipe);
    return MinPipe;
}());

var PercentagePipe = /** @class */ (function () {
    function PercentagePipe() {
    }
    PercentagePipe.prototype.transform = function (num, total, floor) {
        if (total === void 0) { total = 100; }
        if (floor === void 0) { floor = false; }
        if (isNaN(num)) {
            return num;
        }
        var percent = (num * 100) / total;
        return floor ? Math.floor(percent) : percent;
    };
    PercentagePipe = __decorate([
        Pipe({ name: 'percentage' })
    ], PercentagePipe);
    return PercentagePipe;
}());

var SumPipe = /** @class */ (function () {
    function SumPipe() {
    }
    SumPipe.prototype.transform = function (arr) {
        return Array.isArray(arr) ? arr.reduce(function (sum, curr) { return sum + curr; }, 0) : arr;
    };
    SumPipe = __decorate([
        Pipe({ name: 'sum' })
    ], SumPipe);
    return SumPipe;
}());

var FloorPipe = /** @class */ (function () {
    function FloorPipe() {
    }
    FloorPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        if (precision <= 0) {
            return Math.floor(num);
        }
        var tho = Math.pow(10, precision);
        return Math.floor(num * tho) / tho;
    };
    FloorPipe = __decorate([
        Pipe({ name: 'floor' })
    ], FloorPipe);
    return FloorPipe;
}());

var RoundPipe = /** @class */ (function () {
    function RoundPipe() {
    }
    RoundPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        return applyPrecision(num, precision);
    };
    RoundPipe = __decorate([
        Pipe({ name: 'round' })
    ], RoundPipe);
    return RoundPipe;
}());

var SqrtPipe = /** @class */ (function () {
    function SqrtPipe() {
    }
    SqrtPipe.prototype.transform = function (num) {
        return !isNaN(num) ? Math.sqrt(num) : num;
    };
    SqrtPipe = __decorate([
        Pipe({ name: 'sqrt' })
    ], SqrtPipe);
    return SqrtPipe;
}());

var PowerPipe = /** @class */ (function () {
    function PowerPipe() {
    }
    PowerPipe.prototype.transform = function (num, power) {
        if (power === void 0) { power = 2; }
        return !isNaN(num) ? Math.pow(num, power) : num;
    };
    PowerPipe = __decorate([
        Pipe({ name: 'pow' })
    ], PowerPipe);
    return PowerPipe;
}());

var CeilPipe = /** @class */ (function () {
    function CeilPipe() {
    }
    CeilPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        if (precision <= 0) {
            return Math.ceil(num);
        }
        var tho = Math.pow(10, precision);
        return Math.ceil(num * tho) / tho;
    };
    CeilPipe = __decorate([
        Pipe({ name: 'ceil' })
    ], CeilPipe);
    return CeilPipe;
}());

var DegreesPipe = /** @class */ (function () {
    function DegreesPipe() {
    }
    DegreesPipe.prototype.transform = function (radians) {
        if (!isNumberFinite(radians)) {
            return NaN;
        }
        return (radians * 180) / Math.PI;
    };
    DegreesPipe = __decorate([
        Pipe({ name: 'degrees' })
    ], DegreesPipe);
    return DegreesPipe;
}());

var BytesPipe = /** @class */ (function () {
    function BytesPipe() {
        this.dictionary = [
            { max: 1024, type: 'B' },
            { max: 1048576, type: 'KB' },
            { max: 1073741824, type: 'MB' },
            { max: 1.0995116e12, type: 'GB' },
        ];
    }
    BytesPipe.prototype.transform = function (value, precision) {
        if (!isNumberFinite(value)) {
            return NaN;
        }
        var format = this.dictionary.find(function (d) { return value < d.max; }) || this.dictionary[this.dictionary.length - 1];
        var calc = value / (format.max / 1024);
        var num = isUndefined(precision) ? calc : applyPrecision(calc, precision);
        return num + " " + format.type;
    };
    BytesPipe = __decorate([
        Pipe({ name: 'bytes' })
    ], BytesPipe);
    return BytesPipe;
}());

var RadiansPipe = /** @class */ (function () {
    function RadiansPipe() {
    }
    RadiansPipe.prototype.transform = function (degrees) {
        if (!isNumberFinite(degrees)) {
            return NaN;
        }
        return (degrees * Math.PI) / 180;
    };
    RadiansPipe = __decorate([
        Pipe({ name: 'radians' })
    ], RadiansPipe);
    return RadiansPipe;
}());

var MATH_PIPES = [
    MaxPipe,
    MinPipe,
    PercentagePipe,
    SumPipe,
    FloorPipe,
    RoundPipe,
    SqrtPipe,
    PowerPipe,
    CeilPipe,
    DegreesPipe,
    BytesPipe,
    RadiansPipe,
];
var NgMathPipesModule = /** @class */ (function () {
    function NgMathPipesModule() {
    }
    NgMathPipesModule = __decorate([
        NgModule({
            declarations: MATH_PIPES,
            imports: [],
            exports: MATH_PIPES,
        })
    ], NgMathPipesModule);
    return NgMathPipesModule;
}());

var IsDefinedPipe = /** @class */ (function () {
    function IsDefinedPipe() {
    }
    IsDefinedPipe.prototype.transform = function (input) {
        return !isUndefined(input);
    };
    IsDefinedPipe = __decorate([
        Pipe({ name: 'isDefined' })
    ], IsDefinedPipe);
    return IsDefinedPipe;
}());

var IsNullPipe = /** @class */ (function () {
    function IsNullPipe() {
    }
    IsNullPipe.prototype.transform = function (input) {
        return input === null;
    };
    IsNullPipe = __decorate([
        Pipe({ name: 'isNull' })
    ], IsNullPipe);
    return IsNullPipe;
}());

var IsUndefinedPipe = /** @class */ (function () {
    function IsUndefinedPipe() {
    }
    IsUndefinedPipe.prototype.transform = function (input) {
        return isUndefined(input);
    };
    IsUndefinedPipe = __decorate([
        Pipe({ name: 'isUndefined' })
    ], IsUndefinedPipe);
    return IsUndefinedPipe;
}());

var IsStringPipe = /** @class */ (function () {
    function IsStringPipe() {
    }
    IsStringPipe.prototype.transform = function (input) {
        return isString(input);
    };
    IsStringPipe = __decorate([
        Pipe({ name: 'isString' })
    ], IsStringPipe);
    return IsStringPipe;
}());

var IsFunctionPipe = /** @class */ (function () {
    function IsFunctionPipe() {
    }
    IsFunctionPipe.prototype.transform = function (input) {
        return isFunction(input);
    };
    IsFunctionPipe = __decorate([
        Pipe({ name: 'isFunction' })
    ], IsFunctionPipe);
    return IsFunctionPipe;
}());

var IsNumberPipe = /** @class */ (function () {
    function IsNumberPipe() {
    }
    IsNumberPipe.prototype.transform = function (input) {
        return isNumber(input);
    };
    IsNumberPipe = __decorate([
        Pipe({ name: 'isNumber' })
    ], IsNumberPipe);
    return IsNumberPipe;
}());

var IsArrayPipe = /** @class */ (function () {
    function IsArrayPipe() {
    }
    IsArrayPipe.prototype.transform = function (input) {
        return Array.isArray(input);
    };
    IsArrayPipe = __decorate([
        Pipe({ name: 'isArray' })
    ], IsArrayPipe);
    return IsArrayPipe;
}());

var IsObjectPipe = /** @class */ (function () {
    function IsObjectPipe() {
    }
    IsObjectPipe.prototype.transform = function (input) {
        return isObject(input);
    };
    IsObjectPipe = __decorate([
        Pipe({ name: 'isObject' })
    ], IsObjectPipe);
    return IsObjectPipe;
}());

var IsGreaterEqualThanPipe = /** @class */ (function () {
    function IsGreaterEqualThanPipe() {
    }
    IsGreaterEqualThanPipe.prototype.transform = function (input, other) {
        return input >= other;
    };
    IsGreaterEqualThanPipe = __decorate([
        Pipe({ name: 'isGreaterEqualThan' })
    ], IsGreaterEqualThanPipe);
    return IsGreaterEqualThanPipe;
}());

var IsGreaterThanPipe = /** @class */ (function () {
    function IsGreaterThanPipe() {
    }
    IsGreaterThanPipe.prototype.transform = function (input, other) {
        return input > other;
    };
    IsGreaterThanPipe = __decorate([
        Pipe({ name: 'isGreaterThan' })
    ], IsGreaterThanPipe);
    return IsGreaterThanPipe;
}());

var IsLessEqualThanPipe = /** @class */ (function () {
    function IsLessEqualThanPipe() {
    }
    IsLessEqualThanPipe.prototype.transform = function (input, other) {
        return input <= other;
    };
    IsLessEqualThanPipe = __decorate([
        Pipe({ name: 'isLessEqualThan' })
    ], IsLessEqualThanPipe);
    return IsLessEqualThanPipe;
}());

var IsEqualToPipe = /** @class */ (function () {
    function IsEqualToPipe() {
    }
    IsEqualToPipe.prototype.transform = function (input, other) {
        // tslint:disable-next-line:triple-equals
        return input == other;
    };
    IsEqualToPipe = __decorate([
        Pipe({ name: 'isEqualTo' })
    ], IsEqualToPipe);
    return IsEqualToPipe;
}());

var IsNotEqualToPipe = /** @class */ (function () {
    function IsNotEqualToPipe() {
    }
    IsNotEqualToPipe.prototype.transform = function (input, other) {
        // tslint:disable-next-line:triple-equals
        return input != other;
    };
    IsNotEqualToPipe = __decorate([
        Pipe({ name: 'isNotEqualTo' })
    ], IsNotEqualToPipe);
    return IsNotEqualToPipe;
}());

var IsIdenticalToPipe = /** @class */ (function () {
    function IsIdenticalToPipe() {
    }
    IsIdenticalToPipe.prototype.transform = function (input, other) {
        return input === other;
    };
    IsIdenticalToPipe = __decorate([
        Pipe({ name: 'isIdenticalTo' })
    ], IsIdenticalToPipe);
    return IsIdenticalToPipe;
}());

var IsNotIdenticalToPipe = /** @class */ (function () {
    function IsNotIdenticalToPipe() {
    }
    IsNotIdenticalToPipe.prototype.transform = function (input, other) {
        return input !== other;
    };
    IsNotIdenticalToPipe = __decorate([
        Pipe({ name: 'isNotIdenticalTo' })
    ], IsNotIdenticalToPipe);
    return IsNotIdenticalToPipe;
}());

var IsLessThanPipe = /** @class */ (function () {
    function IsLessThanPipe() {
    }
    IsLessThanPipe.prototype.transform = function (input, other) {
        return input < other;
    };
    IsLessThanPipe = __decorate([
        Pipe({ name: 'isLessThan' })
    ], IsLessThanPipe);
    return IsLessThanPipe;
}());

var BOOLEAN_PIPES = [
    IsDefinedPipe,
    IsNullPipe,
    IsUndefinedPipe,
    IsStringPipe,
    IsFunctionPipe,
    IsNumberPipe,
    IsArrayPipe,
    IsObjectPipe,
    IsGreaterEqualThanPipe,
    IsGreaterThanPipe,
    IsLessEqualThanPipe,
    IsLessEqualThanPipe,
    IsEqualToPipe,
    IsNotEqualToPipe,
    IsIdenticalToPipe,
    IsNotIdenticalToPipe,
    IsLessThanPipe,
];
var NgBooleanPipesModule = /** @class */ (function () {
    function NgBooleanPipesModule() {
    }
    NgBooleanPipesModule = __decorate([
        NgModule({
            declarations: BOOLEAN_PIPES,
            imports: [],
            exports: BOOLEAN_PIPES,
        })
    ], NgBooleanPipesModule);
    return NgBooleanPipesModule;
}());

var NgPipesModule = /** @class */ (function () {
    function NgPipesModule() {
    }
    NgPipesModule = __decorate([
        NgModule({
            exports: [NgArrayPipesModule, NgStringPipesModule, NgMathPipesModule, NgBooleanPipesModule, NgObjectPipesModule],
        })
    ], NgPipesModule);
    return NgPipesModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { AorAnPipe, BOOLEAN_PIPES, BytesPipe, CamelizePipe, CeilPipe, DegreesPipe, DiffObjPipe, DiffPipe, EveryPipe, FilterByImpurePipe, FilterByPipe, FlattenPipe, FloorPipe, GroupByImpurePipe, GroupByPipe, InitialPipe, IntersectionPipe, InvertByPipe, InvertPipe, IsArrayPipe, IsDefinedPipe, IsEqualToPipe, IsFunctionPipe, IsGreaterEqualThanPipe, IsGreaterThanPipe, IsIdenticalToPipe, IsLessEqualThanPipe, IsLessThanPipe, IsNotEqualToPipe, IsNotIdenticalToPipe, IsNullPipe, IsNumberPipe, IsObjectPipe, IsStringPipe, IsUndefinedPipe, KeysPipe, LatinisePipe, LeftPadPipe, LeftTrimPipe, LinesPipe, MATH_PIPES, MakePluralStringPipe, MatchPipe, MaxPipe, MinPipe, NgArrayPipesModule, NgBooleanPipesModule, NgMathPipesModule, NgObjectPipesModule, NgPipesModule, NgStringPipesModule, OmitPipe, OrderByImpurePipe, OrderByPipe, PairsPipe, PercentagePipe, PickPipe, PluckPipe, PowerPipe, RangePipe, RepeatPipe, ReversePipe, RightPadPipe, RightTrimPipe, RoundPipe, STRING_PIPES, SamplePipe, ScanPipe, ShortenPipe, ShufflePipe, SlugifyPipe, SomePipe, SqrtPipe, StripTagsPipe, SumPipe, TailPipe, TestPipe, TrimPipe, TrurthifyPipe, UcFirstPipe, UcWordsPipe, UnderscorePipe, UnionPipe, UniquePipe, ValuesPipe, WithoutPipe, WrapPipe, isString as ɵa, RadiansPipe as ɵb };
//# sourceMappingURL=try-pipes.js.map
