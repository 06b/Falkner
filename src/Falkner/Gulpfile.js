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
            //"color-hex-case": "lower", //TBD
            "color-hex-length": "short",
            "color-named": "never",
            "color-no-invalid-hex": true,

            //Font Family
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,

            //Font weight
            "font-weight-notation": "named-where-possible", //TODO: Look into this more

            //Function
            "function-calc-no-unspaced-operator": true,
            "function-linear-gradient-no-nonstandard-direction": true,
            "function-max-empty-lines": 0,
            "function-name-case": "lower",
            "function-parentheses-newline-inside": "always-multi-line",
            "function-parentheses-space-inside": "never",
            "function-url-data-uris": "never",
            "function-url-no-scheme-relative": true,
            "function-url-quotes": ["always", {
                "except": ["empty"]
            }],
            "function-whitespace-after": "always",

            //Number
            "number-leading-zero":"always",
            "number-no-trailing-zeros": true,

            //String
            "string-no-newline": true,
            "string-quotes": "double",

            //Length
            "length-zero-no-unit": true,

            //Time
            "time-min-milliseconds": 100, //According to the notes to the original issue (https://github.com/stylelint/stylelint/issues/597#issuecomment-180872504) the human eye can't see transition times under 100ms. //TODO: More resources maybe recommended to confirm.

            //Unit
            "unit-no-unknown": true,
            "unit-case": "lower",

            //Value
            "value-no-vendor-prefix": true,
            "value-keyword-case": "lower",

            //Value list
            "value-list-comma-newline-after": "always-multi-line",
            "value-list-comma-newline-before": "always-multi-line",
            "value-list-comma-space-after": "always",
            "value-list-comma-space-before": "never",
            "value-list-max-empty-lines": 0,

            //Custom Properties
            //"custom-property-no-outside-root": true, //TODO: Deprecated as of 7.8.0 - a stylelint plugin may exist in it's place

            //Shorthand property
            "shorthand-property-no-redundant-values": true,

            //Property
            "property-case": "lower",
            "property-no-unknown":true,
            //"property-no-vendor-prefix": true, //Currently the impact isn't huge but should be a todo in the future

            //Keyframe declaration
            "keyframe-declaration-no-important": true,

            //Declaration
            "declaration-bang-space-after": "never",
            "declaration-bang-space-before": "always",
            //"declaration-colon-space-after": "always-single-line", //Currently the impact isn't huge but should be a todo in the future
            "declaration-colon-space-before": "never",
            "declaration-empty-line-before": "never",
            //"declaration-no-important": true, //Only use when checking if !important is being used - note that !important is acceptable in utilities

            //TODO: Declaration Block
            "declaration-block-no-duplicate-properties": [true, {
                "ignore": ["consecutive-duplicates-with-different-values"]
            }],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-semicolon-newline-after": "always-multi-line",
            "declaration-block-semicolon-newline-before": "never-multi-line",
            "declaration-block-semicolon-space-after": "always-single-line",
            "declaration-block-semicolon-space-before": "never",
            "declaration-block-trailing-semicolon": "always",
            //Block
            "block-closing-brace-empty-line-before": "never", //False Positives in nested rules - look into following feature request https://github.com/stylelint/stylelint/issues/2090
            "block-closing-brace-newline-after": "always",
            "block-closing-brace-newline-before": "always-multi-line",
            //"block-closing-brace-space-before": "always", //Currently the impact to get rid of this is pretty large, but I can see where it's useful. TODO: need to look into more
            "block-opening-brace-newline-after": "always-multi-line",
            //"block-opening-brace-space-after": "always", //Currently the impact to get rid of this is pretty large, but I can see where it's useful. TODO: need to look into more
            "block-opening-brace-space-before": "always",
            //TODO: Selector
            "selector-attribute-brackets-space-inside": "never",
            "selector-attribute-operator-space-after": "never",
            "selector-attribute-operator-space-before": "never",
            "selector-combinator-space-after": "always",
            "selector-combinator-space-before": "always",
            "selector-descendant-combinator-no-non-space": true,
            "selector-max-compound-selectors": 3,
            //"selector-max-specificity": "0,2,1", // Set to what works for you - https://stylelint.io/user-guide/rules/selector-max-specificity/
            "selector-no-id": true,
            "selector-no-universal": true,
            "selector-no-vendor-prefix": true,
            "selector-pseudo-class-case": "lower",
            "selector-pseudo-class-no-unknown": true,
            "selector-pseudo-class-parentheses-space-inside": "never",
            "selector-pseudo-element-case": "lower",
            "selector-pseudo-element-no-unknown": true,
            "selector-type-case": "lower",
            "selector-type-no-unknown": true,
            "selector-max-empty-lines":0,
            //Selector List
            "selector-list-comma-newline-after": "always-multi-line",
            "selector-list-comma-newline-before": "never-multi-line",


            //"root-no-standard-properties": true, //Deprecated as of 7.8.0 - a stylelint plugin may exist in it's place

            "rule-empty-line-before": ["always-multi-line", {
                "ignore": ["after-comment","inside-block"]
            }],

            //TODO: Root rule
            //TODO: Rule
            //TODO: Media Feature
            "media-feature-name-case": "lower",
            "media-feature-name-no-unknown": true,
            //TODO: Custom Media
            //Media query list
            "media-query-list-comma-newline-after": "always-multi-line",
            "media-query-list-comma-newline-before": "never-multi-line",
            "media-query-list-comma-space-after": "always-single-line",
            "media-query-list-comma-space-before": "never-single-line",

            //At-rule
            //"at-rule-empty-line-before": "always",
            "at-rule-name-case": "lower",
            //"at-rule-name-newline-after": "always", // Undefined Rule as of as of stylelint: "6.3.3"
            "at-rule-name-space-after": "always",
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-semicolon-newline-after": "always",

            //stylelint-disable comment
            //"stylelint-disable-reason": "always-before", //Deprecated as of 7.8.0 - a stylelint plugin may exist in it's place

            //Comments
            "comment-no-empty": true,

            //TODO: General / Sheet
            "max-empty-lines": 2,
            //"max-line-length": [110, {
            //    "ignore": ["comments"]
            // }], //This may or may not be an issue...
            //"no-browser-hacks": true, //Deprecated as of 7.8.0 - a stylelint plugin may exist in it's place - See: stylelint-no-browser-hacks: https://stylelint.io/user-guide/plugins/
            //"no-descending-specificity": true, //Need to look into
            "no-duplicate-selectors": true,
            "no-eol-whitespace": true,
            "no-extra-semicolons": true,
            //"no-indistinguishable-colors": true, // Either Settings needs to be excluded or need to look into when this issue is taken care of: https://github.com/SlexAxton/css-colorguard/issues/49 - or attempt to disable around rules due to this issue - Deprecated
            "no-invalid-double-slash-comments": true,
            "no-missing-end-of-source-newline": true,
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
