exports.config = {
    framework: 'custom',
    directConnect: true,
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    skipStrictParameterCheck: true,

    //TODO: this line is only for testing porpoises and should not be committed
    //baseUrl: 'https://localhost',

    baseUrl: 'https://github.community/',

    capabilities: {
        allScriptsTimeout: 40000,
        getPageTimeout: 40000,
        browserName: 'chrome',
        maxInstances: 1,
        shardTestFiles: true,
        restartBrowserBetweenTests: true
    },

    onPrepare: function () {
        browser.addMockModule('disableNgAnimate', function () {
            angular.module('disableNgAnimate', []).run(['$animate', function ($animate) {
                $animate.enabled(false);
            }]);
        });
    },

    specs: ['../features/*.feature'],

    cucumberOpts: {
        require: [
            '../step_definitions/support/*.js',
            '../step_definitions/hooks/*.js',
            '../step_definitions/*_steps.js'],


        format: 'pretty',
        keepAlive: false,
        skipStrictParameterCheck: true,
        tags: '@publish',
        //tags: '@simpleStory'
    },
    allScriptsTimeout: 40000
}