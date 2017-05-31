angular.module('webapp.common').directive({
    validatePassportNumber: ['gettextCatalog', validatePassportNumber]
});

function validatePassportNumber(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var defaultLabel = "Given name";
            var inputName = $scope.inputName;
            var wrapperEl = element.parent('.item-input');
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9}$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('Passport number has to be 9 characters');
                        wrapperEl.addClass('input--unvalid');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        $scope.labelError = gettextCatalog.getString('Passport number');
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
