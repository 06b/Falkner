/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

/**
 * PostCSS - Tool for transforming styles with JS plugins
 */
var postcss = require("gulp-postcss");

/**
 * PostCSS Ordered Values - Ensure values are ordered consistently in your CSS.
 */
var orderedValues = require('postcss-ordered-values');

/**
 * PostCSS Reporter - Log PostCSS messages in the console
 */
var reporter = require('postcss-reporter');

/**
 * Stylelint - Modern CSS linter
 */
var stylelint = require('stylelint');

/**
 * gulp-parker - Gulp plugin for parker, a stylesheet analysis tool.
 */
var parker = require('gulp-parker');

/**
 * del - Delete files/folders using globs
 */

var del = require('del');

/**
 * CSSComb - Sorts CSS Properties within each selector declaration in a predefined order to improve maintenance.
 */
var csscomb = require('gulp-csscomb');

/**
 * Gulp Log2 - Support for simple log statements in the gulp pipeline
 */
var log = require('gulp-log2');

/**
 * PostCSS Discard Duplicates - Discard duplicate rules in your CSS files with PostCSS.
 */
var discardDuplicates = require('postcss-discard-duplicates');


gulp.task('default', function () {

    console.log('You are running Node Version: ' + process.version);

});

gulp.task('stylelint', function ()
{

    var processors = [
      stylelint(),
      // Pretty reporting config
      reporter({
          clearAllMessages: true,
          throwError: false
      })
    ];

    return gulp.src(
    // Stylesheet source:
    ['./Content/css/src/**/*.css',
    // Ignore linting vendor assets:
    '!./Content/css/src/vendor/**/*.css', '!./Content/css/src/utilities/debug.css', '!./Content/css/src/base/00-Normalize.css']//, '!./Content/css/src/_settings/**/*.css']
  )
  .pipe(postcss(processors));
});

gulp.task('parker', function () {

    del(['./report.md'])

    return gulp.src(
        // Stylesheet source:
        ['./Content/css/src/**/*.css',
            // Ignore linting vendor assets:
            '!./Content/css/src/vendor/**/*.css', '!./Content/css/src/utilities/debug.css', '!./Content/css/src/base/00-Normalize.css']
    )
        .pipe(parker({
            file: 'report.md'
        }))
        .pipe(log("Markdown File (report.md) is located at the root of the Solution"));
});

gulp.task('normalize-css-styles', function () {
    var cssSrc = './Content/css/src/{base,components,components/**,layout,objects,scope,theme,utilities,utilities/**,vendor,vendor/**}/*.css';
    console.log('Running CSSComb - sorting CSS Properties within each selector declaration');

    return gulp.src(cssSrc)
        .pipe(log("Starting PostCSS"))
        .pipe(postcss([
            discardDuplicates(),
            orderedValues()
        ]))
        .pipe(log("Ending PostCSS"))
        .pipe(log("Starting CSSComb - sorting CSS Properties within each selector declaration"))
        .pipe(csscomb())
        .pipe(log("Ending CSSComb"))
        .pipe(gulp.dest('./Content/css/normalized'))
        .pipe(log("CSS Normalization is complete, compare changes in src against normalized"));
});