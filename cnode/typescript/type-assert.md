# 类型判断

* 类型断言 和 联合类型 结合使用
```ts
  // 断言的类型必须是联合类型中存在的
  <string>something || something as string
  function getLength(something: string | number): number {
      if ((<string>something).length) {
          return (<string>something).length;
      } else {
          return something.toString().length;
      }
  }
```

# 声明文件

* 声明语句
```ts
  // 帮助类型判断
  declare var jQuery: (selector: string) => any;
  // 不声明不能使用
  jQuery('#foo');
```
* 把所有声明放到单独的文件中 | 声明文件
```ts
  // jQuery.d.ts
  declare var jQuery: (selector: string) => any;
  // 三斜线代表引用声明文件
  /// <reference path="./jQuery.d.ts" />
  jQuery('#foo');
```

# 内置对象

* ECMAScript 的内置对象
```ts
  // Boolean Error Date RegExp
```
* DOM 和 BOM 的内置对象
```ts
  // Document HTMLElement Event NodeList
```
* TypeScript 写 Node.js
```bash
  npm install @types/node --save-dev
```