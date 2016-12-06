const assert = require('assert');
const qms = require('../index.js');

const test = {
    clean: 'www.url.com',
    case1: 'www.url.com?userId=1337',
    case2: 'www.url.com?gender=female&userId=1337',
    case3: 'www.url.com?gender=female'
}

describe('Add methods', () => {
    it('Should add a query string with specific value', (done) => {
        const url = qms.add(test.clean, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case1, url);
        done();
    });

    it('Add query string to URL with query stringg', (done) => {
        const url = qms.add(test.case3, [{ query: 'userId', value: '1337' }]);
        assert.equal(test.case2, url);
        done();
    });
});

describe('Remove / Replace methods', () => {
    it('Should remove userId from URL but still got a query string present', (done) => {
        const url = qms.remove(test.case2, 'gender');
        assert.equal(test.case1, url);
        done();
    });

    it('Should clear all query strings', (done) => {
        const url = qms.clear(test.case2);
        assert.equal(test.clean, url);
        done();
    });
});

describe('Get / Exist methods', () => {
    it('Check if query string exists', (done) => {
        const exists = qms.exist(test.case2, 'gender');
        assert.equal(exists, true);
        done();
    });

    it('Get value from specific query string', (done) => {
        const url = qms.get(test.case2, 'userId');
        assert.equal(url, '1337');
        done();
    });
});

