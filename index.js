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

        _url = urlparts[0]+'?'+pars.join('&');
        return _url;
    } else {
        return _url;
    }
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
    console.log(param.query, param.value);
    var ret = '';
    if (!gotQueryStrings) {
        ret += '?' + param.query + '=' + param.value;
    } else {
        ret += '&' + param.query + '=' + param.value;
    }

    return ret;
}

module.exports = {
    remove,
    add
};