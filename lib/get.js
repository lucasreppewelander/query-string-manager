const get = (url, _parameter) => {
    var urlparts= url.split('?');
    if (urlparts.length >= 2) {
        var prefix= encodeURIComponent(_parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        var ret = null;
        for (var i= pars.length; i-- > 0;) {    
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                ret = pars[i].split('=')[1];
            }
        }
        return ret;
    }
    return null;
}