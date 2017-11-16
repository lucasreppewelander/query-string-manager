const add = (_url, _params) => {
    var retUrl = _url;
    var urlparts= _url.split('?');
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
        if (urlparts.length>=2) {
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
}

const _add = (url, param, key, isFirst) => {
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
}