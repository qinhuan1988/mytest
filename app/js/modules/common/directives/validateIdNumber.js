angular.module('webapp.common').directive({
    validateIdNumber: ['gettextCatalog', validateIdNumber]
});

function validateIdNumber(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var defaultLabel = "ID Number";
            var wrapperEl = element.parent('.item-input');
            var inputName = $scope.inputName;
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (!/^(?=.*\d)[A-Za-z\d]{18}$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('ID number has to be 18 characters');
                        wrapperEl.addClass('input--unvalid');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        $scope.labelError = gettextCatalog.getString('ID number');
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
