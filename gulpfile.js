const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const browserSync = require('browser-sync') || null

gulp.task('build', function () {
  return gulp.src('./assets/js/*.js', { read: false })
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(clean())
    .pipe(gulp.dest('build'))
})

gulp.task('build-dev', function () {
  return gulp.src('./assets/js/*.js')
    .pipe(gulp.dest('build'))
})

gulp.task('watch', function () {
  gulp.watch('./assets/js/*.js', gulp.series('build-dev'))
})

gulp.task('browser-sync', function () {
  gulp.watch('assets/js/*.js', gulp.series('build-dev'))

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
