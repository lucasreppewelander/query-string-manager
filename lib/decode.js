const decode = (url, parameter) => {
	var param = parameter;
	if (!parameter) {
		param = 'q';
	}
    var q = get(url, param);
    var y = new Buffer(q, 'base64').toString();

    try {
        return JSON.parse(y);
    } catch(e) {
        return y;
    }
}