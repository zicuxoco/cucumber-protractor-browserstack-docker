module.exports = (function () {
    var SignInForm = require('./account/signInFormPartial');

    var MAIN_PAGE = '.CommunityPage';

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
            return browser.wait(protractor.until.elementLocated(by.css(MAIN_PAGE)), 15000)
                .then(function () {
                    return self.page();
                });
        },

        page: function () {
            var page = element(by.css(MAIN_PAGE));

            return {
                topicList: page.$$('h2.board-title'),
                startTopicButton: $('#link_10'),
                subjectInput: $('[title="Subject"]'),
                bodyInput: $('p'),
                postButton: $('#submitContext_1'),
                h1Text: $('h1'),
            }
        }
    };
})();