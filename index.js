'use strict';

const remove = (_url, _parameter) => {
    var urlparts= _url.split('?');
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(_parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        if (pars.length > 0) {
            _url = urlparts[0]+'?'+pars.join('&');
        } else {
            _url = urlparts[0];
        }
        
        return _url;
    }
    return _url;
}

const replace = (_url, _parameter) => {
    var url = clear(_url);
    return add(url, _parameter);
}

const replaceSpecific = (url, parameter, replacer) => {
    var url = remove(url, replacer);
    var _url = add(url, parameter);
    return _url;
}

const clear = (_url) => {
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {
        return urlparts[0];
    }

    return _url;
}

const get = (url, _parameter) => {
    var urlparts= url.split('?');
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(_parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        var ret = null;
        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                ret = pars[i].split('=')[1];
            }
        }

        // _url = urlparts[0]+'?'+pars.join('&');
        return ret;
    }
    return null;
}

// _paramter and _value should be array
const add = (_url, _params) => {
    var retUrl;
    var urlparts= _url.split('?');
    if (urlparts.length>=2) {
        // ? already exists use & to append
        retUrl = _url;
        for (var i = 0; i < _params.length; i++) {
            retUrl += _add(_url, _params[i], true);
        }
    } else {
        // ? does not exists, add ? to first and then no more.
        retUrl = _url;
        for (var i = 0; i < _params.length; i++) {
            if (i === 0) {
                retUrl += _add(_url, _params[i], false);
            } else {
                retUrl += _add(_url, _params[i], true);
            }
        }
    }

    // var urlparts = _url.split('?');
    // if (urlparts.length >= 2) {

    // } else {
    //     // query string doesnt exist, add it and return the new url.
    // }

    return retUrl;
}

const _add = (url, param, gotQueryStrings) => {
    var ret = '';
    if (!gotQueryStrings) {
        ret += '?' + param.query + '=' + param.value;
    } else {
        ret += '&' + param.query + '=' + param.value;
    }

    return ret;
}

const exist = (url, param) => {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix= encodeURIComponent(param)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        var flag = false;
        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
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
}

module.exports = {
    remove,
    add,
    clear,
    replace,
    exist,
    get,
    replaceSpecific
};