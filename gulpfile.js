const gulp = require('gulp');
const jshint = require('gulp-jshint');
const shell = require('gulp-shell');
const parse = require('./parser');
const fs = require('fs');
const yaml = require('js-yaml');

function readConfig() {
  let buffer;
  try {
    buffer = fs.readFileSync('config.yml');
  } catch (err) {
    return console.log(err.message);
  }

  return yaml.safeLoad(buffer);

}

gulp.task('parse', () => {
  const config = readConfig();
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
  gulp.watch('config.yml', ['build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
