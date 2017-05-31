angular.module('webapp.common').directive({
    validateLastName: ['gettextCatalog', validateLastName]
});

function validateLastName(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var defaultLabel = "Family name";
            var inputName = $scope.inputName;
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (val.length < 4) {
                        $scope.labelError = gettextCatalog.getString('Family name too short');
                        gettextCatalog.getString('CVN2');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        if (val.length > 15) {
                            $scope.labelError = gettextCatalog.getString('Family name too long');
                            $scope.className = 'errorLabel';
                            ngModel.$setValidity(inputName, false);
                        } else {
                            $scope.labelError = gettextCatalog.getString('Family name');
                            $scope.className = '';
                            ngModel.$setValidity(inputName, true);
                        }
                    }
                }
            });
        },
        template: "<div class='{{className}}'>{{labelError}}</div>"
    };
}
