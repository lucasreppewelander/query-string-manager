const replaceSpecific = (url, parameter, replacer) => {
    var url = remove(url, replacer);
    var _url = add(url, parameter);
    return _url;
}