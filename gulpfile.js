const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const rename = require("gulp-rename");

gulp.task('build', (done) => {
    pump([
        gulp.src('lib/*.js'),
        babel({ presets: ['es2015'] }),
        uglify(),
        gulp.dest('build'),
        rename('qsm.js'),
        gulp.dest('./')
    ], done);
});