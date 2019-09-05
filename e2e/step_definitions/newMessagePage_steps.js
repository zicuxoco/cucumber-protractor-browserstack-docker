var stepDefs = function () {

    let expect = require('chai').use(require('chai-as-promised')).expect;
    let homePage = require('../pageObjects/NewMessagePage');
    let utils = require('../pageObjects/PageObjectUtils');

    let page;

    let EC = protractor.ExpectedConditions;

    this.Given(/^I see New Message window$/, function () {
        return homePage.get().then(function (homePage) {
            page = homePage;
            return page;
        });
    });






};
module.exports = stepDefs;