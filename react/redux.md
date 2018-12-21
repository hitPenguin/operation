# redux

* Redux 的设计思想:
1. Web 应用是一个状态机，视图与状态是一一对应的.
2. 所有的状态，保存在一个对象里面.

## 基本概念和 API

1. Store |　全部数据的集合
```jsx
  // 整个容器只有一个 store
  import { createStore } from 'redux'
  const store = createStore(fn);
```
2. State | State 对应唯一的 View
```jsx
  // state 就是 store 在某个时间点的快照
  const state = store.getState();
```
3. Action | View 通知 State 所要发生的变化
```jsx
  // action　是对象
  const action = {
    type: 'ADD_TODO',  // required 作为 action 的名字
    payload: 'Learn Redux'
  }
```
4. Action Creator | action 生成函数
```js
  const ADD_TODO = '添加 TODO';
  function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }
  const action = addTodo('Learn Redux');
```
5. store.dispatch() | View 发出 action 的唯一方法
```jsx
  import { createStore } from 'redux';
  const store = createStore(fn);
  store.dispatch({
    type: 'ADD_TODO',
    payload: 'Learn Redux'
  });
  // 结合上面的代码,　可以写成 store.dispatch(addTodo('Learn Redux'));
```
6. Reducer | Store 接收到 Action 后改变 state 的过程
```jsx
  // reducer 函数接收 当前 state 和 action, 返回新的 state
  const defaultState = 0;
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'ADD':
        return state + action.payload;
      default: 
        return state;
    }
  };
  const state = reducer(1, {
    type: 'ADD',
    payload: 2
  });
  // reducer 就是 createStore 的参数
  const store = createStore(reducer);
  // 不能改变 state, 因此只能产生新的对象
```
7. store.subscribe() | 可以设置 state 发生改变的监听器
```jsx
  import { createStore } from 'redux';
  const store = createStore(reducer);
  let unsubscribe = store.subscribe(listener);
  unsubscribe();
  // unsubscribe 可以解除所有的监听器
```

## Store 的实现

* Store 有三个方法:
1. store.getState()
2. store.dispatch()
3. store.subscribe()
```js
  // createStore 的简单实现
  const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      }
    }
    dispatch({});
    return { getState, dispatch, subscribe };
  }
```

## Reducer 的拆分