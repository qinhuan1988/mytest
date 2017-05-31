angular.module('webapp.common').service({
    AccessoryBarService: AccessoryBarService
});

function AccessoryBarService() {

    var addViewEvent = function(scope) {
        if(ionic.Platform.isIOS() && typeof cordova !== 'undefined' && cordova.plugins.Keyboard) {
            scope.$on('$ionicView.beforeEnter', function() {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            });

            scope.$on('$stateChangeStart', function() {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            });
        }
    };

    return {
         addViewEvent: addViewEvent
    };
}
