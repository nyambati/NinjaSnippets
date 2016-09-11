const gulp = require('gulp');
const jshint = require('gulp-jshint');
const shell = require('gulp-shell');
const parse = require('./parser');
const fs = require('fs');
const yaml = require('js-yaml');

function readConfig(file) {
  let buffer;
  try {
    buffer = fs.readFileSync(`config/${file}.yml`);
  } catch (err) {
    return console.log(err.message);
  }
  return yaml.safeLoad(buffer);
}

function buildConfigArray() {
  let buffer;
  let config = [];
  try {
    buffer = yaml.safeLoad(fs.readFileSync('config.yml'));
  } catch (err) {
    console.log(err.message);
  }

  buffer.environment.forEach((environment) => {
    config = config.concat(readConfig(environment));
  });

  return config;
}


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

gulp.task('lint', function() {
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
