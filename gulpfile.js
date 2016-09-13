'use strict';
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const shell = require('gulp-shell');
const clean = require('gulp-clean');
const {
  buildSublimeSnippets,
  buildVscodeSnippets
} = require('./parser');


gulp.task('clean:sublime', function() {
  return gulp.src(['./ninjaSnippet'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean:vscode', () => {
  return gulp.src(['./vscode'], {
      read: false
    })
    .pipe(clean());
})

gulp.task('build:sublime', ['clean:sublime'], () => {
  return buildSublimeSnippets('config.yml', 'ninjaSnippet');
});

gulp.task('build:vscode', ['clean:vscode'], () => {
  return buildVscodeSnippets('config.yml', 'vscode');
});

gulp.task('build', ['build:sublime', 'build:vscode'], shell.task([
  'chmod 0755 install.sh',
  './install.sh -i vscode',
  './install.sh -i sublime'
]));

gulp.task('lint', () => {
  return gulp.src('lib/**/*.snippet')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }));
});

gulp.task('watch', () => {
  gulp.watch('snippets/**.snippet', ['lint', 'build']);
  gulp.watch('config/**.yml', ['build']);
  gulp.watch('config.yml', ['build']);
});

gulp.task('default', ['lint', 'build', 'watch']);