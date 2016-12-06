'use strict';

var qsr = require('./index');

var array = [
    { query: 'users', value: [1, 34] },
    { query: 'orderStages', value: 1 },
    { query: 'sort', value: true },
];

let URL = 'http://www.lrw.se';

var newUrl = qsr.add(URL, array);
console.log();
console.log('------------');
console.log();

console.log('newUrl', newUrl);

console.log();
console.log('------------');
console.log();

var _newUrl = qsr.replaceSpecific(newUrl, [{ query: 'users', value: [1, 34, 566, 34, 232] }], 'users');
console.log('qsr.replaceSpecific', _newUrl);

console.log();
console.log();

var getValue = qsr.get(_newUrl, 'users');
console.log(getValue);


/*
var secondNewUrl = qsr.add(newUrl, [{ query: 'added', value: '2016-12-05' }]);
console.log('secondNewUrl', secondNewUrl);
console.log();
console.log('------------');
console.log();

var thirdNewUrl = qsr.replace(secondNewUrl, [{ query: 'lucas', value: '1337' }]);
console.log('thirdNewUrl should only contain ?lucas=1337', thirdNewUrl);
console.log();
console.log('------------');
console.log();


var doesitexist = qsr.exist(thirdNewUrl, 'lucas');
console.log('doesitexist', doesitexist);
console.log();
// var changedUrl = qsr.remove(secondNewUrl, 'user');
// console.log('changedUrl', changedUrl);


var clearUrl = qsr.clear('http://www.lrw.se');
console.log('clearUrl', clearUrl);

*/