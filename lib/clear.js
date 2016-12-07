const clear = (_url) => {
    var urlparts = _url.split('?');
    if (urlparts.length >= 2) {
        return urlparts[0];
    }

    return _url;
}