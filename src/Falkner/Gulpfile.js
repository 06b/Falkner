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

/**
 * Custom Properties - PostCSS plugin to transform W3C CSS Custom Properties for cascading variables
 */
var customProperties = require("postcss-custom-properties");
var fs = require("fs"); /* fs is a dependency of Custom Properties*/

/**
 * glob - Matches files using the patterns the shell uses.
 */
var glob = require('glob');

/**
 * q - A library for promises
 */
var Q = require('q');

/**
 * gulp-concat - Concatenates files
 */
var concat = require('gulp-concat');

/**
 * cssnano - a CSS modular minifier
 */
var cssnano = require('cssnano');

/**********************************************************************
 * Bundle Config
 */

var stylesheetBundle = [
    // Default Base
    'base/00-Normalize.css'
    , 'base/01-Base.css'
    , 'base/02-Typography.css'
    , 'base/03-List.css'
    , 'base/04-Forms.css'

    // Client Generic Rules
    , 'theme/theme.project.css'

    // Layout
    , 'layout/00-Layout.css'
    , 'layout/01-csswizardary-grids.css'

    // Objects
    , 'objects/*.css'

    // Vendor & Vendor Themes
    //, 'vendor/vendorsubfolder/vendor-theme.css'
    //, 'theme/vendor.project.css'

    // Components
    , 'components/*.css'
    , 'components/**/*.css'

    // WARNING: scope should be used sparingly - these should be used for a new styling context but may not necessarily cosmetic.
    // Scope can be open to abuse and lead to poor CSS if not used wisely. If you find yourself having to call a certain scope style in multiple locations
    // then it probably should be re-factored and moved outside of scope.
    // Normally what would be used in scope would be things that we don't have control over - such as if we were using some third party content management system
    // another case might be if we are needing to do certain styles that might be considered a 'one-off' or if it's a certain section of the site that needs to
    // be styled a certain way that for certain pages but the markup remains the same with the exception of the class that get's appended which would be used as the
    // scope hook.

    , 'scope/*.css'

    // Utilities

    //Uncomment when checking for potentially broken, malformed or legacy (X)HTML.
    // Note: Not all "errors" are created equally, so they are color coded to highlight severity. Green is "probably not a big problem",
    // yellow is "worth looking at" and red is "you really should fix this."

    //,'utilities/debug.css'

    , 'utilities/animations/*.css'

    // Strip-margin would conflict if moved below the 'aside' classes as it would now
    // override the aside rather than allowing the aside to be used after clearing the existing margin
    , 'utilities/overrides/strip-margin.css'
    , 'utilities/overrides/strip-border.css'
    , 'utilities/overrides/strip-padding.css'

    // Floats force a display of block so anything forcing display should come after it
    , 'utilities/overrides/floats.css'
    , 'utilities/overrides/force-display-visibility.css'
    , 'utilities/overrides/clearfix.css'

    // Alignments depends on the display type (and stripping margin may conflict with it)
    , 'utilities/overrides/align.css'

    // Aside uses margin so it would need to come after the strip-margin classes to work.
    , 'utilities/overrides/aside.css'

    // Flex utilities shouldn't be overridden by a force display
    , 'utilities/overrides/flex-utilities.css'

    // Overflow could conflict with Text-decoration on `u-text-ellipsis`
    , 'utilities/overrides/overflow.css'

    , 'utilities/overrides/cursor.css'
    , 'utilities/overrides/height.css'
    , 'utilities/overrides/line-height.css'
    , 'utilities/overrides/width.css'

    , 'utilities/overrides/font-size.css'
    , 'utilities/overrides/font-weight.css'
    , 'utilities/overrides/text-alignment.css'

    // Text decoration `u-text-ellipsis` (overflow) shouldn't be allow to be overridden as it will break
    , 'utilities/overrides/text-decoration.css'
    , 'utilities/overrides/text-transform.css'

    , 'utilities/overrides/position.css'
    , 'utilities/overrides/depth.css'
    , 'utilities/overrides/links.css'
    , 'utilities/overrides/box-sizing.css'
    , 'utilities/shame.css'
    , 'utilities/print.css'
]

/*
 * End Bundle Config
 *********************************************************************/

gulp.task('default', function () {

    console.log('You are running Node Version: ' + process.version);

});

gulp.task('production:Optimization', ['production:Polyfilling-custom-properties'], function () {

    console.log("TODO: Finish Production Optimization Build");

    var cssSrc = './Content/css/preparation/{base,components,components/**,layout,objects,scope,theme,utilities,utilities/**,vendor,vendor/**}/*.css';

    //TODO: Complete Polyfilling

    return gulp.src(cssSrc)
        .pipe(log("Starting PostCSS"))
        .pipe(log(" - Optimization - Discard Duplicates: Discard duplicate rules in your CSS files."))
        .pipe(log(" - Optimization - Ordered Values: Ensure values are ordered consistently in your CSS."))
        .pipe(postcss([
            discardDuplicates(),
            orderedValues()
        ]))
        .pipe(log("Ending PostCSS"))
        .pipe(log("Starting CSSComb - sorting CSS Properties within each selector declaration"))
        .pipe(csscomb())
        .pipe(log("Ending CSSComb"))
        .pipe(gulp.dest('./Content/css/dist/'))

    //TODO: Minification

});


gulp.task('production:Polyfilling-custom-properties', ['production:Prepare-custom-properties'], function () {

    console.log("Polyfilling - Custom Properties: Since Css Variables (Css Properties) are supported in Firefox, Chrome & Safari." +
        " Use a polyfill (customProperties) to get it rendered for IE & Edge");

    var cssSrc = './Content/css/src/{base,components,components/**,layout,objects,scope,theme,utilities,utilities/**,vendor,vendor/**}/*.css';

    var projectSettings = './Content/css/preparation/_settings/project.css';

    var promises = []; // Used for looping through each file within _settings

    //Iterating over the files
    //Original logic based off of the following - http://stackoverflow.com/a/22159951
    glob.sync(cssSrc).forEach(function (filePath) {

        var polyfillStylesheets = []

        polyfillStylesheets.push(projectSettings);
        polyfillStylesheets.push(filePath);

            if (fs.statSync(polyfillStylesheets[1]).isFile()){

            var defer = Q.defer();
            var pipeline = gulp.src(polyfillStylesheets)
                .pipe(concat(polyfillStylesheets[1].replace("./Content/css/src/", "")))
                .pipe(postcss([customProperties]))
                .pipe(gulp.dest('./Content/css/preparation/'));

            pipeline.on('end', function () {
                defer.resolve();
            });
            promises.push(defer.promise);
        }
    });

    return Q.all(promises);

});

gulp.task('production:Prepare-custom-properties', function () {

    console.log('Deleting Old Preparation Folder');
    del(['./Content/css/preparation']);

    console.log("Since the custom properties get's concatenated with each stylesheet during polyfilling " +
        " strip out the comments to avoid it being added to each stylesheet.");

    return gulp.src('./Content/css/src/_settings/project.css')
        .pipe(log("Starting Minification on project settings"))
        // cssnano also does what orderValues does
        .pipe(postcss([
            cssnano({
                safe: true,
                discardComments: {
                    removeAll: true
                },
                normalizeCharset: true,
            }),
        ]))
        .pipe(log("Project Settings Minification Complete"))
        .pipe(gulp.dest('./Content/css/preparation/_settings/'));

});

gulp.task('dev:stylelint', function ()
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
            '!./Content/css/src/vendor/**/*.css',
            '!./Content/css/src/utilities/debug.css',
            '!./Content/css/src/base/00-Normalize.css']
        //, '!./Content/css/src/_settings/**/*.css']
  )
  .pipe(postcss(processors));
});

gulp.task('dev:parker', function () {

    del(['./report.md']);

    return gulp.src(
        // Stylesheet source:
        ['./Content/css/src/**/*.css',
            // Ignore linting vendor assets:
            '!./Content/css/src/vendor/**/*.css',
            '!./Content/css/src/utilities/debug.css',
            '!./Content/css/src/base/00-Normalize.css']
    )
        .pipe(parker({
            file: 'report.md'
        }))
        .pipe(log("Markdown File (report.md) is located at the root of the Solution"));
});

gulp.task('dev:normalize-css-styles', function () {

    del(['./Content/css/normalized']);

    var cssSrc = ['./Content/css/src/{base,components,components/**,layout,objects,scope,theme,utilities,utilities/**,vendor,vendor/**}/*.css',
        // Ignore Normalizing third party assets
        '!./Content/css/src/vendor/**/*.css',
        '!./Content/css/src/utilities/debug.css',
        '!./Content/css/src/base/00-Normalize.css'
    ];

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