let fs = require('fs');
let path = require('path');

let SlackUpload = require('node-slack-upload');

let reporter = require('cucumber-html-reporter');

let Slack = require('slack-node');

let reportErrorEvaluation = require('../utils/reportErrorEvaluation');

/**
 * Global variables to manage the slack messages
 * the variables should be change if some of the evaluations
 * are incorrect
 * @STATUS_COLOR can be set good - green; failed - red or orange - preventive
 */
const messageConfig = require('./reportVariables');
    /**
 * Creates a HTML report based in Cucumber Json
 * @param
 */
try {
    let options = {
        theme: 'bootstrap',
        jsonFile: path.join('e2e/reports/latest/report.json'),
        output: path.join('e2e/reports/latest/report.html'),
        reportSuiteAsScenarios: true,
        //launchReport: true,
        // metadata: {
        //     "App Version":"0.3.2",
        //     "Test Environment": "SANDBOX.STAGING",
        //     "Browser": "Chrome  54.0.2840.98",
        //     "Platform": "Windows 10",
        //     "Parallel": "Scenarios",
        //     "Executed": "Remote"
        // }
    };

    console.log('Parsing JSON to HTML report...');
    reporter.generate(options);
} catch (e) {
    console.log("Report generation is not possible with the following message:", e);
}

/**
 * Evaluates if the tests are failed by time out exception and discard it
 */
reportErrorEvaluation();

/**
 * Create Slack Alert
 * @param
 */
try {
    //TODO: call the url from document or file
    let webHookUri = "https://hooks.slack.com/services/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";

    // set slack web hook
    let slack = new Slack();
    slack.setWebhook(webHookUri);

    //Sending custom message
    slack.webhook({
        //channel: "#ellipsis-e2e-results",
        // username: "webhookbot",
        text: messageConfig.MESSAGE_CONFIG.TEXT_MESSAGE,
        attachments: [
            {
                //fallback: "New execution",
                pretext: messageConfig.MESSAGE_CONFIG.PRETEXT,
                color: messageConfig.MESSAGE_CONFIG.STATUS_COLOR,
                fields: [
                    {
                        title: "Ellipsis E2e tests Report",
                        value: "Test results",
                        short: false
                    }
                ]
            }
        ]
    }, function (err, response) {
        console.log(response);
    });

} catch (e) {
    console.log("Was not possible create the alert", e);
}

/**
 * Upload HTML file to E2e channel
 */
try {

    // TODO: quit hard code
    let slackUpload = new SlackUpload('xoxb-270698962583-yPD7mxeqrjOSCNZEZe5pbqmQ');

    slackUpload.uploadFile({
        file: fs.createReadStream(path.join('e2e/reports/latest/report.html')),
        fileType: 'post',
        title: 'E2e report',
        initialComment: 'Please review the attached HTML report',
        channels: 'ellipsis-e2e-results'
    }, function (err, data) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Uploaded file details: ', data);
        }
    });


} catch (e) {
    console.log("Was not possible to publish the HTML report", e)
}