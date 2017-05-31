angular.module('webapp.common').directive({
    validatePassword: ['gettextCatalog', validatePassword]
});

function validatePassword(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@',
            placeholderName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var wrapperEl = element.parent('.item-input');
            var defaultLabel = "Password";
            var inputName = $scope.inputName;
            var placeholderName = $scope.placeholderName;
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[A-Za-z\d_\W]{8,}$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('Your password must consist of a minimum of 8 characters, lower and upper case letters, at least 1 number, at least 1 special character (e.g.  #$_*)');
                        wrapperEl.addClass('input--unvalid');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        $scope.labelError = placeholderName;
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
