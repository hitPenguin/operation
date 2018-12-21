# Node 性能优化

1. 使用最新的 Node.js 版本:
```
  1. LTS 稳定版本 版本号为偶数
  2. Current 开发版本 版本号为奇数 
```

2. fast-json-stringify:
```js
  // 减少遍历，识别字段类型的时间
  const fastJson = require('fast-json-stringify')
  const stringify = fastJson({
      title: 'Example Schema',
      type: 'object',
      properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
          books: {
              type: 'array',
              items: {
                  type: 'string',
                  uniqueItems: true
              }
          }
      }
  })

  console.log(stringify({
      name: 'Starkwang',
      age: 23,
      books: ['C++ Primier', '響け！ユーフォニアム～']
  }))
  //=> {"name":"Starkwang","age":23,"books":["C++ Primier","響け！ユーフォニアム～"]}
```

3. promise 的性能问题:
```js
  // 对于大量异步,轻量计算的中间件项目
  global.Promise = require('bluebird');
```

4. promise 的正确使用:
```js
  // 全部返回 resolve 或者有一个返回 reject 则 p 状态改变
  const p = Promise.all([]);
  // 有一个状态改变则 p 改变
  const p = Promise.race([]);
```

5. V8 垃圾回收 gc
```
  1. 大对象作为缓存:
    可能导致老生代内存增加，垃圾回收变慢，且有内存泄漏的风险
    解决措施:
      1. Redis 等外部缓存的使用
      2. 做好内存泄露的防范
  2. 频繁的产生小对象
    默认 64mb，实际可用 32mb，可能导致频繁新生代垃圾回收
    解决措施:
      适当增加 新生代内存 ，减少 新生代gc次数， 但会增加 新生代gc的时间，实际要对业务进行 profile 压测
```

6. 正确使用 Stream
```js
  // 正确使用 Stream 流替代 fs.readFile 等操作
  // 在 v10 下可使用 pipeline 来实现 stream 自动化管理
  const { pipeline } = require('stream');
  // 实现自己的高性能 Stream
```
  。。。 参考文档
  https://nodejs.org/en/docs/guides/backpressuring-in-streams/

7. node-clinic 快速定位性能问题

https://cnodejs.org/topic/5bf665bce6481c5709f5e453