angular.module('webapp.common').directive({
    validateFirstName: ['gettextCatalog', validateFirstName]
});

function validateFirstName(gettextCatalog) {
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
            $scope.labelError = defaultLabel;
            $scope.$watch('ngModel', function(val) {
                if (val) {
                    if (val.length < 4) {
                        $scope.labelError = gettextCatalog.getString('Given name too short');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false);
                    } else {
                        if (val.length > 15) {
                            $scope.labelError = gettextCatalog.getString('Given name too long');
                            $scope.className = 'errorLabel';
                            ngModel.$setValidity(inputName, false);
                        } else {
                            $scope.labelError = gettextCatalog.getString('Given name');
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
