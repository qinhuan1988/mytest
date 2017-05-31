angular.module('webapp.common').directive({
    countDown: ['$timeout', countDown]
});

/*
 * Count Down button directive
 *
 * @description
 *
 *
 *   After validating the form and clicking,
 *   this disables the button for X seconds based on what has been passed to time="X",
 *   and enables the button when the timer gets to 0 sec
 *
 *
 * @example
 *
 *
 *      <button on-click="myCtrl.requestOTP()" is-disabled="myForm.$invalid" count-down="10" is-sent="myCtrl.isOTPSent" label="Request OTP">
 *      </button>
 *
 *  isOTPSent set to true when OTP is sent
 *
 *
 *
 */

function countDown($timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            countDown: '=',
            isDisabled: '=',
            onClick: '&',
            myClass: '@class',
            label: '@',
            isSent: '='
        },
        link: function($scope, $element, attrs) {
            if ($scope.isSent) {
                $scope.count = $scope.countDown;
                timer();
            }

            $scope.$watch('isSent', function(val) {
                if (val) {
                    $scope.count = $scope.countDown;
                    timer();
                }
            });

            $element.on('click', function() {
                if ($scope.isDisabled || $scope.isSent) {
                    return;
                }
            });

            function timer() {
                $timeout(function() {
                    $scope.count--;
                    if ($scope.count > 0) {
                        timer();
                    } else {
                        $scope.isSent = false;
                    }
                }, 1000);
            }
        },
        template: "<button class='myClass' ng-click='onClick()' ng-disabled='isDisabled || isSent'>" +
            "<span ng-if='!isSent'>{{label | translate}}</span>" +
            "<span ng-if='isSent'>{{'Resend Code' | translate}} ({{count}} {{'sec' | translate}})</span>" +
            "</button>"
    };
}
