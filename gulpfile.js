// Include gulp
var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Compile Sass
gulp.task('sass', function() {
    return gulp.src('static/stylesheets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/stylesheets'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('static/js/*.js')
        .pipe(gulp.dest('static/js'))
        .pipe(rename('rock_paper_scissor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('static/js/*.js', ['scripts']);
    gulp.watch('static/stylesheets/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);