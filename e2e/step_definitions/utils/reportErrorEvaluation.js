module.exports = function reportErrorEvaluation() {

    const fs = require('fs');
    const PATH = require('path');
    const REPORTS_DIR = PATH.join(__dirname, '../../reports/');
    const messageConfig = require('./reportVariables');
    console.log('messageConfig', messageConfig);

    let rawData = fs.readFileSync(PATH.join(REPORTS_DIR, 'latest/report.json'));
    let reportJson = JSON.parse(rawData);
    let stepsModel = reportJson[0].elements[0].steps;

    const IS_REPORT_FAILED = function () {
        return checkIsFailedReport(stepsModel, 'failed');
    };
    /**
     *
     * @constructor
     * @IS_TIMED_OUT_ERROR constant with three states true = is a timeouted error false = is not a timedout error undefined = no error_message object in report.js
     */
    const IS_TIMED_OUT_ERROR = function () {
        if (IS_REPORT_FAILED()) {
            return checkIsTimedOutError(stepsModel, 'function timed out after' || stepsModel, 'Wait timed out after');
        }
    };

    function checkIsFailedReport(arr, val) {
        return arr.some(function (arrVal) {
            return val === arrVal.result.status;
        });
    };

    function checkIsTimedOutError(arr, val) {
        return arr.some(function (arrVal) {
            if (arrVal.result.error_message !== undefined) {
                let errorMessageJson = arrVal.result.error_message;
                let errorMessageSubString = val;

                return errorMessageJson.includes(errorMessageSubString);
            }
        });
    }

    if (IS_REPORT_FAILED() === true) {
        console.log("Changing status variables...");
        messageConfig.MESSAGE_CONFIG.PRETEXT = 'One or more e2e TC are failed';
        messageConfig.MESSAGE_CONFIG.STATUS_COLOR = 'danger';
        messageConfig.MESSAGE_CONFIG.TEXT_MESSAGE = "Please see the stacktrace for more information"

    }

    if (IS_TIMED_OUT_ERROR() === true) {
        console.log("MY TESTS ZICURYYYYYY!!!!")
        messageConfig.MESSAGE_CONFIG.PRETEXT = 'Timeout error';
        messageConfig.MESSAGE_CONFIG.STATUS_COLOR = 'warning';
        messageConfig.MESSAGE_CONFIG.TEXT_MESSAGE = "One or more tests are failed by TimeOut issues and should be fixed by third party"
    }

    console.log('IS_REPORT_FAILED', IS_REPORT_FAILED());
    console.log('IS_TIMED_OUT_ERROR', IS_TIMED_OUT_ERROR());

};