# 安全模块

## Node.js 提供的 crypto 模块

* 对 openSSL 的加密，解密，哈希，HMAC，签名，验证等功能

## XSS 跨站脚本攻击

```html
  <!-- 直接脚本插入 -->
  <script>alert('xss');</script>
  <!-- 标签的 url 方式引入 -->
  <table background="javascript:alert(/xss/)"></table>
  <img src="javascript:alert('xss')">
  <img src="javas cript:
  alert('xss')">
  <!-- %00 到 %ff 都是 url 编码 -->
  <img%20src=%22javascript:alert('xss');%22>
  <!-- &#116 unicode 编码，对应 ascii 码 -->
  <img src="javascrip&#116&#58alert(/xss/)">
```

```html
  <!-- javascript: 是 类似于 file:/// 的伪协议
        伪协议可以当做 url 被解析 -->
  <!-- javascript:alert("Hello world") 仅执行代码 不改变当前文档 -->
  <!-- javascript:var now =new Date();"<h1>This time:</h1>"+now; 执行 js 代码，并且把最后的字符串作为新文档的内容显示出来
        可以有 html 标记 -->
```

### Content Security Policy | 网页安全策略

* 两种方式启用 CSP:

1. HTTP 的头信息： `Content-Security-Policy: script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:`
2. meta 标签引入： `<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">`

```
  脚本: 只新信任当前域名
  <object>标签: 不信任任何 url，即不加载任何资源
  样式表: 只信任cdn.example.org和third-party.org
  框架: 必须用 https 加载
  其他资源: 没有限制
```

```
  1. 资源加载限制
    script-src：外部脚本
    style-src：样式表
    img-src：图像
    media-src：媒体文件（音频和视频）
    font-src：字体文件
    object-src：插件（比如 Flash）
    child-src：框架
    frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
    connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
    worker-src：worker脚本
    manifest-src：manifest 文件
  2. default src
    限制上面所有资源的默认设置
  3. url 限制
    frame-ancestors：限制嵌入框架的网页
    base-uri：限制<base#href>
    form-action：限制<form#action> 
  4. 其他限制
    block-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
    upgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议
    plugin-types：限制可以使用的插件格式
    sandbox：浏览器行为的限制，比如不能有弹出窗口等。 
  5. report-uri
    report-uri /my_amazing_csp_report_parser;
    浏览器会发送 POST 方法的 json 对象
```

* script-src 特殊值设置：

```js
  // 'unsafe-inline'：允许执行页面内嵌的&lt;script>标签和事件监听函数
  // unsafe-eval：允许将字符串当作代码执行，比如使用eval、setTimeout、setInterval和Function等函数。
  // nonce值：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行
  "script" : "nonce=EDNnf03nceIOfn39fn3e9h3sdfa"
  // hash值：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。
  alert('Hello, world.'); // Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='
  // nonce值和hash值还可以用在style-src选项
```

## CSRF | 跨站请求伪造

* 一句话总结: 利用 A 站的 cookie，在 B 站伪造 A 站的请求。
1. 同源检查:
```
  检查： Origin header ； referer header
```
2. crsf token:
```
  token 放入 session，然后在客户端请求时让 cookie 带上 csrf_token
```

## 中间人攻击

* https 是一般的解决策略

## SQL/NoSQL 注入

1. SQL 注入:
```sql
  SELECT * FROM users WHERE usernae = 'myName' AND password = 'mySecret';
  SELECT * FROM users WHERE usernae = 'myName' AND password = ''; DROP TABLE users; --';
  -- 是注释
```

```js
  let {user, pass, age} = ctx.query;
  db.collection.find({
    user, pass,
    $where: `this.age >= ${age}` // age 可以注入了
  })
```