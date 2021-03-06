// Karma configuration
// Generated on Sat May 21 2016 15:04:20 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'app/**/*.spec.ts',
      'typings/browser.d.ts',
      {pattern: 'www/build/**/*.html', included: false},
    ],


    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        ['browserify-istanbul', {
          instrumenter: require('isparta'),
          ignore: ['**/*.spec.ts','**/*.d.ts'],
        }]
      ],
      plugin: [
        ['tsify']
      ]
    },

    // options on how to report coverage:
    coverageReporter: {
      reporters: [
        {type: 'text'},
        {type: 'lcov', dir: 'coverage', subdir: '.'}
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    client : {
      captureConsole: true
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    proxies: {
      '/build': '/base/www/build'
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
