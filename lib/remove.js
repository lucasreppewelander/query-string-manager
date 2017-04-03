const remove = (_url, _parameter) => {
    var urlparts= _url.split('?');
    if (urlparts.length >= 2) {

        var prefix= encodeURIComponent(_parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        for (var i= pars.length; i-- > 0;) {    
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        if (pars.length > 0) {
            return urlparts[0]+'?'+pars.join('&');
        }

        return urlparts[0];
    }
    return _url;
}