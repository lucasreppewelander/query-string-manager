const add = (_url, _params) => {
    var retUrl;
    var urlparts= _url.split('?');
    if (urlparts.length>=2) {
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