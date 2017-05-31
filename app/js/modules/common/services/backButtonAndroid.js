angular.module('webapp.common').service({
    BackButtonAndroid: ['$ionicPlatform', '$state', 'gettextCatalog', BackButtonAndroid]
});

function BackButtonAndroid($ionicPlatform, $state, gettextCatalog) {

    // on Adnroid, double click the hardware back button to close the app

    function doubleClickToClose(stateName) {

        var exitApp = false;

        $ionicPlatform.registerBackButtonAction(function(event) {
            if ($state.current.name === stateName) {
                if (exitApp) {
                    navigator.app.exitApp();
                } else {
                    exitApp = true;
                    window.plugins.toast.show(gettextCatalog.getString('Double click to exit'), 1000, 'center');
                    setTimeout(function() {
                        exitApp = false;
                    }, 1000);
                }
            } else {
                navigator.app.backHistory();
            }
        }, 100);
    }

    return {
        doubleClickToClose: doubleClickToClose
    };
}
