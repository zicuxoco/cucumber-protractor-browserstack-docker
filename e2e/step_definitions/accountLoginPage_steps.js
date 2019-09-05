var AccountLoginPage = require('../pageObjects/GitPage');

var myStepDefinitionsWrapper = function () {
    var page;
    var expect = require('chai').use(require('chai-as-promised')).expect;


    this.Given(/^I go to the account login page$/, function () {
        return AccountLoginPage.get().then(function (accountLogin) {
            page = accountLogin;
            return accountLogin;
        });
    });    

    this.Then(/^I fill sign in form with the username (.*) and password (.*) on account login page$/, function (email, pass) {
        return page.signIn.email.sendKeys(email).then(function () {
            return page.signIn.pass.sendKeys(pass);
        });
    });

    
};
module.exports = myStepDefinitionsWrapper;