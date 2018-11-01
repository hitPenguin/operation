# Async_Hooks | 跟踪内部创建的异步资源的生命周期

## fs.writeSync(1, msg)

```js
  console.log() // 最好不在async_hooks中使用，因为 console.log() 为异步操作
```

## asyncHooks.createHook(回调)

* `init(asyncId, type, triggerAsyncId, resource)` | 初始化 
* `before` | 回调前
* `after` | 回调后
* `destory` | 销毁后
* `promiseResolve` | 只在 Promise 内调用 resolve 时触发 | promise.then()时也会触发

### Init 参数

* `asyncId` | 每一个函数都被赋予一个 Async scope | 同一个 Async scope 拿到的是相同的 Async Id 

```js
  // asyncId = 0 意味着
  async_hooks.executionAsyncId() === 0 ? /* 从 C++ 层面执行，不经过 javascript stack */
```

* `type` | 异步资源的构造函数

## asyncHooks.enable() | asyncHooks.disable()

* `enable()` | 启动跟踪
* `disable` | 关闭跟踪

## async scope | async Id

* `asyncHooks.executionAsyncId()` | 返回当前执行上下文的 Async Id
* `asyncHooks.triggerAsyncId()`

## AsyncResource 类

* `new AsyncResource(type[, options])`
* `asyncResource.asyncId()`
* `asyncResource.triggerAsyncId()`
* `asyncResource.emitDestory()`
* `asyncResource.runInAsyncScope` 


