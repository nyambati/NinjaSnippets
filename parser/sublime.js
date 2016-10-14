"use strict";
const fs = require('fs');
const path = require('path');
const {
  readSnippetFile,
  compileSublimeSnippetTemplate,
  readSnippetConfig,
  readYaml,
  createFolder
} = require('./core');


module.exports.buildSublimeConfig = (file, editor) => {

  let buffer, config = [];

  try {
    buffer = readYaml(file);
  } catch (err) {
    console.log(err.message);
  }

  if (buffer[editor] === null) {
    return console.log('No configuraton supplied for a build');
  }

  for (let file of buffer[editor]) {

    let snippetConfig = readSnippetConfig(file);
    if (snippetConfig) {
      config = config.concat(snippetConfig);
    }

  }

  return config;
}


module.exports.compileSublimeSnippet = (snippet, folder) => {
  // return ig not snippet has been supplied
  if (!snippet || snippet.ignore) {
    return false;
  }

  let content = readSnippetFile(snippet.name);
  let parsedSnippet = compileSublimeSnippetTemplate(snippet, content);

  createFolder(folder);

  // Genereate the path for the file
  let filePath = path.resolve(`${folder}/${snippet.name}.sublime-snippet`)

  // write the built snippet to the snippet folder
  return fs.writeFileSync(filePath, parsedSnippet);

}
