# Ninja Sublime Snippets

Are you tired of typing the same lines of code every damn time. I know i am, Don worry Ninja snippets are here to the rescue.

Ninja Snippets is a tool that enable you to build sublime text snippets from your own code base. Its as easy as configure, paste, and Ninja will build and install the snippet for you.

# How to get started.

Clone this respository to your workspace and run the following commands

```javascript
  $ git clone https://github.com/andela-thomas/NinjaSnippets

  $ cd cd NinjaSnippets

  $ npm install

```

This commands will install all the dependecies you need to get started. Ninja uses gulp to build and install your snippets. I also watches for changes in  your files and builds and updates your snippets.

# Installing Already existing snippets

After running npm install, run `gulp build`,  this will build and install the snippets to your sublime text.

```bash

$ gulp build

```

Note: This only work for those using sublime text 3 on mac OSx. If you are using another Os or sublime text 2 please change the Install.sh to point to the correct location or copy the built snippets manully.


# Creating Your first snippet

Ninja uses config.yml file to create and build snippets all you need is name of the file, description of your snippet, the trigger and the scope where the snippet should be used.

```yaml
- name: js-for-each
  description: Native javaScipt forEach Loop
  trigger: js:forEach
  scope: source.js
```

When you run `gulp` in your terminal  Ninja will create a js-for-each.snippet file in snippets folder. This is the file we will use to write our snippet.

In js-for-each file add the following

```javascript
${1:Array}.forEach((${2:element}, ${3:index}, ${4:Array}) => {
  // Iterative code here
  ${5}
});

```

When you save, Ninja will rebuild and install this snippet to your sublime text. In your sublime you can access the snippet  as follows

```
js:forEach

```

Please refer to sublime snippets documentation for more details.





