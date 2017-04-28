const encode = (url, obj, key) => {
    var string = JSON.stringify(obj);
    var encoded = new Buffer(string).toString('base64');

    if (key) {
    	var _temp = {};
    	_temp[key] = encoded;
    	return add(url, _temp);
    }

    return add(url, {q: encoded});
}