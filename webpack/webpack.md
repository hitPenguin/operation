# webpack 介绍

```
  Webpack 是为浏览器构建Javascript模块脚本的前段工具。
  webpack 需要一个名为 webpack.config.js 的配置文件
```

## Entry File

```js
  // webpack.config.js
  module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    }
  }
```