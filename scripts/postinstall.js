#!/usr/bin/env node
// Fixes a bug in @babel/node v8 where bin/babel-node.js uses an ESM import
// without a file extension, which fails in Node.js ESM resolution.
// INIT_CWD is set by npm to the directory where `npm install` was invoked.
const fs = require('fs');
const path = require('path');

const projectRoot = process.env.INIT_CWD || process.cwd();
const babelNodeBin = path.resolve(projectRoot, 'node_modules/@babel/node/bin/babel-node.js');

if (!fs.existsSync(babelNodeBin)) process.exit(0);

const original = fs.readFileSync(babelNodeBin, 'utf8');
const fixed = original.replace(
  'import "../lib/babel-node";',
  'import "../lib/babel-node.js";'
);

if (fixed === original) process.exit(0);

fs.writeFileSync(babelNodeBin, fixed);
console.log('babel-watch: patched @babel/node ESM import extension bug');
