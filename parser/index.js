const fs = require('fs');
const path = require('path');

function getSnippet(file) {
  try {
    return fs
      .readFileSync(path.resolve(`snippets/${file}.snippet`), 'utf8');
  } catch (err) {
    fs.writeFileSync(path.resolve(`snippets/${file}.snippet`), '\'use strict\';');
  }
}

function parseSnippet(snippet, content) {
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

function parse(snippet) {
  let content = getSnippet(snippet.name);
  let parsedSnippet = parseSnippet(snippet, content);
  let folder = 'ninjaSnippet';

  if (!fs.readdirSync('./').includes(folder)) {
    fs.mkdirSync(folder);
  }

  fs.writeFileSync(path.resolve(`${folder}/${snippet.name}.sublime-snippet`), parsedSnippet);


}


module.exports = parse;
