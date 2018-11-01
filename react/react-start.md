# REACT 入门

## JSX 

* 凡是使用 JSX 语法的时候，都要在 javascript 写上 `type="text/babel"`

```js
  <javascript type="text/babel">
```

## 相关文件

* `react.js` | React 的核心库
* `react-dom.js` | 提供与 DOM 相关的功能
* `Browser.js` | 将 JSX 语法转换为 javascript 语法

```bash
  # JSX 转为 javascript
  # 将 src 的 js 文件转码后放在 build 目录
  $ babel src --out-dir build
```

## ReactDOM.render() | React 最基本方法

```js
  // 将模板转为 HTML 语言，并插入指定的 DOM 节点
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
  );
```

## JSX 语法

* 允许 HTML 和 Javascript 的混写

```js
  // 遇到 HTML 标签 ( < 开头)，用html解析 | 遇到 javascript ( { 开头)，用 javascript 解析
  var names = ['Alice', 'Emily', 'Kate'];
  ReactDOM.render(
    <div>
    {
      names.map(function (name, index) {
        return <div key={index}>Hello, {name}!</div>
      })
    }
    </div>,
    document.getElementById('example')；
  );
```

* JSX 允许在模板插入 Javascript 变量 | 若是数组，则会展开数组

```js
  // react 写法
  var arr = [
    <h1>Hello world!</h1>,
    <h2>React is awesome</h2>
  ];
  ReactDOM.render(
    <div>{arr}</div>,
      document.getElementById('example')
  );
```

## 组件 | component

* `React.createClass` | 将代码封装为组件
* 每个组件都有自己的 `render` 方法
* 组件`第一个`字母必须`大写` | 只能包含`一个顶层标签`
* 组件类的属性可以在 `this.pros` 对象上获取 | `class` 要写成 `className` | `for` 属性要写成 `htmlFor`

```js
  var HelloMessage = React.createClass({
    render: function() {
      return <h1>Hello {this.props.name}</h1>;
    }
  })
  ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('example') // 这里别写 ; 号
  );
```

* `this.props.children` 表示组件的所有子节点

```js
/* 
this.props.children 三种可能: 
** 1. 没有子节点 ---> undefined
** 2. 一个子节点 ---> object
** 3. 多个子节点 ---> array
*/
// React提供了 React.Children 来处理 this.props.children
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.getElementById('example')
);
```

## PropTypes

* `参数验证` | 组件类的 `PropTypes` 属性
* `设置属性默认值` | 组件类的`getDefaultProps`属性

```js
  var myTitle = React.createClass({
    propType: {
      title : React.propTypes.string.isRequired
    },
    getDefaultProps： function() {
      return {
        title : 'hello world'
      }
    },
    render: function() {
      return <h1> {this.props.title} </h1>;
    }
  })
```

## 获取真实的 DOM 节点 | DOM diff 节点

* `this.refs.[refName]` | 获取真实的 DOM 节点

```js
  // this.refs 要等虚拟 DOM 插入文档后使用
  var myComponent = React.createClass({
    handleClick: function() {
      this.refs.myTextInput.focus();
    },
    render: function() {
      return (
        <div>
          <input type='text' ref='myTextInput' />
          <input type='button' value='Focus the text input' onClick={this.handleClick} />
        </div>
      );
    }
  });
```

## this.stat | 状态更迭

* `getInitStat` | 定义初始状态
* `this.stat` | 可以获取上面对象中的元素
* `this.setStat({})` | 可以设置状态并触发 this.render()方法

```js
  var LikeButton = React.createClass({
    getInitStat: function() {
      return {
        like: false;
      }
    },
    handleClick: function() {
      this.setStat({ liked: !this.stat.liked });
    },
    render: function() {
      var text = this.stat.liked ? 'like' : 'haven\'t liked';
      return (
        <p onClick={this.handleClick}>
          you {text} this. Click to toggle.
        </p>
      )
    }
  })
  ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
  )
```

## 表单 | 用户的输入不能通过 this.props 获取

* 表单组件的值一般通过事件的 `event.target.value` 获取 | input textarea select radio

```js
  var Input = React.createClass({
    getInitState: function() {
      return { value: 'hello!' }
    },
    handleChange: function(event) {
      this.setStat({value: event.target.value});
    },
    render: function() {
      var value = this.stat.value;
      return (
        <div>
          <input type='text' value={value} onChange={this.handleChange} />
          <p>{value}</p>
        </div>
      )
    }
  })
  ReactDOM.render(<Input />, document.body);
``` 

## 组件生命周期

* `Mounting` | 已插入真实 DOM
* `Updating` | 正在被重新渲染
* `Unmounting` | 已移出真实 DOM
* `will` 进入状态之前调用 | `did` 进入状态之后调用

```js
  // will and did
  componentWillMount();
  componentDidMount();
  componentWillUpdate(object nextProps, object nextState);
  componentDidUpdate(object prevProps, object prevState);
  conponentWillUnmount();
  // 两种特殊状态的处理函数
  componentWillReceiveProps(object nextProps) // 已加载组件收到新的参数时调用
  shouldComponentUpdate(object nextProps, object nextState) // 组件判断是否重新渲染时调用
```

```js
  var Hello = React.createClass({
    getInitState: function() {
      return {
        opacity: 1.0
      };
    },
    componentDidMount: function() {
      this.timer = setInterval(function () {
        var opacity = this.state.opacity;
        opacity -= .05;
        if (opacity < 0.1) {
          opacity = 1.0;
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    },
    // 第一层{}代表为javascript语法 第二层为样式对象
    render: function() {
      return (
        <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
        </div>
      );
    }
  });
  ReactDOM.render(
    <Hello name="world" />,
    document.body
  );
```

## Ajax

* 可以使用 componentDidMount 方法设置 Ajax 请求，成功后用 this.setState 方法重新渲染 UI

## 传入的 props 也可以是 promise 对象

```js
  ReactDOM.render(
  <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')} />,
  document.getElementById('example')
);
```