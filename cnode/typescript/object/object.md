# 对象类型

## 接口

* 接口是对行为的抽象，具体的实现由类去实施
```ts
  interface Person {
    name: string;
    age: number
  }
  // 赋值时必须属性或方法一致
  let tom: Person = {
    name: 'chenqiang',
    age: 24
  }
  // 可选属性 和 任意属性
  // [propName: string]:  string
  //               |          |
  //          约束未定义的key   约束所有的 value
  interface Person {
    name: string;
    age?: number；
    [propName: string]: string;
  }
  // 只读属性 约束是在给对象第一次赋值时
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
  }
```

## 数组

```ts
  // 不允许出现 number 之外的类型
  let fibonacci: number[] = [1, 1, 2, 3, 5];
  // 数组泛型
  let fibonacci: Array<number> = [1, 1, 2, 3, 5];
  // 接口表示数组
  interface NumberArray {
    [index: number]: number;
  }
  let fibonacci: NumberArray = [1, 1, 2, 3, 5];
  // any 在数组中运用
  let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
  // 类数组一般都有自己的接口
  let args: IArguments = arguments;
```

## 函数

```ts
  // 函数声明 传参不能多也不能少
  function sum(x: number, y: number): number {
    return x + y;
  }
  // 函数表达式  手动给 muSum 定义类型
  let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
  }; // 或者
  let mySum = function (x: number, y: number): number {
  return x + y;
  };
  // 用接口定义函数
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
      return source.search(subString) !== -1;
  }
```