const decode = (url, parameter) => {
    var q = get(url, parameter);
    var y = new Buffer(q, 'base64').toString();

    try {
        return JSON.parse(y);
    } catch(e) {
        return y;
    }
}