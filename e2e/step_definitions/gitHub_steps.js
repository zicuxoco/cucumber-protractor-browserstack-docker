var stepDefs = function () {

    let expect = require('chai').use(require('chai-as-promised')).expect;
    let gitMain = require('../pageObjects/GitPage');
    let loginPopup = require('../pageObjects/account/signInFormPartial')

    let page;

    let EC = protractor.ExpectedConditions;


    this.Given(/^I go to the GitHub Community main page$/, function () {
        return gitMain.get().then( function (gitPage) {
            page = gitPage;
            return page;
        });
    });

    this.Then(/^I click on sign in link button$/, () => {
       return page.signInButton.click();
    });

    this.Then(/^I see SignIn popop$/, () => {
        return page.signInForm.getPage().then( form => {
            page = form;
            return page;
        });
    });

    this.Then(/^I type Username: "(.*)" and Pass: "(.*)"$/, (user, pass) => {
        return page.signInForm.email.clear().sendKeys(user).then(() => {
            return page.signInForm.pass.clear().sendKeys(pass);
        });
    });

    this.Then(/^I click on sign in button$/, function () {
        return page.signInForm.signInBtn.click();
    });
};
module.exports = stepDefs;