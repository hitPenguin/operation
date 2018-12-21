'use strict';

const cp = require('child_process');
const fs = require('fs');
const util = require('util');

const exec = util.promisify(cp.exec);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);


async function execFile(cmd, opts = {}) {
  let params = '';
  Object.keys(opts).forEach((key) => { params += ` --${key} ${opts[key]}`; });

  let res;
  try {
    res = await exec(cmd + params);
  } catch (e) {
    res = e;
  }

  if (res && res.stderr) {
    res.success = 0;
    // FIXME throw the error, do not return
    return res;
  }
  const result = { success: 1, res: null };
  if (opts.format === 'json') {
    result.res = JSON.parse(res.stdout);
  } else {
    result.res = res.stdout;
  }
  return result;
}

async function getUserStats(opts = {}) {
  opts.format = 'json';
  opts['sync-stats'] = true;
  const { res } = await Rgw.exec('radosgw-admin user stats', opts);
  return res;
}

