module.exports = {

    formatDate: function (date) {
        var day = date.getDate(),
            month = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return month + '/' + day + '/' + date.getFullYear();
    },
    getCurrencySymbol: function (currency) {
        var Map = {
            'CHF': 'CHF',
            'AUD': 'AUD',
            'EUR': '\u20AC',
            'DKK': 'DKK',
            'CAD': 'CAD',
            'NOK': 'NOK',
            'SEK': 'SEK',
            'GBP': '\u00A3',
            'USD': '$',
            'NZD': 'NZD'
        };
        return Map[currency];
    },
    generateEmail: function () {
        var strValues = 'abcdefghijklmnopqrztuvwxyz1234567890';
        var strEmail = '';
        var strTmp;
        for (var i = 0; i < 10; i++) {
            strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
            strEmail = strEmail + strTmp;
        }
        strTmp = '';
        strEmail = strEmail + '@';
        for (var j = 0; j < 8; j++) {
            strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
            strEmail = strEmail + strTmp;
        }
        strEmail = strEmail + '.com'
        return strEmail;
    },
    generatePhone: function () {
        return Math.floor(10000000000 + Math.random() * 99999999999).toString().substring(0, 10);
    },
    setVT: function (vt) {
        browser.getCurrentUrl().then(function (url) {
            var adding = '&';
            if (url.indexOf('?') === -1) {
                adding = '?';
            }
            return browser.get(url + adding + vt);
        });
    },
    getVersionTestModification: function (vt) {
        return browser.executeScript('return window.hwDtm.versionTest.hwVT["' + vt + '"];');
    },
    setParams: function (origin, destination, start, end, dealHash, nid, vid, did, cid, rid, wid, xid, r, rs, carType, carVendor, dailyPrice) {
        var params = '';
        if (origin !== '') {
            params = (params === '') ? params + 'origin=' + origin : params + '&origin=' + origin;
        }
        if (destination !== '') {
            params = (params === '') ? params + 'destination=' + destination : params + '&destination=' + destination;
        }
        if (start !== '') {
            params = (params === '') ? params + 'start=' + start : params + '&start=' + start;
        }
        if (end !== '') {
            params = (params === '') ? params + 'end=' + end : params + '&end=' + end;
        }
        if (dealHash !== '') {
            params = (params === '') ? params + 'dealHash=' + dealHash : params + '&dealHash=' + dealHash;
        }
        if (nid !== '') {
            params = (params === '') ? params + 'nid=' + nid : params + '&nid=' + nid;
        }
        if (vid !== '') {
            params = (params === '') ? params + 'vid=' + vid : params + '&vid=' + vid;
        }
        if (did !== '') {
            params = (params === '') ? params + 'did=' + did : params + '&did=' + did;
        }
        if (cid !== '') {
            params = (params === '') ? params + 'cid=' + cid : params + '&cid=' + cid;
        }
        if (rid !== '') {
            params = (params === '') ? params + 'rid=' + rid : params + '&rid=' + rid;
        }
        if (wid !== '') {
            params = (params === '') ? params + 'wid=' + wid : params + '&wid=' + wid;
        }
        if (xid !== '') {
            params = (params === '') ? params + 'xid=' + xid : params + '&xid=' + xid;
        }
        if (r !== '') {
            params = (params === '') ? params + 'r=' + r : params + '&r=' + r;
        }
        if (rs !== '') {
            params = (params === '') ? params + 'rs=' + rs : params + '&rs=' + rs;
        }
        if (carType !== '') {
            params = (params === '') ? params + 'carType=' + carType : params + '&carType=' + carType;
        }
        if (carVendor !== '') {
            params = (params === '') ? params + 'carVendor=' + carVendor : params + '&carVendor=' + carVendor;
        }
        if (dailyPrice !== '') {
            params = (params === '') ? params + 'dailyPrice=' + dailyPrice : params + '&dailyPrice=' + dailyPrice;
        }

        return params;
    },

    addDaysHours: function (option, added) {
        var today;
        var day;
        var month;
        var hour;
        var amPm;
        switch (option) {
            case 'hours':
                today = new Date();
                today.setHours(today.getHours() + parseInt(added));
                day = today.getDate();
                month = today.getMonth() + 1;
                hour = today.getHours();
                if (day < 10) {
                    day = '0' + day;
                }

                if (month < 10) {
                    month = '0' + month;
                }

                amPm = (hour > 11) ? 'pm' : 'am';
                hour = (hour === 0) ? 12 : (hour > 12) ? hour - 12 : hour;

                return month + '/' + day + '/' + today.getFullYear() + '-' + hour + ':00 ' + amPm;
            case 'days':
                today = new Date(new Date().setDate(new Date().getDate() + parseInt(added)));
                day = today.getDate();
                month = today.getMonth() + 1;
                hour = today.getHours();

                if (day < 10) {
                    day = '0' + day;
                }

                if (month < 10) {
                    month = '0' + month;
                }

                amPm = (hour > 11) ? 'pm' : 'am';
                hour = (hour === 0) ? 12 : (hour > 12) ? hour - 12 : hour;

                return month + '/' + day + '/' + today.getFullYear() + '-' + hour + ':00 ' + amPm;
        }
    },

    todayFormatedPlusDays: function (added) {
        var date = this.addDaysHours('days', added);
        var splitCompleteDate = date.split('-');
        var splitDate = splitCompleteDate[0].split('/');
        return splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
    },

    getVisibleElement: function (elementList) {
        return elementList.filter(function (elem) {
            return elem.isDisplayed().then(function (displayedElement) {
                return displayedElement;
            });
        }).first();
    },

    getActiveVersionTests: function () {
        return browser.executeScript('return hwDtm.versionTest.hwVT').then(function (versionTests) {
            var versionTestsList = '';
            Object.keys(versionTests).forEach(function (versionTestName) {
                versionTestsList += ('vt.' + versionTestName + '=1&');
            });
            return versionTestsList;
        });
    },

    getSearchString: function (searchCriteria) {
        var params = [];
        for (var param in searchCriteria) {
            if (searchCriteria[param] && searchCriteria[param] !== '') {
                params.push(param + '=' + searchCriteria[param]);
            }
        }
        return params.join('&');
    },

    getVTDeactivatedWithException: function (activeVT) {
        return browser.executeScript('return hwDtm.versionTest.hwVT').then(function (versionTests) {
            var versionTestsList = [], valueAssigned;
            Object.keys(versionTests).forEach(function (versionTestName) {
                valueAssigned = (activeVT.indexOf(versionTestName) === -1 ) ? '=1' : '=2';
                versionTestsList.push('vt.' + versionTestName + valueAssigned);
            });
            return versionTestsList.join('&');
        });
    }

};
