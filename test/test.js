const assert = require('assert');
const qsm = require('../qsm.js');

const test = {
    clean: 'www.url.com',
    case1: 'www.url.com?userId=1337',
    case2: 'www.url.com?gender=female&userId=1337',
    case3: 'www.url.com?gender=female'
}

describe('Add methods', () => {
    it('Should add a query string with specific value', (done) => {
        const url = qsm.add(test.clean, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case1, url);
        done();
    });

    it('Add query string to URL with query string', (done) => {
        const url = qsm.add(test.case3, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case2, url);
        done();
    });

    it('Should add a querystring with comma separated values', (done) => {
        const url = qsm.add(test.clean, [{ query: 'userId', value: ['1337', '666', '11'] }]);
        assert.equal('www.url.com?userId=1337,666,11', url);
        done();
    });
});

describe('Remove / Replace methods', () => {
    it('Should remove userId from URL but still got a query string present', (done) => {
        const url = qsm.remove(test.case2, 'gender');
        assert.equal(test.case1, url);
        done();
    });

    it('Should clear all query strings', (done) => {
        const url = qsm.clear(test.case2);
        assert.equal(test.clean, url);
        done();
    });

    it('Should replace specific query when that is the only query present', (done) => {
        const url = qsm.replaceSpecific(test.case1, [{ query: 'userId', value: '08' }], 'userId');
        assert.equal('www.url.com?userId=08', url);
        done();
    });

    it('Should replace specific query when there are several querystrings', (done) => {
        const url = qsm.replaceSpecific(test.case2, [{ query: 'userId', value: '08' }], 'userId');
        assert.equal('www.url.com?gender=female&userId=08', url);
        done();
    });
});

describe('Get / Exist & Extract methods', () => {
    it('Check if query string exists', (done) => {
        const exists = qsm.exist(test.case2, 'gender');
        assert.equal(exists, true);
        done();
    });

    it('Get value from specific query string', (done) => {
        const url = qsm.get(test.case2, 'userId');
        assert.equal(url, '1337');
        done();
    });

    it('Extract [REGULAR]', (done) => {
        const url = 'www.url.com?userId=80&pattern=regular&parent=34&project=123,345,567';
        const ret = qsm.extract(url);
        done();
    });
});

describe('Objectify method',() => {
    it('Check parsed object array', (done) => {
        const url = 'http://www.url.com/?a=1,2,3,4';
        const ret = qsm.objectify(url);
        const obj = {a: [1,2,3,4]}
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object booleans', (done) => {
        const url = 'http://www.url.com/?a=true&b=false';
        const ret = qsm.objectify(url);
        const obj = {a:true, b:false};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object numbers', (done) => {
        const url = 'http://www.url.com/?a=1.337&b=1337';
        const ret = qsm.objectify(url);
        const obj = {a:1.337, b:1337};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object mixed', (done) => {
        const url = 'http://www.url.com/?a=1.337,1337,true,leet&b=false';
        const ret = qsm.objectify(url);
        const obj = {a: [1.337,1337,true,'leet'],b:false};
        assert.deepEqual(ret,obj);
        done();
    });

    it('Check parsed object empty querystring', (done) => {
        const url = 'http://www.url.com/';
        const ret = qsm.objectify(url);
        assert.deepEqual(ret, {})
        done();
    });
});