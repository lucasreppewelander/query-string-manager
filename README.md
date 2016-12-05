Query String Manager
======
> A simple tool that allows you to add and remove any querystring from the url

## Install
`npm install --save qsm`

## Usage

`qsm.add(string, array)`
array is an array of objects with `{query: 'query', value: 'value'}`

`qsm.remove(string, string)`

`qsm.clear(string);`

`qsm.replace(string, string)`

---

### Add
Appends querystring to the url.
```javascript
var qsm = require('qsm');
var newurl = qsm.add('http://mywebsite.com', [{ query: 'userId', value: 1337 }]);

// newurl outputs: http://mywebsite.com?userId=1337
```
### Remove
Removes any querystring by key
```javascript
var qsm = require('qsm');
var newurl = qsm.remove('http://mywebsite.com?userId=1337&sort=type', 'userId');

// newurl outputs: http://mywebsite.com?sort=type
```
### Clear
Clears all querystrings from the url
```javascript
var qsm = require('qsm');
var newurl = qsm.clear('http://mywebsite.com?userId=1337&sort=type');

// newurl outputs: http://mywebsite.com
```

### Replace
Replaces current querystrings with new ones.
```javascript
var qsm = require('qsm');
var newurl = qsm.replace('http://mywebsite.com?userId=1337&sort=type', [{ query: 'hasObject', value: true }]);

// newurl outputs: http://mywebsite.com?hasObject=true
```