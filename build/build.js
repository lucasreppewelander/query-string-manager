'use strict';

var add = function add(_url, _params) {
    var retUrl = _url;
    var urlparts = _url.split('?');
    if (_params.constructor === Object) {
        var __params = sort(_params);
        for (var item in __params) {
            if (__params.hasOwnProperty(item)) {
                if (exist(retUrl, item)) {
                    retUrl = replaceSpecific(_url, __params, item);
                } else {
                    retUrl += _add(_url, __params[item], item, retUrl.indexOf('?') <= 0);
                }
            }
        }
    } else {
        console.warn('You are using a feature of QSM 2.0 that will get deprecated in next major release. Please use the object variant instead. More info at https://npmjs.com/package/qsm');
        if (urlparts.length >= 2) {
            for (var i = 0; i < _params.length; i++) {
                retUrl += _add(_url, _params[i], null, false);
            }
        } else {
            for (var i = 0; i < _params.length; i++) {
                retUrl += _add(_url, _params[i], null, i < 1);
            }
        }
    }

    return retUrl;
};

var _add = function _add(url, param, key, isFirst) {
    if (key) {
        if (isFirst) {
            return '?' + key + '=' + param;
        }

        return '&' + key + '=' + param;
    }

    if (isFirst) {
        return '?' + param.query + '=' + param.value;
    }

    return '&' + param.query + '=' + param.value;
};
var clear = function clear(_url) {
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {
        return urlparts[0];
    }

    return _url;
};
var decode = function decode(url, parameter) {
    var param = parameter;
    if (!parameter) {
        param = 'q';
    }
    var q = get(url, param);
    var y = new Buffer(q, 'base64').toString();

    try {
        return JSON.parse(y);
    } catch (e) {
        return y;
    }
};
var encode = function encode(url, obj, key) {
    var string = JSON.stringify(obj);
    var encoded = new Buffer(string).toString('base64');

    if (key) {
        var _temp = {};
        _temp[key] = encoded;
        return add(url, _temp);
    }

    return add(url, { q: encoded });
};
var exist = function exist(url, param) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(param) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        var flag = false;
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                flag = true;
            }
        }

        if (flag) {
            return true;
        }

        return false;
    }

    return false;
};
var extract = function extract(url, type) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var ret = [];
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = 0; i < pars.length; i++) {
            var value = pars[i].split('=')[1];

            if (pars[i].split('=')[1].indexOf(',') >= 0) {
                var subarr = [];
                var subarray = pars[i].split('=')[1].split(',');
                for (var y = 0; y < subarray.length; y++) {
                    subarr.push(parseInt(subarray[y]) ? parseInt(subarray[y]) : subarray[y]);
                }

                value = subarr;
            }

            if (type === 'plain') {
                ret.push(parseInt(value) ? parseInt(value) : value);
            } else {
                if (!Array.isArray(value)) {
                    ret.push({
                        query: pars[i].split('=')[0],
                        value: parseInt(value) ? parseInt(value) : value
                    });
                } else {
                    ret.push({
                        query: pars[i].split('=')[0],
                        value: value
                    });
                }
            }
        }

        return ret;
    }

    return null;
};
var get = function get(url, _parameter) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(_parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        var ret = null;
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                ret = pars[i].split('=')[1];
            }
        }
        return ret;
    }
    return null;
};
var _parseValue = function _parseValue(value) {
    // Array
    if (value.indexOf(',') !== -1) {
        var array = [];
        var pars = value.split(',');
        for (var i = pars.length; i-- > 0;) {
            array[i] = _parseValue(pars[i]);
        }
        return array;
    }
    // Booleans   
    if (value === 'true') return true;
    if (value === 'false') return false;

    //special string eg: '2020-02'
    if (value.indexOf('-') > 0) return value;
    //Number
    if (isFinite(parseFloat(value))) return parseFloat(value);
    //String
    return value;
};

var objectify = function objectify(url) {
    var object = {};
    var urlparts = url.split('?');

    if (urlparts.length >= 2) {
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) {
            var keyValue = pars[i].split(/=(.+)/);
            if (keyValue[1]) {
                object[keyValue[0]] = _parseValue(keyValue[1]);
            } else {
                object[keyValue[0]] = null;
            }
        }
    }
    return object;
};
var remove = function remove(_url, _parameter) {
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(_parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        if (pars.length > 0) {
            return urlparts[0] + '?' + pars.join('&');
        }

        return urlparts[0];
    }
    return _url;
};
var replace = function replace(_url, _parameter) {
    var url = clear(_url);
    return add(url, _parameter);
};
var replaceSpecific = function replaceSpecific(url, parameter, replacer) {
    var url = remove(url, replacer);
    var _url = add(url, parameter);
    return _url;
};
var sort = function sort(obj) {
    var newObj = {};
    var keys = Object.keys(obj);

    var sortedKeys = keys.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    sortedKeys.forEach(function (key) {
        newObj[key] = obj[key];
    });

    return newObj;
};

module.exports = {
    remove: remove,
    add: add,
    clear: clear,
    replace: replace,
    replaceSpecific: replaceSpecific,
    get: get,
    exist: exist,
    extract: extract,
    objectify: objectify,
    encode: encode,
    decode: decode
};