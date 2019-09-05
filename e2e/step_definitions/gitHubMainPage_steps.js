var stepDefs = function () {

    let expect = require('chai').use(require('chai-as-promised')).expect;
    let gitMain = require('../pageObjects/GitMainPage');

    let utils = require('../pageObjects/PageObjectUtils');

    let page;

    let EC = protractor.ExpectedConditions;

    this.Given(/^I see GitHub Main Page$/, () => {
        return gitMain.getPage().then( function (gitPage) {
            page = gitPage;
            return page;
        });
    });

    this.Then(/^I click in a random Conversations topic$/, () => {
        return page.topicList.count().then ( numberItems => {
            return Math.floor(Math.random() * numberItems) + 1;
        }).then(random => {
            page.topicList.get(random).click().then(() => {
                browser.sleep(3000);
            })
        });
    });

    this.Then(/^I click in Welcome topic$/, () => {
        return page.topicList.get(1).click().then(() => {
            return browser.wait(EC.elementToBeClickable(page.startTopicButton));
        });
    });

    this.Then(/^I click Start a topic button$/, () => {
        return page.startTopicButton.click();
    });

    this.Then(/^I type Subject: "(.*)"$/, subject => {
        return page.subjectInput.clear().sendKeys(subject, protractor.Key.ESCAPE);
    });

    this.Then(/^I type a Body Message: "(.*)"$/, body => {
        return utils.scrollIntoView(page.bodyInput, true).then(() => {
            return page.bodyInput.sendKeys(body);
        });
    });

    this.Then(/^I click Post button$/, () => {
        return page.postButton.click();
    });

    this.Then(/^I validate "(.*)" title is displayed$/, message => {
        return expect(page.h1Text.getText(),
            "Message is not displayed").to.eventually.equal(message);
    });
};
module.exports = stepDefs;