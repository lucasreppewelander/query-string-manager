"use strict";var add=function(e,r){var t=e,n=e.split("?");if(r.constructor===Object){var a=sort(r);for(var i in a)a.hasOwnProperty(i)&&(exist(t,i)?t=replaceSpecific(e,a,i):t+=_add(e,a[i],i,t.indexOf("?")<=0))}else if(console.warn("You are using a feature of QSM 2.0 that will get deprecated in next major release. Please use the object variant instead. More info at https://npmjs.com/package/qsm"),n.length>=2)for(var l=0;l<r.length;l++)t+=_add(e,r[l],null,!1);else for(var l=0;l<r.length;l++)t+=_add(e,r[l],null,l<1);return t},_add=function(e,r,t,n){return t?n?"?"+t+"="+r:"&"+t+"="+r:n?"?"+r.query+"="+r.value:"&"+r.query+"="+r.value},clear=function(e){var r=e.split("?");return r.length>=2?r[0]:e},decode=function(e,r){var t=r;r||(t="q");var n=get(e,t),a=new Buffer(n,"base64").toString();try{return JSON.parse(a)}catch(e){return a}},encode=function(e,r,t){var n=JSON.stringify(r),a=new Buffer(n).toString("base64");if(t){var i={};return i[t]=a,add(e,i)}return add(e,{q:a})},exist=function(e,r){var t=e.split("?");if(t.length>=2){for(var n=encodeURIComponent(r)+"=",a=t[1].split(/[&;]/g),i=!1,l=a.length;l-- >0;)-1!==a[l].lastIndexOf(n,0)&&(i=!0);return!!i}return!1},extract=function(e,r){var t=e.split("?");if(t.length>=2){for(var n=[],a=t[1].split(/[&;]/g),i=0;i<a.length;i++){var l=a[i].split("=")[1];if(a[i].split("=")[1].indexOf(",")>=0){for(var o=[],s=a[i].split("=")[1].split(","),u=0;u<s.length;u++)o.push(parseInt(s[u])?parseInt(s[u]):s[u]);l=o}"plain"===r?n.push(parseInt(l)?parseInt(l):l):Array.isArray(l)?n.push({query:a[i].split("=")[0],value:l}):n.push({query:a[i].split("=")[0],value:parseInt(l)?parseInt(l):l})}return n}return null},get=function(e,r){var t=e.split("?");if(t.length>=2){for(var n=encodeURIComponent(r)+"=",a=t[1].split(/[&;]/g),i=null,l=a.length;l-- >0;)-1!==a[l].lastIndexOf(n,0)&&(i=a[l].split("=")[1]);return i}return null},_parseValue=function e(r){if(-1!==r.indexOf(",")){for(var t=[],n=r.split(","),a=n.length;a-- >0;)t[a]=e(n[a]);return t}return"true"===r||"false"!==r&&(isFinite(parseFloat(r))?parseFloat(r):r)},objectify=function(e){var r={},t=e.split("?");if(t.length>=2)for(var n=t[1].split(/[&;]/g),a=n.length;a-- >0;){var i=n[a].split(/=(.+)/);i[1]?r[i[0]]=_parseValue(i[1]):r[i[0]]=null}return r},remove=function(e,r){var t=e.split("?");if(t.length>=2){for(var n=encodeURIComponent(r)+"=",a=t[1].split(/[&;]/g),i=a.length;i-- >0;)-1!==a[i].lastIndexOf(n,0)&&a.splice(i,1);return a.length>0?t[0]+"?"+a.join("&"):t[0]}return e},replace=function(e,r){var t=clear(e);return add(t,r)},replaceSpecific=function(e,r,t){var e=remove(e,t);return add(e,r)},sort=function(e){var r={};return Object.keys(e).sort(function(e,r){return e>r?1:e<r?-1:0}).forEach(function(t){r[t]=e[t]}),r};module.exports={remove:remove,add:add,clear:clear,replace:replace,replaceSpecific:replaceSpecific,get:get,exist:exist,extract:extract,objectify:objectify,encode:encode,decode:decode};