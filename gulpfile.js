const fs = require('fs');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const insert = require('gulp-insert');

gulp.task('build', ['clean'], (done) => {
    const fileContent = fs.readFileSync('lib/helper/module_exports.js', 'utf8');

    pump([
        gulp.src('lib/*.js'),
        concat('build.js'),
        insert.append(fileContent),
        babel({ presets: ['es2015'] }),
        gulp.dest('build'),
        uglify(),
        rename('qsm.js'),
        gulp.dest('./')
    ], (err) => {
        console.log(err);
    }, done);
});

gulp.task('clean', () => {  
  return gulp.src(['build', './qsm.js'], {read: false})
    .pipe(clean());
});