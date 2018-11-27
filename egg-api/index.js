#!/usr/bin/env node
const dox = require('dox');
const json2md = require('json2md');
const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * execArgv
 * @param {String} title the api doc title
 * @param {String} entry the start directory name
 * @param {String} default default api description
 */
const execArgv = {};
process.argv.slice(2).forEach((argv) => {
  const result = argv.match(/^--(.*?)=(.*?)$/);
  execArgv[result[1]] = result[2];
})
const filePath = path.join(process.cwd(), './api.md');
const currentPath = path.join(process.cwd(), execArgv.entry || './app/controller');
const readfile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writefile = util.promisify(fs.writeFile);
/**
 * filename cycle reading
 * @param {String} startPath the directory where you want to start
 * @return {Array} the array of directoryname
 */
async function readdirAsync(startPath) {
  let rst = [];
  const dataArray = await readdir(startPath);
  await Promise.all(dataArray.map(async (data) => {
    if (data.match(/\.js$/) === null) {
      rst.push(...await readdirAsync(path.join(startPath, data)));
    } else {
      rst.push(path.join(startPath, data));
    }
  }));
  return rst;
}
/**
 * read files async
 * @param {Array} rst the array of all the directory name
 * @return {Object} the api Json of the files in rst
 */
async function readFile(rst) {
  const content = await Promise.all(rst.map((pathname) => readfile(pathname))); /* eslint-disable */
  const allC = content.join('\n');
  return dox.parseComments(allC.toString('utf8'));
}
/**
 * sort by api name
 * @param {String} apiJson the api Json of the files in rst
 */
async function sortApi(apiJson) {
  apiJson.forEach((obj) => {
    const header = obj.description.full.replace(/<.*?>/g, '').trim().replace(/\s+/g, ' ').split(' ');
    const [method, api, ...des] = header;
    obj.header = {
      method,
      api,
      des: des.join(' ') || execArgv.default || '暂无描述'
    };
  });
  apiJson.sort((front, behind) => {
    return front.header.api > behind.header.api;
  })
}

const table = (tags) => {
  const headers = ['Parameter', 'Location', 'DataType', 'Mandatory', 'Description'];
  const rows = [];
  tags.forEach((obj) => {
    const param = obj.string.match(/{(.*)?}(.*)/);
    const text = param[2].trim().replace(/\s+/g, ' ').split(' ');
    let [Parameter, Mandatory = '', ...des] = text;
    const validate = Mandatory.toLowerCase();
    if (validate === 'no' || validate === 'yes') {
      Description = des.join(' ');
    } else {
      Description = [Mandatory, ...des].join(' ');
      Mandatory = 'Yes';
    }
    rows.push({
      Parameter,
      Location: obj.type,
      DataType: param[1],
      Mandatory,
      Description,
    });
  });
  return {
    table: {
      headers,
      rows,
    },
  };
};

async function writeFile(apiJson) {
  const mdArray = [];
  mdArray.push({
    h1: execArgv.title || 'auto api 文档'
  })
  sortApi(apiJson);
  apiJson.forEach((obj) => {
    const t = table(obj.tags);
    const { method, api, des } = obj.header;
    mdArray.push({
      h2: des
    }, {
        h3: `${method} ${api}`
      }, t);
  });
  await writefile(filePath, json2md(mdArray));
}

async function start() {
  const rst = await readdirAsync(currentPath);
  const apiJson = await readFile(rst);
  await writeFile(apiJson);
}

start();

// [ { tags:
//   [ { type: 'body',
//       string: '{String} name',
//       html: '<p>{String} name</p>' },
//     { type: 'query',
//       string: '{String} root',
//       html: '<p>{String} root</p>' },
//     { type: 'query',
//       string: '{String} app',
//       html: '<p>{String} app</p>' } ],
//  description:
//   { full: '<p>POST /api/rule</p>',
//     summary: '<p>POST /api/rule</p>',
//     body: '' },
//  isPrivate: false,
//  isConstructor: false,
//  isClass: false,
//  isEvent: false,
//  ignore: false,
//  line: 1,
//  codeStart: 7,
//  code: 'function app() {\n  return \'app\';\n}',
//  ctx: { type: 'function', name: 'app', string: 'app()' } },
// { tags:
//   [ { type: 'body',
//       string: '{String} name',
//       html: '<p>{String} name</p>' },
//     { type: 'query',
//       string: '{String} root',
//       html: '<p>{String} root</p>' },
//     { type: 'query',
//       string: '{String} app',
//       html: '<p>{String} app</p>' } ],
//  description:
//   { full: '<p>POST /api/rule</p>',
//     summary: '<p>POST /api/rule</p>',
//     body: '' },
//  isPrivate: false,
//  isConstructor: false,
//  isClass: false,
//  isEvent: false,
//  ignore: false,
//  line: 11,
//  codeStart: 17,
//  code: 'function app1() {\n  return \'app\';\n}\n\nmodule.exports.app = app;',
//  ctx: { type: 'function', name: 'app1', string: 'app1()' } } ]
