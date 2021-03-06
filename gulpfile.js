// Include gulp
var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require("gulp-minify-css");


// Compile Sass and minify
gulp.task('sass', function() {
    return gulp.src('static/stylesheets/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('static/stylesheets'));
});

// Concatenate & Uglify JS
gulp.task('scripts', function() {
    return gulp.src(['static/js/timer_module.js', 'static/js/rps_module.js'])
        .pipe(concat('rps.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('static/js/*.js', ['scripts']);
    gulp.watch('static/stylesheets/scss/*.scss', ['sass']);
});

//Copy files to dist
gulp.task('copy', function() {
    return gulp.src(['static/*.html', 'static/js/*.min.js', 'static/js/lib/*.min.js', 'static/stylesheets/*.css'])
                .pipe(gulp.dest('dist'));
});

//Copy images to dist
gulp.task('copy-images', function() {
    return gulp.src('static/images/*')
        .pipe(gulp.dest('dist/images'));
});

// Default Task
gulp.task('dev', ['sass', 'scripts', 'watch']);
gulp.task('prod', ['sass', 'scripts', 'copy', 'copy-images']);
