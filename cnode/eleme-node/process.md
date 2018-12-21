# 进程相关

* `ps -ef`

name | description
-- | --
UID | 执行该进程的用户ID
PID | 进程编号
PPID | 该进程的父进程编号
C | 该进程所在的 cpu 利用率
STIME | 进程执行时间
TTY | 进程相关的终端类型
TIME | 进程所占用的 CPU 时间
CMD | 创建该进程的指令

* Node.js process 对象的相关属性:
```js
  process.env // 进程的环境变量
  // 可以通过 APP_JS='APP' node filename 来赋给 process.env
  process.cwd() // 基本上根据 命令行启动 时所在的目录或 当前工作目录来获得
```
* `Console.log` 底层是 process.write(message);
```
  通过 process.stdout.isTTY 来判断一个流是否指向 终端
  1. Files: 同步 在 Windows 和 POSIX 下
  2. TTYs (Terminals): 异步 在 Windows 下， 同步 在 POSIX 下
  3. Pipes (and sockets): 同步 在 Windows 下， 异步 在 POSIX 下
```

* 用 'readline' 实现简单的 同步输入 操作
```js
  // 官方文档的简单例子
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
    // 对答案进行处理
    console.log(`多谢你的反馈：${answer}`);
    rl.close();
  });
```

* 子进程的创建:
```
  1. spawn(): 启动一个子进程来执行命令
    1. options.detached 父进程死后是否允许子进程存活
    2. options.stdio 指定子进程的三个标准流
  2. spawnSync(): 同步版的 spawn, 可指定超时, 返回的对象可获得子进程的情况
  3. exec(): 启动一个子进程来执行命令, 带回调参数获知子进程的情况, 可指定进程运行的超时时间
  4. execSync(): 同步版的 exec(), 可指定超时, 返回子进程的输出 (stdout)
  5. execFile(): 启动一个子进程来执行一个可执行文件, 可指定进程运行的超时时间
  6. execFileSync(): 同步版的 execFile(), 返回子进程的输出, 如何超时或者 exit code 不为 0, 会直接 throw Error
  7. fork(): 加强版的 spawn(), 返回值是 ChildProcess 对象可以与子进程交互
```



## 孤儿进程 | 僵尸进程 | 守护进程

* 孤儿进程:
```
  父进程先退出，子进程被托付给 init
```
* 僵尸进程:
```
  子进程已经退出， 但未通知父进程，僵尸进程还会消耗一定的系统资源,并且还保留一些概要信息供父进程查询子进程的状态可以提供父进程想要的信息。
```
* 守护进程:
```
  守护进程就是在后台运行，不和任何终端关联的进程
```
* 进程的相关 ID
```
  PID : 进程的唯一标识
  PGID : 进程所属的进程组， 一般和父进程所在进程组相同
  SID : 会话 ID， 每个进程都有的，默认会继承父进程的会话 ID
```

## node.js IPC 通道的实现

```
  windows 下:
    命名管道;
  *nix 下:
    Unix Domain Socket
```

## 守护进程的实现

```js
  // 守护进程实现 (C语言版本)
  void init_daemon()
  {
      pid_t pid;
      int i = 0;

      if ((pid = fork()) == -1) {
          printf("Fork error !\n");
          exit(1);
      }

      if (pid != 0) {
          exit(0);        // 父进程退出
      }

      setsid();           // 子进程开启新会话, 并成为会话首进程和组长进程
      if ((pid = fork()) == -1) {
          printf("Fork error !\n");
          exit(-1);
      }
      if (pid != 0) {
          exit(0);        // 结束第一子进程, 第二子进程不再是会话首进程
                          // 避免当前会话组重新与tty连接
      }
      chdir("/tmp");      // 改变工作目录
      umask(0);           // 重设文件掩码
      for (; i < getdtablesize(); ++i) {
        close(i);        // 关闭打开的文件描述符
      }

      return;
  }
```