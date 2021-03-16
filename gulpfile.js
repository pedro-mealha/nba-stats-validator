const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const browserSync = require('browser-sync')

gulp.task('build', function () {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('watch', function () {
  gulp.watch('./assets/js/*.js', gulp.series('build'))
})

gulp.task('browser-sync', function () {
  gulp.watch('assets/js/*.js', gulp.series('build'))

  const files = [
    './**/*.html',
    './assets/css/**/*.css',
    './assets/img/**/*.png',
    './assets/js/**/*.js'
  ]

  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  })
})
