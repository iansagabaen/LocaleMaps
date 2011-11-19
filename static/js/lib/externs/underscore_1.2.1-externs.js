/**
 * @fileoverview Externs file for the Backbone.js framework (v1.2.1)
 *   http://documentcloud.github.com/underscore
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

var _ = {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.each = function(obj, iterator, context) {};
_.forEach = _each;

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.map = function(obj, iterator, context) {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {*} memo 
 * @param {Object=} context
 */
_.reduce = function(obj, iterator, memo, context) {};
_.foldl = _.reduce;
_.inject = _.reduce;

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {*} memo 
 * @param {Object=} context
 */
_.reduceRight = function(obj, iterator, memo, context) {};
_.foldr = _.reduceRight;

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.detect = function(obj, iterator, context) {};
_.find = _.detect;

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.select = function(obj, iterator, context) {};
_.filter = _.select;

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.reject = function(obj, iterator, context) {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)} iterator
 * @param {Object=} context
 */
_.all = function(obj, iterator, context) {};
_.every = _.all;

/**
 * @param {Array.<*>} obj
 * @param {function(*)=} iterator
 * @param {Object=} context
 */
_.any = function(obj, iterator, context) {};
_.some = _.any;

/**
 * @param {Array.<*>} obj
 * @param {*} target
 */
_.contains = function(obj, target) {};
_.include = _.contains;

/**
 * @param {Array.<*>} obj
 * @param {string} method
 * @param {...*} var_args
 */
_.invoke = function(obj, method) {};

/**
 * @param {Array.<*>} obj
 * @param {*} key
 */
_.pluck = function(obj, key) {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)=} iterator
 * @param {Object=} context
 */
_.max = function(obj, iterator, context) {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)=} iterator
 * @param {Object=} context
 */
_.min = function(obj, iterator, context) {};

/**
 * @param {Array.<*>} obj
 */
_.shuffle = function(obj) {};

/**
 * @param {Array.<*>} obj
 * @param {function(*)=} iterator
 * @param {Object=} context
 */
_.sortBy = function(obj, iterator, context) {};

/**
 * @param {Array.<*>} obj
 * @param {*} val
 */
_.groupBy = function(obj, val) {};

_.sortedIndex = function(array, obj, iterator) {};

_.toArray = function(iterable) {};

_.size = function(obj) {};

_.first = function(array, n, guard) {};
_.head = _.first;

_.initial = function(array, n, guard) {};

_.last = function(array, n, guard) {};

_.tail = function(array, index, guard) {};
_.rest = _.tail;

_.compact = function(array) {};

_.flatten = function(array, shallow) {};

_.without = function(array) {};

_.unique = function(array, isSorted, iterator) {};
_.uniq = _.unique;

_.union = function() {};

_.intersect = function(array) {};
_.intersection = _.intersect;

_.difference = function(array, other) {};

_.zip = function() {};

_.indexOf = function(array, item, isSorted) {};

_.lastIndexOf = function(array, item) {};

_.range = function(start, stop, step) {};

_.bind = function(func, context) {};

_.bindAll = function(obj) {};

_.memoize = function(func, hasher) {};

_.delay = function(func, wait) {};

_.defer = function(func) {};

_.throttle = function(func, wait) {};

_.debounce = function(func, wait) {};

_.once = function(func) {};

_.wrap = function(func, wrapper) {};

_.compose = function() {};

_.after = function(times, func) {};

_.keys = function(obj) {};

_.values = function(obj) {};

_.methods = function(obj) {};
_.functions = _.methods;

_.extend = function(obj) {};

_.defaults = function(obj) {};

_.clone = function(obj) {};

_.tap = function(obj, interceptor) {};

_.isEqual = function(a, b) {};

_.isEmpty = function(obj) {};

_.isElement = function(obj) {};

_.isArray = function(obj) {};

_.isObject = function(obj) {};

_.isFunction = function(obj) {};

_.isString = function(obj) {};

_.isNumber = function(obj) {};

_.isNaN = function(obj) {};

_.isBoolean = function(obj) {};

_.isDate = function(obj) {};

_.isRegExp = function(obj) {};

_.isNull = function(obj) {};

_.isUndefined = function(obj) {};

_.noConflict = function() {};

_.identity = function(value) {};

_.times = function (n, iterator, context) {};

_.escape = function(string) {};

_.mixin = function(obj) {};

_.template = function(str, data) {};