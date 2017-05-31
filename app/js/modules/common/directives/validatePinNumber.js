angular.module('webapp.common').directive({
    validatePinNumber: ['gettextCatalog', validatePinNumber]
});

function validatePinNumber(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {

            var defaultLabel = gettextCatalog.getString('PIN number');
            var inputName = $scope.inputName;
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (!/^(?=[0-9]*$)(?:.{6})$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('PIN number has to be of 6 digits');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        $scope.labelError = gettextCatalog.getString('PIN number');
                        $scope.className = '';
                        ngModel.$setValidity(inputName, true);
                    }
                }
            });
        },
        template: "<div class='{{className}}'>{{labelError}}</div>"
    };
}
