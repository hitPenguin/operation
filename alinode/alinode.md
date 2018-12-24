# alinode 实例 参数

* Memory: 内存使用率：
```js
  process.memoryUsage();
  { 
    rss: 32202752, // 进程的常驻内存部分 buffer 的内存是 堆外内存 所分配的
    heapTotal: 7684096, // V8 堆中总共申请的内存
    heapUsed: 5732168, // V8 堆中使用中的内存量
    external: 8701 
  };
  os.totalmem();
  // 8271241216
  os.freemem();
  // 1715003392
```
* cpu 使用率

* load1 , load5, load15 | 平均负载
```
  load1: 1分钟系统负荷
  load5: 5分钟系统负荷
  load15: 15分钟系统负荷
```

* QPS | 每秒的请求响应数
```json
  {
    "Requests per second": "236.91 [#/sec] (mean)"
  }
```
* gc 垃圾回收

* Apdex
```
  应用响应时间: T 为标准
    Satisfied: 响应时间小于 T
    Tolerating: 响应时间在 T 和 4T 之间
    Frustrated: 响应时间大于 4T
```

* 磁盘
```bash
  df 
  # 查看磁盘使用率
  # 文件系统       1K-块     已用     可用      已用% 挂载点
  # /dev/sda3    96188164 32584064 58694944   36%   /
```