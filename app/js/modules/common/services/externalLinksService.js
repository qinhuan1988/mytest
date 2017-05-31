angular.module('webapp.common')
    .factory({
        ExternalLinksService: ['DialogService', ExternalLinksService]
    });

/*
 * ExternalLinksService
 *
 * @description: Handles links within Cordova App
 *
 * @usage:
 *  - opens URLs INSIDE the app
 *  - opens URLs OUTSIDE of the app
 *  - opens tel anchor links
 *  - opens mail anchor links
 *
 */
function ExternalLinksService(dialogService) {

    var cordova = window.cordova;
    var InAppBrowserParams = 'location=yes,transitionstyle=crossdissolve,EnableViewPortScale=yes';

    if (ionic.Platform.isIOS()) {
        InAppBrowserParams = 'transitionstyle=crossdissolve,EnableViewPortScale=yes';
    }

    if (typeof cordova !== 'undefined' && typeof cordova.InAppBrowser !== 'undefined') {
        window.open = cordova.InAppBrowser.open;
    }

    function openURL(url) {
        if (url) {
            window.open(encodeURI(url), '_blank', InAppBrowserParams);
        }
    }

    function openURLInDeviceBrowser(url, redirectPageName) {
        if (url) {
            // URLs opening outside of the app (thus in device default browser)
            // requires confirmation from a user that the action make him leaving the app
            dialogService.confirmExitAppFromLink(confirmCallback, redirectPageName);
        }

        function confirmCallback () {
            window.open(encodeURI(url), '_system', InAppBrowserParams);
        }
    }

    function callPhone(phoneNumber) {
        if (phoneNumber) {
            window.open('tel:' + phoneNumber, '_system');
        }
    }

    function sendEmail(email) {
        if (email) {
            window.open('mailto:' + email, '_system');
        }
    }

    return {
        callPhone: callPhone,
        openURL: openURL,
        sendEmail: sendEmail,
        openURLInDeviceBrowser: openURLInDeviceBrowser
    };
}
