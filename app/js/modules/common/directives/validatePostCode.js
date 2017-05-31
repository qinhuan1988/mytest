angular.module('webapp.common').directive(
    'validatePostCode', ['gettextCatalog', validatePostCode]
);

function validatePostCode (gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@',
            isValid: '=?'
        },
        link: function($scope, element, attrs, ngModelCtrl) {

            // regex for chinese post codes
            // post code should composed of 6 digits
            var regex = /^([0-9]){6}$/;
            var wrapperEl = element.parent('.item-input');
            var errorMessage = gettextCatalog.getString('post code number');

            $scope.$watch('ngModel', function (newVal, oldVal) {
                if (!!newVal && (newVal != oldVal)) {
                    if (!regex.test(newVal)) {
                        setError();
                    } else {
                        unsetError();
                    }
                }
            });

            function setError () {
                $scope.className = 'errorLabel';
                wrapperEl.addClass('input--unvalid');
                $scope.labelError = errorMessage;
                $scope.isValid = false;
                ngModelCtrl.$setValidity($scope.inputName, false);
            }

            function unsetError () {
                $scope.className = '';
                wrapperEl.removeClass('input--unvalid');
                $scope.labelError = '';
                $scope.isValid = true;
                ngModelCtrl.$setValidity($scope.inputName, true);
            }

        },
        template: "<div class='{{ className }}'>{{ labelError }}</div>"
    };
}
