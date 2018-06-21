var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('scripts', function() {
    // return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js'])
    return gulp.src(['src/jquery.min.js', 'src/bootstrap.min.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./js/'));
  });
  
  gulp.task('default', [ 'scripts' ]);