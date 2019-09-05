let fs = require('fs');
let path = require('path');
let Cucumber = require('cucumber');

const REPORTS_DIR = path.join(__dirname, '../../reports/');
const SCREENSHOT_DIR = REPORTS_DIR + 'screenshots/';

let afterHooks = function () {

    function getFolderName() {
        let d = new Date();
        return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-') + '_' + [d.getHours(), d.getMinutes()].join(':');
    }
    const DIR=REPORTS_DIR+getFolderName()+'/';

    try {
        fs.mkdirSync(REPORTS_DIR);
    } catch(e) {
        //folder exists
    }

    try{
        fs.mkdirSync(REPORTS_DIR + 'latest/');
    } catch(e) {
        //folder exists
    }

    try{
        fs.mkdirSync(SCREENSHOT_DIR);
    } catch(e) {
        //folder exists
    }

    try{
        fs.mkdirSync(DIR);
    } catch(e) {
        //folder exists
    }


    let JsonFormatter = Cucumber.Listener.JsonFormatter();

    JsonFormatter.log = function (string) {
        console.log('Writing report to %s', DIR+'report.json');
        fs.writeFile(DIR+'report.json', string, function(err) { if(err) console.log(err); });
        fs.writeFile(REPORTS_DIR + 'latest/report.json', string, function(err) { if (err) console.log("SOMETHING ·WAS WRONG", err); else console.log("TODO BIEN SUERTUDO") });
    };

    this.registerListener(JsonFormatter);

    this.After(function (scenario, callback) {

        // TODO: uncomment when we are using local storage for data test
        // try {
        //     localStorage._deleteLocation();
        // } catch (e) {
        //     console.log(e);
        // }

        if (scenario.isFailed()) {
            console.log('\nScenario error debug info starts:');
            console.log(scenario.getException());
            console.log('Scenario error debug info finishes');

            browser.takeScreenshot().then(function(stream) {
                let name = new Date().getTime() +'.png';
                let decodedImage = new Buffer(stream, 'base64');
                fs.writeFile(SCREENSHOT_DIR + name, decodedImage, function(err) { console.log(err); });
                console.log('creating screenshot %s', path.join(SCREENSHOT_DIR, name));
                scenario.attach(decodedImage, 'image/png');

                callback();
            }, function (err) {
                callback(err);
            });
        }

        else {
            callback();
        }

    });
};


module.exports = afterHooks;