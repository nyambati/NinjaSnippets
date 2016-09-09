const gulp = require('gulp');
const jshint = require('gulp-jshint');
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

gulp.task('build', () => {
  const config = readConfig();
  return config.forEach((snippetConfig) => {
    console.log(snippetConfig);
    parse(snippetConfig);
  });
});

gulp.task('lint', function () {
  return gulp.src('lib/**/*.snippet')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('watch', () => {
  gulp.watch('snippets/**.snippet', ['lint', 'build']);
  gulp.watch('config.yaml', ['build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
