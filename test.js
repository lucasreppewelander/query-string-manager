'use strict';

var qsr = require('./index');

var array = [
    { query: 'user', value: 123 },
    { query: 'orderStages', value: 1 },
    { query: 'sort', value: true },
];

var newUrl = qsr.add('http://www.lrw.se', array);
console.log();
console.log('------------');
console.log();

console.log('#######');
console.log('newUrl', newUrl);

console.log();
console.log('------------');
console.log();
var secondNewUrl = qsr.add(newUrl, [{ query: 'added', value: '2016-12-05' }]);
console.log('secondNewUrl', secondNewUrl);
console.log();
console.log('------------');
console.log();

var changedUrl = qsr.remove(secondNewUrl, 'user');
console.log('changedUrl', changedUrl);


var clearUrl = qsr.clear('http://www.lrw.se');
console.log('clearUrl', clearUrl);