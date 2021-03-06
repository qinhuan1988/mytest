// Karma configuration
// Generated on Tue Mar 07 2017 11:47:43 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
        'node_modules/ionic-angular/release/js/ionic.bundle.js',
        'node_modules/angular-mocks/angular-mocks.js',

        // load modules here
        // in order to avoid wrong order errors
        'app/js/modules/dealers/dealers.js',

        // includes both .js and .test.js
        'app/js/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        // we don't want to include third party libs into the coverage report
        'app/js/libs/**/*.js',
        'app/js/translations/server.response.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // 'require' function is not available to browser
        // needs to be browserified
        'app/js/main.js': ['browserify'],
        'app/js/config.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
        'coverage',
        'mocha'
    ],


    coverageReporter: {
        dir: 'coverage/',
        subdir: '.',
        reporters: [
            { type: 'text-summary' },
            { type: 'lcov' },
            { type: 'cobertura' }
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
