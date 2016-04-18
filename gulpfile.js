var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

var config = {
  css: {
    src: "src/styl/",
    temp: "temp/css/",
    app: "app/"
  }
};


gulp.task('clear:css:temp', function () {
  return gulp.src(config.css.temp + "*.*", {read: false})
    .pipe(clean());
});

gulp.task('dev:build:css', function() {
  return gulp
    .pipe(stylus({
      use: rupture(),
    }))
    .pipe(postcss([
      lost(),
      autoprefixer(),
      pxtorem({
          replace: true
      })
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.css.temp));
});

gulp.task("prod:build:css", function(){
  return gulp
    .src(config.css.src + "main.css")
    .pipe(plumber());
});

gulp.task("watch:css",["dev:build:css"],function(){
  gulp.watch(config.css.src + '**/*.*', ['dev:build:css']);
});


gulp.task("watch", ["watch:css"]);
gulp.task('default', ['watch']);
