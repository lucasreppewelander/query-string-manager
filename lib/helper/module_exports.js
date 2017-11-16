
const sort = (obj) => {
	const newObj = {};
	const keys = Object.keys(obj);

	const sortedKeys = keys.sort((a, b) => {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	});

	sortedKeys.forEach(key => {
		newObj[key] = obj[key];
	});

	return newObj;
}


module.exports = {
    remove,
    add,
    clear,
    replace,
    replaceSpecific,
    get,
    exist,
    extract,
    objectify,
    encode,
    decode
}