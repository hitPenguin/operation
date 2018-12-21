const out = process.stdout;
const err = process.stderr;
const myConsole = new console.Console(out, err);

myConsole.log('你好世界');
// 打印: '你好世界'到 out。
myConsole.log('你好%s', '世界');
// 打印: '你好世界'到 out。
myConsole.error(new Error('错误信息'));
// 打印: [Error: 错误信息]到 err。

const name = '描述';
myConsole.warn(`警告${name}`);
myConsole.clear()
// 打印: '警告描述'到 err。