# util

## url 

* 一般转化为 `%00 - %ff`

## querystring

```js
  const qs = require('querystring');
  qs.parse(str) // 解析 ? 后的字符串 不支持多层解析
  qs.stringify(obj) // 把 对象 转化为 query string
  `arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4` // 可以传递 arr 数组
```

## util.inherits 的实现

```js
exports.inherits = function(ctor, superCtor) {

  if (ctor === undefined || ctor === null)
    throw new TypeError('The constructor to "inherits" must not be ' +
                        'null or undefined');

  if (superCtor === undefined || superCtor === null)
    throw new TypeError('The super constructor to "inherits" must not ' +
                        'be null or undefined');

  if (superCtor.prototype === undefined)
    throw new TypeError('The super constructor to "inherits" must ' +
                        'have a prototype');

  ctor.super_ = superCtor;
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
};
```