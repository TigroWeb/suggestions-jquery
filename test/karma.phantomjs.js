module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jquery-1.9.1', 'jasmine-jquery', 'jasmine', 'jasmine-sinon'],
        files: [
            '../node_modules/babel-polyfill/dist/polyfill.js',
            { pattern: '../src/includes/*.js', included: false },
            '../dist/js/jquery.suggestions.js',
            '../dist/css/*.css',
            'helpers/helpers.js',
            'specs/*.js',
        ],

        preprocessors: {
            '../test/specs/*_spec.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                require('rollup-plugin-buble')(),
            ],
            format: 'iife',
            moduleName: 'suggestions',
            sourceMap: 'inline',
        },
    });
};