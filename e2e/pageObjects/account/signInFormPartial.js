module.exports = function (el) {
    var util = require('../../step_definitions/utils/util');

    el.signInAsUser = function (testData) {
        var form = this;
        this.signInBtn.click().then(function () {
            browser.driver.sleep(2);
            form.email.clear().sendKeys(testData.LOGIN_INFO.EMAIL);
            form.pass.clear().sendKeys(testData.LOGIN_INFO.PASSWORD);
            form.doLogin.click();
        });
    };
    el.signInWithCredentials = function (email, password) {
        this.email.sendKeys(email);
        this.pass.sendKeys(password);
        this.doLogin.click();
    };
    el.email = element.all(by.id('login_field')).filter(function (elem) {
        return elem.isDisplayed();
    });
    el.pass = element.all(by.id('password')).filter(function (elem) {
        return elem.isDisplayed();
    });
    el.emailControl = util.getVisibleElement(el.all(by.css('input[name=username]')));
    el.passControl = util.getVisibleElement(el.all(by.css('input[name=password]')));
    //el.passwordToggleBtn = util.getVisibleElement(el.all(by.css('[data-bdd=sign-in-password-toggle] .password-toggle-icon')));
    el.signInBtn = element(by.css('[name="commit"]'));

    return el;
}