"use strict";
const {
  buildSublimeConfig,
  compileSublimeSnippet
} = require('./sublime');

const {
  buildVscodeConfig,
  compileVscodeSnippets,
  buildVscodeSnippet
} = require('./vscode');

module.exports.buildSublimeSnippets = (path, folder) => {
  let sublimeConfig = buildSublimeConfig('config.yml', 'sublime');

  for (let config of sublimeConfig) {
    compileSublimeSnippet(config, folder);
  }

};

module.exports.buildVscodeSnippets = (file, folder) => {
  let vsCodeConfig = buildVscodeConfig(file, folder);
  let compiledSnippets = compileVscodeSnippets(vsCodeConfig);

  for (let lang of Object.keys(compiledSnippets)) {
    buildVscodeSnippet(lang, compiledSnippets[lang], 'vscode');
  }

};
