'use strict';

module.exports = (_url, _parameter) => {
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