var beforeHooks = function () {
    this.Before(function (scenario, callback) {
        try {
            // clear cookies and local/session storages
            browser.executeScript('try { window.localStorage.clear(); window.sessionStorage.clear(); } catch(e){console.log(e);}');
            browser.driver.manage().deleteAllCookies();            
        } catch (e) {
            console.log('Before hook has failed with ', e);
        } finally {
            callback();
        }
     });

    this.Before(function (scenario, callback) {
        // set the default browser resolution
        //browser.driver.manage().window().setSize(1024, 768);
        callback();
    });
};

module.exports = beforeHooks;