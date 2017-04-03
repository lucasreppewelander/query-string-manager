const add = (_url, _params) => {
    var retUrl = _url;
    var urlparts= _url.split('?');
    if (_params.constructor === Object) {
        for (var item in _params) {
            if (_params.hasOwnProperty(item)) {
                if (retUrl.indexOf('?') >= 0) {
                    retUrl += _add(_url, _params[item], item, true);
                } else {
                    retUrl += _add(_url, _params[item], item, false);
                }
            }
        }
    } else {
        if (urlparts.length>=2) {
            for (var i = 0; i < _params.length; i++) {
                retUrl += _add(_url, _params[i], null, true);
            }
        } else {
            for (var i = 0; i < _params.length; i++) {
                if (i === 0) {
                    retUrl += _add(_url, _params[i], null, false);
                } else {
                    retUrl += _add(_url, _params[i], null, true);
                }
            }
        }
    }

    return retUrl;
}

const _add = (url, param, key, gotQueryStrings) => {
    if (key) {
        if (!gotQueryStrings) {
            return '?' + key + '=' + param;
        }

        return '&' + key + '=' + param;
    }

    if (!gotQueryStrings) {
        return '?' + param.query + '=' + param.value;
    }

    return '&' + param.query + '=' + param.value;
}