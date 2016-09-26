"use strict";
const fs = require('fs');
const path = require('path');
const {
  readSnippetConfig,
  readSnippetFile,
  readYaml,
  createFolder
} = require('./core');


module.exports.buildVscodeConfig = (file, editor) => {
  let vsCodeConfig = readYaml(file);
  let config = vsCodeConfig[editor];
  if (Array.isArray(config)) {
    console.log('config should be a map');
    return [];
  }

  function merge(configLang) {
    var langArray = [];
    configLang.forEach((file) => {
      langArray = langArray.concat(readSnippetConfig(file));
    });
    return langArray;
  }

  for (let lang in config) {
    config[lang] = merge(config[lang]);
  }
  return config;
}

module.exports.compileVscodeSnippets = (config) => {
  function mutate(configLang) {
    let snippet = {};

    configLang.forEach((snippetConfig) => {

      if (snippetConfig.ignore) {
        return false
      }

      let content = readSnippetFile(snippetConfig.name);
      snippet[snippetConfig.trigger] = {
        prefix: snippetConfig.trigger,
        body: content.split('\n'),
        description: snippetConfig.description
      }
    });

    return snippet;
  }

  for (let lang in config) {
    config[lang] = mutate(config[lang]);
  }

  return config;
}

module.exports.buildVscodeSnippet = (lang, content, folder) => {
  if (!lang && !content) {
    console.log("Language and snippet content required");
    return process.exit(0);
  }

  createFolder(folder);

  let filePath = path.resolve(`${folder}/${lang}.json`);

  // parse the content to json
  content = JSON.stringify(content, null, 2);

  try {
    fs.writeFile(filePath, content);
  } catch (err) {
    throw err;
  }
}
