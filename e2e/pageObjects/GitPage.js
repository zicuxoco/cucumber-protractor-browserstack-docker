module.exports = (function () {
    var SignInForm = require('./account/signInFormPartial');

    var ACCOUNT_LOGIN_PAGE_SELECTOR = '.CommunityPage';

    return {
        get: function () {
            var self = this;
            browser.waitForAngularEnabled(false)
            return browser.get('/', 20000).then(function () {
                return self.page();
            });
        },

        getPage: function () {
            var self = this;
            browser.waitForAngularEnabled(true);
            return browser.wait(protractor.until.elementLocated(by.css(ACCOUNT_LOGIN_PAGE_SELECTOR)), 15000)
                .then(function () {
                    return self.page();
                });
        },

        page: function () {
            var page = element(by.css(ACCOUNT_LOGIN_PAGE_SELECTOR));

            return {
                signInButton: page.$('#loginPageV2'),
                signInForm: new SignInForm(page.element(by.css('[action="/session"]'))),
            }

        }
    };
})();