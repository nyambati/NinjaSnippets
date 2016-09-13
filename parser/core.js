"use strict";
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


function readYaml(filePath) {
  return yaml.safeLoad(fs.readFileSync(path.resolve(filePath)));
}

module.exports.readYaml = readYaml;

module.exports.readSnippetConfig = function(file) {
  let config;
  try {
    config = readYaml(`config/${file}.yml`);
  } catch (err) {
    return console.log(err.message);
  }
  return config;
}


module.exports.readSnippetFile = (file) => {

  let filePath = path.resolve(`snippets/${file}.snippet`);

  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    fs.writeFileSync(path.resolve(filePath), '\'use strict\';');
  } finally {
    return fs.readFileSync(filePath, 'utf8')
  }
}

module.exports.buidVscodeSnippets = (file, folder, content) => {
  if (!content && !file && !folder) {
    return false;
  }

  content = JSON.stringify(content, null, 2);
  let filePath = path.resolve(`${folder}/${file}.json`);

  if (!fs.readdirSync('./').includes(folder)) {
    fs.mkdir(folder);
  }

  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports.compileSublimeSnippetTemplate = (snippet, content) => {

  if (!snippet && !content) {
    return false;
  }

  const template = `
<snippet>
  <content><![CDATA[
${ content }
  ]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>${ snippet.trigger }</tabTrigger>
  <description>${ snippet.description }</description>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>${ snippet.scope }</scope>
</snippet>
`;
  return (template);

}