# babel | 大概理解

## 基本过程

1. 解析: PARSE 代码字符串转为 AST 抽象语法树
2. 变换: 对抽象语法进行变换
3. 再建: 根据变换后的抽象语法树再生成代码字符串
```js
  if (1 > 0) {
      alert('hi');
  }
  // 上述语句的抽象语法树简化
  {
    "type": "Program",                          // 程序根节点
    "body": [                                   // 一个数组包含所有程序的顶层语句
      {
        "type": "IfStatement",                  // 一个if语句节点
        "test": {                               // if语句的判断条件
          "type": "BinaryExpression",           // 一个双元运算表达式节点
          "operator": ">",                      // 运算表达式的运算符
          "left": {                             // 运算符左侧值
            "type": "Literal",                  // 一个常量表达式
            "value": 1                          // 常量表达式的常量值
          },
          "right": {                            // 运算符右侧值
            "type": "Literal",
            "value": 0
          }
        },
        "consequent": {                         // if语句条件满足时的执行内容
          "type": "BlockStatement",             // 用{}包围的代码块
          "body": [                             // 代码块内的语句数组
            {
              "type": "ExpressionStatement",    // 一个表达式语句节点
              "expression": {
                "type": "CallExpression",       // 一个函数调用表达式节点
                "callee": {                     // 被调用者
                  "type": "Identifier",         // 一个标识符表达式节点
                  "name": "alert"
                },
                "arguments": [                  // 调用参数
                  {
                    "type": "Literal",
                    "value": "hi"
                  }
                ]
              }
            }
          ]
        },
        "alternative": null                     // if语句条件未满足时的执行内容
      }
    ]
  }
```
* 第三部，遍历语法树生成相应的代码
```js
const types = {
  Program (node) {
    return node.body.map(child => generate(child));
  },
  IfStatement (node) {
    let code = `if (${generate(node.test)}) ${generate(node.consequent)}`;
    if (node.alternative) {
      code += `else ${generate(node.alternative)}`;
    }
    return code;
  },
  BlockStatement (node) {
    let code = node.body.map(child => generate(child));
    code = `{ ${code} }`;
    return code;
  },
  ......
};
function generate(node) {
  return types[node.type](node);
}
const ast = Babel.parse(...);            // 将代码解析成语法树
const generatedCode = generate(ast);     // 将语法树重新组合成代码
```

## 抽象语法树的生成

1. 分词: 代码字符串分割成 语法单元数组
2. 语义分析: 分析语法单元之间的关系

* 语法单元的生成:
```
  遇到以下则不可再分
    空白 $nbsp；
    注释  // 
    字符串  "string"
    数字  number
    运算符  "+" , "-" , "*" , "/"
    括号  "(" , ")"
```
```js
  if (1 > 0) {
    alert("if 1 > 0");
  }
```

```json
  [
  { "type": "whitespace", "value": "\n" },
  { "type": "identifier", "value": "if" },
  { "type": "whitespace", "value": " " },
  { "type": "parens", "value": "(" },
  { "type": "number", "value": "1" },
  { "type": "whitespace", "value": " " },
  { "type": "operator", "value": ">" },
  { "type": "whitespace", "value": " " },
  { "type": "number", "value": "0" },
  { "type": "parens", "value": ")" },
  { "type": "whitespace", "value": " " },
  { "type": "brace", "value": "{" },
  { "type": "whitespace", "value": "\n " },
  { "type": "identifier", "value": "alert" },
  { "type": "parens", "value": "(" },
  { "type": "string", "value": "\"if 1 > 0\"" },
  { "type": "parens", "value": ")" },
  { "type": "sep", "value": ";" },
  { "type": "whitespace", "value": "\n" },
  { "type": "brace", "value": "}" },
  { "type": "whitespace", "value": "\n" },
  ]
```

* 语义分析