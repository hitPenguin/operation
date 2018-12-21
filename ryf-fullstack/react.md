# React 技术栈

* React 的优点
1. 组件模式: 代码复用和团队分工
2. 虚拟 DOM: 性能优势
3. 移动端支持: 跨终端

## React 没有解决的问题

1. 架构
2. 组件之间的通信

## Flux 的核心思想

1. 不同组件的 state, 存放在一个外部的, 公共的 Store 上面
2. 组件订阅 Store 的不同部分
3. 组件发送 (dispatch) 动作 (action), 引发 Store 的更新

## Redux 的注意事项

1. Redux 要求渲染的组件是 不含state 的组件
2. Redux 