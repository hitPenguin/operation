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


## 制作自己的 DOCKER 容器

1. 把项目从 github 下弄下来
```bash
  $ git clone https://github.com/ruanyf/koa-demos.git
  $ cd koa-demos
```
2. 不打包的文件写入 `.dockerignore`
```txt
  .git 
  .node_modules
  npm-debug.log
```
3. 制作自己的 Dockerfile 文件
```sh
  FROM node:8.4               #  该 image 继承自官方的 node image，冒号表示版本
  COPY . /app                 #  将当前目录下的所有文件(.dockerignore文件下的除外)都拷贝进 image 文件的 /app 目录
  WORKDIR /app                #  指定接下来的工作路径
  RUN npm install --registry=https://registry.npm.taobao.org
  EXPOSE 3000
```
4. 创建 image 文件 | 创建后可以用 `docker image ls` 命令查看
```bash
  $ docker image build -t koa-demo 
  # 或者
  $ docker image build -t koa-demo:0.0.1 .
  # -t 指定 image 文件的名字 | 后面可以用冒号指定标签，默认为 latest | 最后的点表示 Dockerfile 所在路径
```
5. 生成容器 
```bash
  $ docker container run -p 8000:3000 -it koa-demo /bin/bash
  # 或者
  $ docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
  #  -p 容器的 3000 端口映射到本机的 8000 端口 | -it 容器的 shell 映射到当前的 shell | koa-demo:TAG (TAG默认为 latest) | /bin/bash : 容器启动后，内部执行的第一个命令 
```
6. 在容器里执行命令
```bash
  root@805462b308d1:/app#    node demos/02.js
```

* 其他相关命令
1. ctrl + d (或者输入 exit)退出容器。
2. docker container ls 找到容器 id， 再用 docker container kill [containerID] 终止容器运行
3. docker container ls --all 找到容器文件， 再用 docker container rm [containerID] 删除容器文件
4. docker container run 中写入 --rm 参数可以在容器终止运行后自动删除容器文件
5. CMD 命令 可以写在 dockerfile 文件最后，容器启动后自动执行。(启动时不能附加命令了)  
6. docker container start [containerID];  // 启动服务
7. docker container stop [containerID];
8. docker container logs [containerID];
9. docker container exec -it [containerID] /bin/bash // 进入一个正在运行的容器
10. docker container cp [containerID]:[/path/to/file] // 从正在运行的 Docker 容器里，将文件拷贝到本地


