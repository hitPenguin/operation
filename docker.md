# DOCKER 入门

## DOCKER 简介

```
  linux 容器其实就是代码 + 运行环境
  DOCKER是lunix 容器的封装
```

## DOCKER 安装

* `docker version` | `docker info` | 检测是否安装成功

##  image 文件 | 容器的模板

```bash
  # 列出本机的所有 image 文件
  $ docker iamge ls
  # 删除 image 文件
  $ docker image rm [imageName]
  # 抓取远程文件  默认组: library/ 可以省略
  $ docker iamge pull library/hello-world
  # 运行 image 文件 | 本地没有会从远程抓起
  $ docker container run hello-world
```

