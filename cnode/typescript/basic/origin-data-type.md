# 原始数据类型

## 布尔值

```ts
  let isDone: boolean = false || Boolean(1);
```

## 数值
* 可以表示 NaN ， Infinity ， 普通数字 ， 0xffff ... , 特殊情况如下:
```ts
  // ES6 中的二进制表示法
  let binaryLiteral: number = 0b1010;
  // ES6 中的八进制表示法
  let octalLiteral: number = 0o744;
```
* 编译结果:
```js
  // ES6 中的二进制表示法
  var binaryLiteral = 10;
  // ES6 中的八进制表示法
  var octalLiteral = 484;
```

## 字符串

```ts
  let myName: string = 'Tom';
  // 模板字符串
  let sentence: string = `Hello, my name is ${myName}`;
```

## 空值

```ts
  // 代表函数无返回值
  function alertName(): void {
    alert('My name is Tom');
  }
  // 只能被赋值 undefined 和 null
  let unusable: void = undefined;
```

## null 和 undefined

* null 和 undefined 是所有类的子类
```ts
  let value: null = null;
  let value: undefined = undefined;
  let value: undefined;
  let value: number = null;
```

## 任意值类型 和 未声明类型

```ts
  let some; // ===> let some: any;
  some = 'seven';
  some = 7;
  some.valueOf();
```

## 类型推论

```ts
  let some = 'seven'; // 等价于 let some: string = 'seven';
  some = 7; // 报错
```

## 联合类型

```ts
  let some: string | number;
  // 联合类型只许使用共用的方法等;
  some.length // 会报错
  // 联合变量被赋值时会给予一个类型
  some = 'seven';
  some.split();
```