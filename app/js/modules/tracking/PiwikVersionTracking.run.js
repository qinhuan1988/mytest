angular.module('webapp')
    .run(['TrackingService', run]);


function run (TrackingService) {

    if (typeof cordova !== 'undefined' && cordova.getAppVersion) {
        cordova.getAppVersion.getVersionNumber(function (version) {
            TrackingService.trackAppVersion(version);
        });
    }

}
