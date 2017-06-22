var gulp = require("gulp");
var babel = require("gulp-babel");
 
gulp.task("default", function () {
  return gulp.src("a.js")
    .pipe(babel())
    .pipe(gulp.dest("lib"));
});