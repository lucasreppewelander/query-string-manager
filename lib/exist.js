const exist = (url, param) => {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix= encodeURIComponent(param)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        var flag = false;
        for (var i= pars.length; i-- > 0;) {    
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