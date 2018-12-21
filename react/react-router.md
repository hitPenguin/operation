# React-Router 简单使用 -------------  React-Router-Dom

## React Router 基本用法

### React Router 安装

```bash
  $ npm install -S react-router
```

### React Router 使用

```js 
  import { Router } from 'react-router'
  render(<Router />, document.getElementById('app'));
```

### React Router 路由 

* `hashHistory` | react-router 2.0 | /app ---> localhost:8080/#/app

```js
  // index.js 文件
  import { Router, Route, hashHistory } from 'react-router'
  import { APP } from './app'
  import { render } from 'react-dom'
  render((
    <Router history={hashHistory}>
      <Route path="/" component={APP} />
    <Router />
  ), document.getElementById('app'));
```

```js
  // app.js
  import React from 'react'
  export default React.createClass({
    render() {
      return <div>Hello, React Router!</div>
    }
  })
```

## 路由嵌套

* index.js 文件的写法

```js
  // 用户访问 /repos 时，先加载App组件，在内部加载 Repos 组件
  <Router history={hashHistory}>
    <Route path="/" component={APP} />
      <Route path="/repos" component={Repos} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
```

* app 组件的写法

```js
  export default React.createClass({
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  })
```

* 子路由可以单独传入 Router 组件的 routes 属性

```js
  let routes = <Route path="/" component={APP}>
                <Route path="/repos" component={Repos} />
                <Route path="/about" component={About} />
               <Route>;
  <Router routes={routes} history={browserHistory} />
```

## path 属性

* path省略的话 不管路径是否匹配，总会加载指定组件

## 通配符

* path属性可以用通配符

```js
  <Route path="/hello/:name" />
  // 匹配 /hello/michael
  // 匹配 /hello/ryan
  <Route path="/hello(/:name)" />
  // 匹配 /hello
  // 匹配 /hello/michael
  <Route path="/files/*.*" />
  // 匹配 /files/hello.jpg
  // 匹配 /files/hello.html
  <Route path="files/*" />
  // 匹配 /files/
  // 匹配 /files/a
  // 匹配 /files/a/b
``` 


