# 前端开发的历史和趋势

1. 早期，前端代码是后端代码的一部分:
```
  后端:
    * Model: 提供，保存数据
    * Controller: 数据处理，实现业务逻辑
    * View: 展示数据，提供用户界面
    后端代码读取模板, 替换变量, 渲染出界面
  前端:
    负责编写页面模板
```
2. ajax 和 web 2.0 的诞生:
```
  前端:
    MVC 框架：
      * Backbone.js：
          Model: 管理数据
          View: 数据的展现　(可以通过 Router 来切换视图)
          Controller: 事件处理 UI 逻辑
    MVVM 模式: Angular 框架, Vue 框架
      Model
      View
      View-Model: 为 View 提供处理好的数据,不含其他逻辑
      本质：view 绑定 view-model，视图与数据模型强耦合。数据的变化实时反映在 view 上，不需要手动处理。
  SPA = Single-page application
    * 读写数据
    * 切换视图
    * 用户交互
```