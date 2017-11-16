Query String Manager [![Build Status](https://travis-ci.org/lucasreppewelander/query-string-manager.svg?branch=master)](https://travis-ci.org/lucasreppewelander/query-string-manager)
======
> A simple tool that allows you to add and remove any querystring from the url

## Install
`npm install --save qsm`

## Usage
```javascript
var qsm = require('qsm');
```
---

### Add
Appends querystring to the url.
```javascript
var url = 'http://mywebsite.com';
var newUrl = qsm.add(url, { userId: 1337 });

// newUrl outputs: http://mywebsite.com?userId=1337
```
### Remove
Removes any querystring by key
```javascript
var url = 'http://mywebsite.com?userId=1337&sort=type';
var newurl = qsm.remove(url, 'userId');

// newurl outputs: http://mywebsite.com?sort=type
```
### Clear
Clears all querystrings from the url
```javascript
var url = 'http://mywebsite.com?userId=1337&sort=type';
var newurl = qsm.clear(url);

// newurl outputs: http://mywebsite.com
```

### Replace
Replaces current querystrings with new ones.
```javascript
var url = 'http://mywebsite.com?userId=1337&sort=type';
var newurl = qsm.replace(url, { hasObject: true });

// newurl outputs: http://mywebsite.com?hasObject=true
```

### Exist
Checks if the current url has the querystring.
__returns boolean__
```javascript
var exists = qsm.exist('http://mywebsite.com?userId=1337&sort=type', 'userId');

// exists returns true
```

### Get
Gets the value by key from the url
__returns either string or null__
```javascript
var userIds = qsm.get('http://mywebsite.com?userId=1336,1337,1338&sort=type', 'userId');

// userIds returns: "1336,1337,1338"
// or if it doesnt exist: null
```

### Objectify
Transforms the querystring to a javascript object
__returns object__
```javascript
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
var obj = {a: 'QSM', version: 1.2};
var url = qsm.encode('www.myurl.com', obj);
// url === 'www.myurl.com?q=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9'

```

#### Encode with specific parameter
```javascript
var obj = {a: 'QSM', version: 1.2};
var url = qsm.encode('www.myurl.com', obj, 'appVersion');
// url === 'www.myurl.com?appVersion=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9'

```

### Decode
Decodes an query string from the inputted URL, returns either string or object.
*Decodes by default the Q parameter*
```javascript
var url = 'www.myurl.com?q=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9';
var ret = qsm.decode(url);
// ret === {a: 'QSM', version: 1.2};
```

#### Decode with specific parameter
```javascript
var url = 'www.myurl.com?appVersion=e2E6ICdRU00nLCB2ZXJzaW9uOiAxLjJ9';
var ret = qsm.decode(url, 'appVersion');
// ret === {a: 'QSM', version: 1.2};
```