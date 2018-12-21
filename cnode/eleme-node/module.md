# 模块机制问题

* 模块加载机制

```js
  require.cache // 已加载的模块会直接去取
  // 1. 自动重启的实现: 若监视的文件变化，则考虑 delete require.cache[filename] 再重新编译 加载此模块的文件
  // 2. 不自动重启的热更新: 把 Module.prototype._compile 进行包装 第一次加载则返回 new Proxy()
```