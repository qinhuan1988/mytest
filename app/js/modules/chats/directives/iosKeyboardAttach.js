angular.module('webapp.chat').directive({
    iosKeyboardAttach: ['$ionicScrollDelegate', iosKeyboardAttach]
});

// ionic KeyboardAttach directive doesn't support originBottom, it always reset 0
// so rewrite it here handling iOS keyboard attach
// required cordova plugin: ionic-plugin-keyboard
function iosKeyboardAttach($ionicScrollDelegate) {
    return {
        restrict: 'A',

        scope: {
            isChatMode: '=?'
        },

        link: function(scope, element) {

            scope.$watch('isChatMode', function(val) {
                if (val) {
                    ionic.on('native.keyboardshow', onShow, window);
                    ionic.on('native.keyboardhide', onHide, window);
                } else {
                    onHide();
                    ionic.off('native.keyboardshow', onShow, window);
                    ionic.off('native.keyboardhide', onHide, window);
                }
            });

            // default value 47;
            // iOS status bar 20;
            var footerBarBottom = 67,
                chatContentBottom = 108,
                chatContainer = document.querySelectorAll('.chat-container')[0];


            function onShow(e) {
                if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
                    return;
                }
                var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
                element.css('bottom', keyboardHeight + footerBarBottom + "px");
                element.find('input')[0].focus();
                chatContainer.style.bottom = keyboardHeight + chatContentBottom + "px";
                $ionicScrollDelegate.scrollBottom(true);
            }

            function onHide() {
                if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
                    return;
                }
                element.css('bottom', '');
                chatContainer.style.bottom = chatContentBottom + "px";

            }

            scope.$on('$destroy', function() {
                ionic.off('native.keyboardshow', onShow, window);
                ionic.off('native.keyboardhide', onHide, window);
            });
        }
    };
}
