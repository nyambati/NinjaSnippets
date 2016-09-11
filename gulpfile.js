'use strict';
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const shell = require('gulp-shell');
const clean = require('gulp-clean');
const { buildSnippets } = require('./parser');

gulp.task('clean', function () {
  return gulp.src('./ninjaSnippet', { read: false })
    .pipe(clean());
});

gulp.task('parse', ['clean'], () => {
  buildSnippets('config.yml');
});

gulp.task('build', ['parse'], shell.task([
  'chmod 0755 install.sh',
  './install.sh'
]));

gulp.task('lint', function () {
  return gulp.src('lib/**/*.snippet')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('watch', () => {
  gulp.watch('snippets/**.snippet', ['lint', 'build']);
  gulp.watch('config/**.yml', ['build']);
  gulp.watch('config.yml', ['build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
