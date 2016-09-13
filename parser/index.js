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
  buildSublimeConfig('config.yml', 'sublime')
    .forEach((config) => {
      compileSublimeSnippet(config, folder);
    });
};

module.exports.buildVscodeSnippets = (file, folder) => {
  let vsCodeConfig = buildVscodeConfig(file, folder);
  let compiledSnippets = compileVscodeSnippets(vsCodeConfig);

  Object.keys(compiledSnippets).forEach((lang) => {
    buildVscodeSnippet(lang, compiledSnippets[lang], 'vscode');
  })
};
