# Node 单元测试

## assert 模块

```js
  // 常用断言方法
  assert.equal(a, b) // a == b
  assert.ok(a, message) // a == true 
  assert.notEqual(a, b) // a != b
  assert.deepEqual(a, b) // a 与 b 深度相等 
  assert.strictEqual(a, b) // a === b
  assert.throws(block, message) // block 函数是否抛出异常
  assert.ifError(a) // a 是否为假值
  assert.fail(actual, expected, message, operator, stackStartFunction); 
  /* 
  ** stackStartFunction 把出错函数前的路径都抹除
  ** 有 message 输出 message
  ** 无 message 输出 `actual operator expected`
  */
```

## 测试框架 | mocha

* `正向测试` | 可拓展的断言库
* `反向测试` | 可拓展的断言库
* `异步测试` | mocha done方法通知测试用例完成 否则会超时 | 默认 2 s  
* `超时设置` | mocha -t <ms> | mocha describe this.timeout(ms) | mocha it(message, () => {this.timeout(ms)})
 