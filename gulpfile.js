const gulp = require('gulp');
const jshint = require('gulp-jshint');
const config = require('./config');
const parse = require('./parser');


gulp.task('build', () => {
  return config.forEach((snippetConfig) => {
    parse(snippetConfig);
  });
});

gulp.task('lint', function () {
  return gulp.src('lib/**/*.snippet')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});


gulp.task('watch', () => {
  gulp.watch('lib/**.snippet', ['lint', 'build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
