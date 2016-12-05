Query String Manager
======
> a simple tool that allows you to add and remove any querystring from the url

### Install
`npm install --save query-string-manager`

### Usage

```javascript
var qsm = require('query-string-manager');
var newurl = qsm.add('http://mywebsite.com', [{ query: 'userId', value: 1337 }]);

newurl === http://mywebsite.com?userId=1337
```
