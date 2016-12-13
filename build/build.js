'use strict';

var add = function add(_url, _params) {
    var retUrl;
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {
        retUrl = _url;
        for (var i = 0; i < _params.length; i++) {
            retUrl += _add(_url, _params[i], true);
        }
    } else {
        retUrl = _url;
        for (var i = 0; i < _params.length; i++) {
            if (i === 0) {
                retUrl += _add(_url, _params[i], false);
            } else {
                retUrl += _add(_url, _params[i], true);
            }
        }
    }

    return retUrl;
};

var _add = function _add(url, param, gotQueryStrings) {
    var ret = '';
    if (!gotQueryStrings) {
        ret += '?' + param.query + '=' + param.value;
    } else {
        ret += '&' + param.query + '=' + param.value;
    }

    return ret;
};
var clear = function clear(_url) {
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {
        return urlparts[0];
    }

    return _url;
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

            if (pars[i].split('=')[1].includes(',')) {
                var subarr = [];
                var subarray = pars[i].split('=')[1].split(',');
                for (var y = 0; y < subarray.length; y++) {
                    console.log(y, subarray[y], parseInt(subarray[y]));
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
            _url = urlparts[0] + '?' + pars.join('&');
        } else {
            _url = urlparts[0];
        }

        return _url;
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
module.exports = {
    remove: remove,
    add: add,
    clear: clear,
    replace: replace,
    replaceSpecific: replaceSpecific,
    get: get,
    exist: exist,
    extract: extract
};