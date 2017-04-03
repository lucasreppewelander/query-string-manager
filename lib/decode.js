const decode = (url, parameter) => {
    var q = get(url, parameter);
    var y = new Buffer(q, 'base64').toString()
    var obj = JSON.parse(y);
    return obj;
}