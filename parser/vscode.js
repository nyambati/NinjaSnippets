"use strict";
const {
  readSnippetConfig,
  readSnippetFile
} = require('./core');


module.exports.buildVscodeConfig = (buffer, editor) => {
  let config = buffer[editor];

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

module.exports.buidVscodeSnippetsObject = (config) => {
  function mutate(configLang) {
    let snippet = {};

    configLang.forEach((snippetConfig) => {
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