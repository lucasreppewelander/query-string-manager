var assert = require('assert');
var qsm = require('../qsm.js');

var test = {
    clean: 'www.url.com',
    case1: 'www.url.com?userId=1337',
    case2: 'www.url.com?gender=female&userId=1337',
    case3: 'www.url.com?gender=female'
}

describe('Add methods', function() {
    it('Should add a query string with specific value', function(done) {
        var url = qsm.add(test.clean, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case1, url);
        done();
    });

    it('Add query string to URL with query string', function(done) {
        var url = qsm.add(test.case3, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case2, url);
        done();
    });

    it('Should add a querystring with comma separated values', function(done) {
        var url = qsm.add(test.clean, [{ query: 'userId', value: ['1337', '666', '11'] }]);
        assert.equal('www.url.com?userId=1337,666,11', url);
        done();
    });

    it('Add method used with pure object', function(done) {
        var url = qsm.add(test.clean, { userId: 1337 });
        assert.equal(test.case1, url);
        done();
    });

    it('Add method used with pure object [SEVERAL]', function(done) {
        var url = qsm.add(test.clean, { gender: 'female', userId: 1337 });
        assert.equal(test.case2, url);
        done();
    });

    it('Add method used with pure object 2', function(done) {
        var url = qsm.add(test.case3, { userId: 1337 });
        assert.equal(test.case2, url);
        done();
    });

    it('Add method used with pure object 3 (ARRAY)', function(done) {
        var url = qsm.add(test.clean, { userId: [1,2,3,4] });
        assert.equal('www.url.com?userId=1,2,3,4', url);
        done();
    });
});

describe('Remove / Replace methods', function() {
    it('Should remove userId from URL but still got a query string present', function(done) {
        var url = qsm.remove(test.case2, 'gender');
        assert.equal(test.case1, url);
        done();
    });

    it('Should clear all query strings', function(done) {
        var url = qsm.clear(test.case2);
        assert.equal(test.clean, url);
        done();
    });

    it('Should replace specific query when that is the only query present', function(done) {
        var url = qsm.replaceSpecific(test.case1, [{ query: 'userId', value: '08' }], 'userId');
        assert.equal('www.url.com?userId=08', url);
        done();
    });

    it('Should replace specific query when that is the only query present (OBJECT)', function(done) {
        var url = qsm.replaceSpecific(test.case1, { userId: '08' }, 'userId');
        assert.equal('www.url.com?userId=08', url);
        done();
    });

    it('Should replace specific query when there are several querystrings', function(done) {
        var url = qsm.replaceSpecific(test.case2, [{ query: 'userId', value: '08' }], 'userId');
        assert.equal('www.url.com?gender=female&userId=08', url);
        done();
    });

    it('Should replace specific query when there are several querystrings (OBJECT)', function(done) {
        var url = qsm.replaceSpecific(test.case2, { userId: '08' }, 'userId');
        assert.equal('www.url.com?gender=female&userId=08', url);
        done();
    });
});

describe('Get / Exist & Extract methods', function() {
    it('Check if query string exists', function(done) {
        var exists = qsm.exist(test.case2, 'gender');
        assert.equal(exists, true);
        done();
    });

    it('Get value from specific query string', function(done) {
        var url = qsm.get(test.case2, 'userId');
        assert.equal(url, '1337');
        done();
    });
});

describe('Encode and Decode string/objects', function() {
    it('encode', function(done) {
        var obj = {sort: "desc", query: "select name from users where id = 1"};
        var ret = qsm.encode(test.clean, obj)
        assert.equal(ret, 'www.url.com?q=eyJzb3J0IjoiZGVzYyIsInF1ZXJ5Ijoic2VsZWN0IG5hbWUgZnJvbSB1c2VycyB3aGVyZSBpZCA9IDEifQ==');
        done();
    });

    it('decode [OBJECT]', function(done) {
        var obj = {sort: "desc", query: "select name from users where id = 1"};
        var url = 'www.url.com?q=eyJzb3J0IjoiZGVzYyIsInF1ZXJ5Ijoic2VsZWN0IG5hbWUgZnJvbSB1c2VycyB3aGVyZSBpZCA9IDEifQ==';
        var ret = qsm.decode(url, 'q');
        assert.deepEqual(ret, obj);
        done();
    })

    it('decode [STRING]', function(done) {
        var str = 'This is an encoded string';
        var url = 'www.url.com?q=VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==';
        var ret = qsm.decode(url, 'q');
        assert.deepEqual(ret, str);
        done();
    })
});

describe('Objectify method',function() {
    it('Check parsed object array', function(done) {
        var url = 'http://www.url.com/?a=1,2,3,4';
        var ret = qsm.objectify(url);
        var obj = {a: [1,2,3,4]}
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object booleans', function(done) {
        var url = 'http://www.url.com/?a=true&b=false';
        var ret = qsm.objectify(url);
        var obj = {a:true, b:false};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object numbers', function(done) {
        var url = 'http://www.url.com/?a=1.337&b=1337';
        var ret = qsm.objectify(url);
        var obj = {a:1.337, b:1337};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object mixed', function(done) {
        var url = 'http://www.url.com/?a=1.337,1337,true,leet&b=false';
        var ret = qsm.objectify(url);
        var obj = {a: [1.337,1337,true,'leet'],b:false};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object empty querystring', function(done) {
        var url = 'http://www.url.com/';
        var ret = qsm.objectify(url);
        assert.deepEqual(ret, {})
        done();
    });
});