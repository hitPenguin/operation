const asyncHook = require('async_hooks');
const fs = require('fs');

const hook = asyncHook.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `${type}\n`);
  }
});

hook.enable();

let index = 0;

function test() {
  index ++;
  fs.writeSync(1, `${asyncHook.triggerAsyncId()}\n`);
}

test();

// process.nextTick(() => test());
// setTimeout(() => test(), 0);