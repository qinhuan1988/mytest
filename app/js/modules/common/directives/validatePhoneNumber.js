angular.module('webapp.common').directive({
    validatePhoneNumber: ['gettextCatalog', validatePhoneNumber]
});

function validatePhoneNumber(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var wrapperEl = element.parent('.item-input');
            var inputName = $scope.inputName;
            $scope.labelError = "Your mobile number";

            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (!/^1(?!2)\d{10}$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('Please enter a valid mobile phone');
                        $scope.className = 'errorLabel';
                        wrapperEl.addClass('input--unvalid');
                        ngModel.$setValidity(inputName, false);
                    } else {
                        wrapperEl.removeClass('input--unvalid');
                        $scope.className = '';
                        ngModel.$setValidity(inputName, true);
                    }
                }
            });
        },
        template: "<div class='{{className}}'>{{labelError}}</div>"
    };
}
