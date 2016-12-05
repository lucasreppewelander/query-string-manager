Query String Manager
======
> A simple tool that allows you to add and remove any querystring from the url

## Install
`npm install --save query-string-manager`

## Usage

`qsm.add(string, array)`
array is an array of objects with `{query: 'query', value: 'value'}`

`qsm.remove(string, string)`

### Add
```javascript
var qsm = require('query-string-manager');
var newurl = qsm.add('http://mywebsite.com', [{ query: 'userId', value: 1337 }]);

// newurl outputs: http://mywebsite.com?userId=1337
```
### Remove
```javascript
var qsm = require('query-string-manager');
var newurl = qsm.remove('http://mywebsite.com?userId=1337&sort=type', 'userId');

// newurl outputs: http://mywebsite.com?sort=type
```
