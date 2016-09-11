'use strict';
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const shell = require('gulp-shell');
const { parse, buildConfigArray } = require('./parser');

gulp.task('parse', () => {
  const config = buildConfigArray();
  return config.forEach((snippetConfig) => {
    parse(snippetConfig);
  });
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
