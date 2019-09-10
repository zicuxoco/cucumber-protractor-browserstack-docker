var browserstack = require('browserstack-local');

exports.config = {

    framework: 'custom',
    //directConnect: true,
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

    baseUrl: 'https://github.community/',

    specs: ['../features/*.feature'],


    'commonCapabilities': {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'ramirezramirez1',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'scqywDSsy3xLBbVA8Xno',
        'getPageTimeout': 40000,
        'allScriptsTimeout': 40000,
        'build': 'protractor-browserstack',
        'name': 'multibrowser_test',
        'browserstack.debug': 'true',
        //'browserName': 'Chrome',
        'shardTestFiles': false,
        //'restartBrowserBetweenTests': false
    },

    'multiCapabilities': [{
        'browserName': 'Chrome'
    },
        // {
        //   'browserName': 'Chrome'
        // },
        // {
        //     'browserName': 'Chrome'
        // },
        //   {
        //     'browserName': 'Chrome'
        // }
    ],

    cucumberOpts: {
        require: [
            '../step_definitions/support/*.js',
            '../step_definitions/hooks/*.js',
            '../step_definitions/*_steps.js'],
        format: 'pretty',
        tags: '@publish',
        keepAlive: true,
        skipStrictParameterCheck: true
    },

    ignoreUncaughtExceptions: true
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});