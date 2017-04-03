Query String Manager [![Build Status](https://travis-ci.org/lucasreppewelander/query-string-manager.svg?branch=master)](https://travis-ci.org/lucasreppewelander/query-string-manager)
======
> A simple tool that allows you to add and remove any querystring from the url

## Install
`npm install --save qsm`

## Usage

`qsm.add(string, array);`

`qsm.remove(string, string)`

`qsm.clear(string);`

`qsm.replace(string, string);`

`qsm.exists(string, string);`

`qsm.get(string, string);`

`qsm.objectify(string);`

`qsm.encode(string, string or object);`

`qsm.decode(string, string);`

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

### Exist
Checks if the current url has the querystring.
__returns boolean__
```javascript
var qsm = require('qsm');
var exists = qsm.exist('http://mywebsite.com?userId=1337&sort=type', 'userId');

// exists returns true
```

### Get
Gets the value by key from the url
__returns either string or null__
```javascript
var qsm = require('qsm');
var userIds = qsm.get('http://mywebsite.com?userId=1336,1337,1338&sort=type', 'userId');

// userIds returns: "1336,1337,1338"
// or if it doesnt exist: null
```

### Objectify
Transforms the querystring to a javascript object
__returns object__
```javascript
var qsm = require('qsm');
var queryObject = qsm.objectify('http://mywebsite.com?userId=1336,1337,1338&sort=type&active=true');

// queryObject returns: 
// {
//  userId: [1336,1337,1339],
//  sort: "type",
//  active: true
// }
```

### Encode
Encodes an object or string to base64-string and appends it to the url as Q parameter.    
*this uses qsm.add() method in the background, so it appends it to the Q parameter.*
```javascript
var qsm = require('qsm');
var obj = {a: 'QSM', version: 1.2};
var url = qsm.encode('www.myurl.com', obj);
// url === 'www.myurl.com?q=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9'

```

### Decode
Decodes an query string from the inputted URL, returns either string or object.
```javascript
var qsm = require('qsm');
var url = 'www.myurl.com?q=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9';
var ret = qsm.decode(url, 'q');
// ret === {a: 'QSM', version: 1.2};
```
