# IO 相关

## Buffer 和 TypedArray

```js
  Buffer.from();
  const arr = new Uint16Array(2);
  arr[0] = 5000;
  arr[1] = 4000;
  // 注意字节序 默认是 高对低
  // 其实是 buffer 数组在不同的 view 下是不同的视图
  const buf1 = Buffer.from(arr); // 拷贝了该 buffer
  const buf2 = Buffer.from(arr.buffer); // 与该数组共享了内存

  console.log(buf1);
  // 输出: <Buffer 88 a0>, 拷贝的 buffer 只有两个元素
  console.log(buf2);
  // 输出: <Buffer 88 13 a0 0f>

  arr[1] = 6000;
  console.log(buf1);
  // 输出: <Buffer 88 a0>
  console.log(buf2);
  // 输出: <Buffer 88 13 70 17>
```

* `readline` 是如何判断一行结束的:
```
  realine 在读取 TTY 的数据时, 是通过 input.on('keypress', onkeypress) 时发现用户按下了回车键来判断是新的 line 的, 而读取一般的 stream 时, 则是通过缓存数据然后用正则 .test 来判断是否为 new line 的.
```

* CORS 

```
  由于同源性策略 (CORS), 如果你引用的 js 脚本所在的域与当前域不同, 那么浏览器会把 onError 中的 msg 替换为 Script error. 要拿到详细错误的方法, 处理配好 Access-Control-Allow-Origin 还有在引用脚本的时候指定 crossorigin
```

```html
  <script src="http://another-domain.com/app.js" crossorigin="anonymous"></script>
```


## DNS

```js
  dns.lookup(hostname[, options], cb) // 同步，通过系统自带的 DNS 缓存
  dns.resolve(hostname[, rrtype], cb) // 异步， 根据 rrtype
```