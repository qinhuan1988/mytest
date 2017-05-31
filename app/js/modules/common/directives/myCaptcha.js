angular.module('webapp.common').directive({
    myCaptcha: ['api', 'gettextCatalog', myCaptcha]
});

/*
 * Captcha directive
 *
 * @description
 *   It calls the API and generates an image based on the API response 's byte array
 *   It offers the possiblilty to refresh the captcha
 *
 * @example
 *      <div class="captcha-box text-right" my-captcha="registrationStep1.isCaptchaExpired" set-captcha-id="registrationStep1.setCaptchaId(id)">
 *      </div>
 *
 *
 *  isCaptchaExpired set to true when captcha is validated succefully in order to refresh the expired one
 *
 *
 *  Add the function below into your controller to get the captcha ID
 *
 *      vm.setCaptchaId = function(id) {
 *      vm.captchaId = id;
 *       };
 *
 *
 */

function myCaptcha(api, gettextCatalog) {
    return {
        restrict: 'A',
        scope: {
            setCaptchaId: '&',
            isExpired: '=myCaptcha'
        },
        link: function($scope, element, attrs) {
            refreshCaptcha();
            $scope.$watch('isExpired', function(val) {
                if (val) {
                    refreshCaptcha();
                }
            });
            // refresh the captcha
            function refreshCaptcha() {
                api.GenerateCaptcha().then(function(result) {
                    var imgData = result.captcha;
                    var imgID = result.captchaId;
                    $scope.imgURL = generateImg(imgData);
                    $scope.setCaptchaId({
                        id: imgID
                    });
                    $scope.isExpired = false;
                });
            }
            // converts the byte array into an image
            function generateImg(imgData) {
                u8 = new Uint8Array(imgData);
                b64encoded = btoa(String.fromCharCode.apply(null, u8));
                return "data:image/png;base64," + b64encoded;
            }

            $scope.refreshCaptcha = function() {
                refreshCaptcha();
            };
        },
        template: "<div><img ng-click='refreshCaptcha()' ng-src='{{imgURL}}' /></div><a class='button icon-left ion-ios-refresh-empty button-clear' ng-click='refreshCaptcha()'>" +
            gettextCatalog.getString('Refresh CAPTCHA') + "</a>"
    };
}
