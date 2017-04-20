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
 * PostCSS Reporter - Log PostCSS messages in the console
 */
var reporter = require('postcss-reporter');

/**
 * Stylelint - Modern CSS linter
 */
var stylelint = require('stylelint');


gulp.task('default', function () {

    console.log('You are running Node Version: ' + process.version);

});

gulp.task('stylelint', function () {
    // Stylelint config rules
    var stylelintConfig = {
        "rules": {
            //Color Rules via http://stylelint.io/user-guide/rules/
            "color-no-invalid-hex": true,
            "color-hex-length": "short",
            "color-named": "never",
            "color-no-invalid-hex": true,
            //Font Family
            //"font-family-name-quotes": "always-where-recommended", // Doesn't appear to work as rules claim as of stylelint: "6.3.3"
            //"font-family-no-duplicate-names": true, // Undefined Rule as of as of stylelint: "6.3.3"
            //Font weight
            //"font-weight-notation": "named-where-possible", //TODO: Look into this more

            //Function
            //TODO: Finish Function List

            //Number
            //"number-leading-zero":"always", //Currently the impact to get rid of this is pretty large, but I can see where it's useful
            "number-no-trailing-zeros": true,

            //String
            "string-no-newline": true,
            "string-quotes": "double",

            //Length
            "number-zero-length-no-unit": true, // As of 6.6.0 this has been deprecated and is now - length-zero-no-unit

            //Unit
            "unit-no-unknown": true,
            "unit-case": "lower",

            //Value
            "value-no-vendor-prefix": true,
            "value-keyword-case": "lower",

            "value-list-comma-space-after": "always",
            "value-list-comma-space-before": "never",

            //Custom Properties
            "custom-property-no-outside-root": true,

            "shorthand-property-no-redundant-values": true,
            "property-case": "lower",

            //"property-no-unknown":true, // Undefined Rule as of as of stylelint: "6.3.3"
            //"property-no-vendor-prefix": true, //Currently the impact isn't huge but should be a todo in the future

            //TODO: Declaration
            //TODO: Declaration Block
            //TODO: Block
            //TODO: Selector
            //TODO: Selector List

            "root-no-standard-properties": true,

            "rule-non-nested-empty-line-before": ["always-multi-line", {
                "ignore": ["after-comment"]
            }],

            //TODO: Media Feature
            //TODO: Custom Media
            //TODO: Media query list
            //TODO: At-rule

            "stylelint-disable-reason": "always-before",

            //TODO: Comments
            //TODO: General / Sheet
            "max-empty-lines": 2,
            //"max-line-length": 110, //This may or may not be an issue...
            "no-browser-hacks": true,
            //"no-descending-specificity": true, //Need to look into
            "no-duplicate-selectors": true,
            "no-eol-whitespace": true,
            "no-extra-semicolons": true,
            //"no-indistinguishable-colors": true, // Either Settings needs to be excluded or need to look into when this issue is taken care of: https://github.com/SlexAxton/css-colorguard/issues/49 - or attempt to disable around rules due to this issue
            "no-invalid-double-slash-comments": true,
            //"no-missing-end-of-source-newline": true, // Undefined Rule as of as of stylelint: "6.3.3"
            "no-unknown-animations": true,
            //TODO: Setup supported browser list for not only this rule but theme building - https://stylelint.io/user-guide/rules/no-unsupported-browser-features/
            //"no-unsupported-browser-features": true
        }
    }

    var processors = [
      stylelint(stylelintConfig),
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
    '!./Content/css/src/vendor/**/*.css', '!./Content/css/src/utilities/debug.css', '!./Content/css/src/utilities/deprecated.css', '!./Content/css/src/base/00-Normalize.css']//, '!./Content/css/src/_settings/**/*.css']
  )
  .pipe(postcss(processors));
});
