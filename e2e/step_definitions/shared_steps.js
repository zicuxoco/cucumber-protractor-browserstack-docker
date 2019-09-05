var stepDefs = function () {
    var pageBase = require('../pageObjects/shared');
    var expect = require('chai').use(require('chai-as-promised')).expect;
    var utils = require('../pageObjects/PageObjectUtils');
    var util = require('./utils/util');
    var EC = protractor.ExpectedConditions;


    this.Given(/^browser cache is empty$/, function () {
        return browser.manage().deleteAllCookies();
        //return browser.executeScript('try { window.localStorage.clear(); window.sessionStorage.clear(); } catch(e){console.log(e);}');
    });

    this.Given(/^cookies are cleared$/, function () {
        return browser.driver.manage().deleteAllCookies();
    });

    this.Given(/^User is a desktop user$/, function () {
        return browser.driver.manage().window().setSize(1600, 968);
    });

    this.Given(/^User is a laptop user$/, function () {
        return browser.driver.manage().window().setSize(992, 968);
    });

    this.Given(/^User is a tablet user$/, function () {
        return browser.driver.manage().window().setSize(800, 968); // >= 768 && <= 991 width is of tablet
    });

    this.Given(/^User is a mobile user$/, function () {
        return browser.driver.manage().window().setSize(600, 968); // <= 767 width is of mobile
    });

    this.When(/^I select (.*) in currency selector$/, function (currencyCode) {
        var page = pageBase();
        return page.header.searchItems(currencyCode);
    });

    this.Then(/^I see (.*) is selected in currency dropbox$/, function (currencyCode) {
        var page = pageBase();
        return expect(page.header.title.getText()).to.eventually.equal(currencyCode);
    });

    this.Given(/^I set params (.*)$/, function (params) {
        return utils.setParams(params);
    });

    this.Then(/^the current url contains (.*)$/, function (urlPart) {
        return expect(browser.getCurrentUrl()).to.eventually.contain(urlPart);
    });

    this.Then(/^the current outer url contains (.*)$/, function (urlPart) {
        // Since we are going to non-Angular page we need to disable synchronization
        // to not get an error 'angular could not be found on the window'
        browser.ignoreSynchronization = true;
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (actualUrl) {
                return actualUrl.indexOf(urlPart) !== -1;
            });
        }, 5000)
            .then(function () {
                browser.ignoreSynchronization = false;
            });
    });

    this.Then(/^I refresh current URL$/, function () {
        return browser.driver.navigate().refresh();
    });

    this.Then(/^I enter (.*) in field with id (.*) and save value in the local storage$/, function (param, inputId) {
        var paramName;
        var paramValue;

        switch (param) {
            case 'random email':
                paramValue = util.generateEmail();
                paramName = 'usrRndEmail';
                break;
            case 'random phone':
                paramValue = util.generatePhone();
                paramName = 'usrRndPhone';
                break;
            default:
                throw new Error('Not implemented for ' + param + ' with id ' + inputId);
        }

        browser.executeScript('window.localStorage.setItem("' + paramName + '", "' + paramValue + '");');
        return element(by.id(inputId)).click().clear().sendKeys(paramValue);
    });

    this.Given(/^Value of (.*) corresponds to the value saved in the local storage$/, function (param) {
        var paramName;
        var elemValue;

        switch (param) {
            case 'account email':
                paramName = 'usrRndEmail';
                elemValue = require('../pageObjects/AccountMyInfoPage').getPage().then(function (infoPage) {
                    return infoPage.emailUpdatePanel.email.getText();
                });
                break;
            case 'app phone':
                paramName = 'usrRndPhone';
                elemValue = require('../pageObjects/HotelConfirmPage').getPage().then(function (confirmPage) {
                    return confirmPage.sidePanel.appDownload.phone.getAttribute('value');
                });
                break;
            default:
                throw new Error('Not implemented for ' + param);
        }

        return browser.executeScript('return window.localStorage.getItem("' + paramName + '");').then(function (savedValue) {
            return expect(elemValue).to.eventually.equal(savedValue);
        });
    });

    this.Then(/^I close all browsers windows$/, function () {
        return utils.closeWindows();
    });

    this.Given(/^I clean browser cache data$/, function () {
        return browser.restart();
    });
};
module.exports = stepDefs;