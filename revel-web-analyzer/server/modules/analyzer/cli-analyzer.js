#!/usr/bin/env node

const { analyzeURL } = require('./analyzer');
const { argv } = require('yargs');

if (argv.url) {
  analyzeURL(argv.url).then(console.log);
}