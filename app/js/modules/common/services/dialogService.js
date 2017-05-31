angular.module('webapp.common').factory({
    DialogService: ['$ionicPopup', '$state', '$ionicHistory', 'gettextCatalog', DialogService]
});

function DialogService($ionicPopup, $state, $ionicHistory, gettextCatalog) {

    function offerOptionNotification (options) {
        $ionicPopup.alert({
            title: '',
            template: '<div class="popup-body__icon"><i class="icon-success-notif"></i></div><div class="popup-body__headline"></div><div class="popup-body__text">' + options.notification + '</div></div>',
            buttons: [{
                text: options.nextStateLabel,
                type: 'button-default',
                onTap: function() {
                    $ionicHistory.goBack();
                }
            }]
        });
    }

    /**  confirmExitAppFromLink
     *
     *   @usage: dialog confirms the exit of the app (eg: open links in device browser)
     *
     *   @args:
     *    - confirmCallback: function triggered when user confirm leaving the app
     **/
    function confirmExitAppFromLink (confirmCallback, redirectPageName) {
        var iOSMsg = gettextCatalog.getString('If you wish to get back to the Loyalty App directly, you can click on the link at the top left of the screen "BMWLoyalty".'),
            AndroidMsg = gettextCatalog.getString('You can go back to BMWLoyalty anytime, by simply tapping on the back-button on your phone.');
        confirmWithRedirectExternal({
            headline: gettextCatalog.getString('You are about to be redirected to') + ' ' + gettextCatalog.getString(redirectPageName),
            msg: ionic.Platform.isIOS()? iOSMsg : AndroidMsg,
            confirmText: gettextCatalog.getString('Continue'),
            cancelText: gettextCatalog.getString('Cancel'),
            confirmOnTap: confirmCallback
        });
    }

    function confirmWithRedirectExternal (options) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            template: '<div class="popup-body__icon--round"><i class="ion-share"></i></div><div class="popup-body__headline--alert">' + options.headline + '</div><div class="popup-body__text">' + options.msg + '</div>',
            buttons: [{
                text: options.confirmText,
                type: 'button-default',
                onTap: options.confirmOnTap
            }, {
                text: options.cancelText,
                type: 'button-positive',
                onTap: options.cancelOnTap
            }]
        });
    }

    /**  confirmWithRedirect
     *
     *   @options:
     *    - msg: gettextCatalog.getString('Comfirm to logout'),
     *    - confirmText: gettextCatalog.getString('Yes'),
     *    - cancelText: gettextCatalog.getString('Cancel'),
     *    - confirmOnTap: fn(){},
     *    - cancelOnTap: fn(){}
     **/
    function confirmWithRedirect (options) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            template: '<div class="popup-body__icon"><i class="icon-alert-notif"></i></div><div class="popup-body__headline"></div><div class="popup-body__text">' + options.msg + '</div>',
            buttons: [{
                text: options.confirmText,
                type: 'button-default',
                onTap: options.confirmOnTap
            }, {
                text: options.cancelText,
                type: 'button-positive',
                onTap: options.cancelOnTap
            }]
        });
    }

    function alertWithRedirect (msg, router) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            okType: 'button-positive',
            template: '<div class="popup-body__icon"><i class="icon-error-notif"></i></div><div class="popup-body__headline"></div><div class="popup-body__text">' + msg + '</div>'
        }).then(function() {
            $state.go(router);
        });
    }

    function alertMsg (msg) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            okType: 'button-default',
            template: '<div class="popup-body__icon"><i class="icon-error-notif"></i></div><div class="popup-body__headline"></div><div class="popup-body__text">' + msg + '</div>'
        });
    }

    function alertComingSoon (msg) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            okText: msg.buttonText,
            okType: 'button-default',
            template: '<div class="popup-body__icon"><i class="icon-alert-comingsoon"></i></div><div class="popup-body__headline">' + msg.title + '</div><div class="popup-body__text">' + msg.body + '</div>'
        });
    }

    function successWithRedirect (msg, router) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            okType: 'button-positive',
            template: '<div class="popup-body__icon"><i class="icon-success-notif"></i></div><div class="popup-body__headline"></div><div class="popup-body__text">' + msg + '</div>'
        }).then(function() {
            $state.go(router);
        });
    }

    // confirm call popup

    function confirmCallPopup (msg, confirmCallback) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            buttons: [{
                text: gettextCatalog.getString('YES'),
                type: 'button-default',
                onTap: confirmCallback
            }, {
                text: gettextCatalog.getString('NO'),
                type: 'button-default'
            }],
            template: '<div class="popup-body__icon"><i class="icon-call-notif"></i></div><div class="popup-body__headline--blue">' + gettextCatalog.getString('Call US') + '</div><div class="popup-body__text">' + msg + '</div>'
        });
    }

    // confirm email popup

    function confirmEmailPopup (msg, confirmCallback) {
        $ionicPopup.alert({
            title: '',
            cssClass: 'bmwPopup',
            buttons: [{
                text: gettextCatalog.getString('YES'),
                type: 'button-default',
                onTap: confirmCallback
            }, {
                text: gettextCatalog.getString('NO'),
                type: 'button-default'
            }],
            template: '<div class="popup-body__icon"><i class="icon-email-notif"></i></div><div class="popup-body__headline--green">' + gettextCatalog.getString('Email US') + '</div><div class="popup-body__text">' + msg + '</div>'
        });
    }

    return {
        offerOptionNotification: offerOptionNotification,
        confirmExitAppFromLink: confirmExitAppFromLink,
        alertWithRedirect: alertWithRedirect,
        alertMsg: alertMsg,
        successWithRedirect: successWithRedirect,
        confirmWithRedirect: confirmWithRedirect,
        alertComingSoon: alertComingSoon,
        confirmCallPopup: confirmCallPopup,
        confirmEmailPopup: confirmEmailPopup
    };
}
