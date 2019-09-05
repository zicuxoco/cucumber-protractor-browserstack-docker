module.exports = (function () {
    function getUrl() {
        return browser.getCurrentUrl().then(function (url) {
            browser.currentUrl = url;
            browser.currentPath = '#!' + url.split('#!')[1];
            return browser.currentPath;
        });
    }

    var scrollIntoView = function (element, alignToTop) {
        alignToTop = alignToTop || false;
        element.scrollIntoView(alignToTop);
    };
    return {
        clearField: function (field) {
            return field
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'))
                .then(function () {
                    return field.sendKeys(protractor.Key.BACK_SPACE);
                })
                .then(function () {
                    return field.clear();
                });
        },
        waitForNgView: function () {
            browser.driver.wait(function () {
                return element(by.css('div[ng-view]')).isPresent();
            });
        },

        scrollIntoView: function (element, alignToTop) {
            return browser.executeScript(scrollIntoView, browser.findElement(by.css(element)), alignToTop);
        },
        scrollIntoViewFromElement: function (element, alignToTop) {
            return browser.executeScript(scrollIntoView, element, alignToTop);
        },
        get: function (path) {
            if (!browser.currentPath || browser.currentPath !== path) {
                return browser.get(path).then(function () {
                    getUrl();
                });
            }
            return null;
        },
        reload: function (path) {
            delete browser.currentPath;
            return this.get(path);
        },
        setParams: function (params) {
            browser.getCurrentUrl().then(function (url) {
                return (url.toString().indexOf('?') > -1) ?
                    browser.get(url + '&' + params) :
                    browser.get(url + '?' + params);
            });
        },
        isElementHasOneOfClassesFromList: function (elementClasses, classList) {
            var elementClassesArray = elementClasses.split(' ');
            return classList.some(function (className) {
                return elementClassesArray.indexOf(className) !== -1;
            });
        },
        closeWindows: function () {
            browser.getAllWindowHandles().then(function (handles) {
                var i;
                for (; i < handles.length; i++) {
                    browser.switchTo().window(handles[i]);
                    browser.driver.close();
                }
                return;
            });
        },

        checkUncheckBox: (checkboxElement) => {

        },

        getUrl: getUrl
    };
})();
