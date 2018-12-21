# 错误处理

错误 | 名称 | 触发
-- | -- | --
Standard JavaScript errors | 标准 JavaScript 错误 | 由错误代码触发
System errors | 系统错误 | 由操作系统触发
User-specified errors | 用户自定义错误 | 通过 throw 抛出
Assertion errors | 断言错误 | 	由 assert 模块触发

```js
  // Node.js 错误处理
  callback(err, data)
  try {} catch(e) {}
  (new EventEmitter()).on('error', errHandler);
  (new Promise()).then().catch(function(error) { })
```

* uncaughtException 和 unhandledRejection

```js
  // 所有未处理的错误最终
  process.on('uncaughtException', function () { });
  // Promise 被 reject 且没绑定处理函数
  process.on('unhandledRejection', function (reason, p) { });
```