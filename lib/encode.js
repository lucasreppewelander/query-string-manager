const encode = (url, obj) => {
    var string = JSON.stringify(obj);
    var encoded = new Buffer(string).toString('base64');
    return add(url, {q: encoded});
}