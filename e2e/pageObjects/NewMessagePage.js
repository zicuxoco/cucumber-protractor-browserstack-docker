let utils = require('./PageObjectUtils');

module.exports = (function () {
    return {
        get: function (path, param) {
            var self = this;

            path = path || 'search';
            return browser.get('#!/' + path).then(function () {
                return self.page();
            });
        },

        getPage: function () {
            let self = this;
            browser.waitForAngularEnabled(true)
            return browser.wait(protractor.until.elementLocated(by.css('div[data-ellipsis=search]')), 15000)
                .then(function () {
                    return self.page();
                });
        },

        /**
         *
         * @param waitForNgView parameter to tell protractor to wait for ngView to become available. This is useful when coming back to angular page from external site, e.g. back button
         * @returns {{finder: {doSearch: doSearch, destination: *, autocompleteOptions: autocompleteOptions, disambigiousOptions: disambigiousOptions, occupants: *, rooms: *, adults: *, children: *, errorLabels: *, findErrorLabel: findErrorLabel, startDate: *, endDate: *, searchButton: *}, exception: *, interstitial: *, header: header, feedback: *, footer: {bigFooter: *, mobileFooter: *}, datePicker: {dpWrapper: *, prevBtn: *, nextBtn: *, firstMonth: *, secondMonth: *}}}
         */
        page: function (waitForNgView) {

            // if true - wait for ngview to become available
            if (waitForNgView === true) {
                utils.waitForNgView();
            }

            let page = $('div[ng-view]');

            return {
                infoPage: page,
                ellipsisButton: page.element(by.xpath("//a[@href='/ellipsis/']")),
                startingTemplatePopUp: startingTemplatePopUp,
                userMenu: new UserMenu(page.element(by.xpath("//a[contains(.,'Ellipsis WashPost.')]"))),
                templatePage: new TemplatePage(page.$('#settings')),

                searchInput: searchInput,
                currentStories: currentStories,
                firstStory: currentStories.first(),
                createNewStoryButton: page.$("[ng-show='canCreateStory']"),
            };
        },
    }
})();