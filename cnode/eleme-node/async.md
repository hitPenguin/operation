# 异步和事件


```js
  // promise.catch(fn) 其实是 promise.then(null, fn) 的语法糖‘
  // promise.then 中出现的错误 不能被第二个参数获取，只能被后续的 catch 获取
```