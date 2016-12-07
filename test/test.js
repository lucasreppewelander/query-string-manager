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

    it('Add query string to URL with query stringg', (done) => {
        const url = qsm.add(test.case3, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case2, url);
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

describe('Get / Exist methods', () => {
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
});

