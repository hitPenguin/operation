

// function light(color, timeout) {
//   return async function () {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(color)
//       }, timeout);
//     })
//   }
// }

// const red = light('red', 1000);
// const green = light('green', 2000);
// const yellow = light('yellow', 1000);

// async function exec() {
//   while(true) {
//     console.log(await red());
//     console.log(await green());
//     console.log(await yellow());
//   }
// }

// exec();

// const a = {
//   name : 'a'
// }
// module.prototype._compile = 
// return module.exports;
const p = new Proxy(module.exports, {
  get: function (target, key) {
    if (require.cache['filename']) {
      return require.cache['filename'].module.exports;
    }
  }
})
require('./test');
// p.name;
module.exports = { name: 'hqz' };
console.log(require.cache);

const a = require('./test');

delete require.cache[''];
require('./test')

require.cache

