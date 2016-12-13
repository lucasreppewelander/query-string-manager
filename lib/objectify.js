const _parseValue = (value) => {
    // Array
    if(value.indexOf(',') !== -1){
        var array = [];
        var pars = value.split(',');
        for(var i = pars.length; i-- > 0;){
            array[i]=(_parseValue(pars[i]));
        }
        return array;
    }
    // Booleans   
    if(value === 'true') return true;
    if(value === 'false') return false;
    //Number
    if(!isNaN(parseFloat(value))) return parseFloat(value);
    //String
    return value;
}

const objectify = (url) => {
    var object = {};
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
        var pars = urlparts[1].split(/[&;]/g);
        for (var i= pars.length; i-- > 0;){
            var keyValue = pars[i].split(/=(.+)/);
            object[keyValue[0]] = _parseValue(keyValue[1]);
        }
    }
    return object; 
}