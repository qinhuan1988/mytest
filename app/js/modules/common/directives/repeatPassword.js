angular.module('webapp.common').directive({
    repeatPassword: ['gettextCatalog', repeatPassword]
});

function repeatPassword(gettextCatalog) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            inputName: '@',
            ngModel: '='
        },
        link: function($scope, element, attrs, ngModel) {
            var defaultLabel = "Repeat password";
            var inputName = $scope.inputName;
            var wrapperEl = element.parent('.item-input');
            $scope.labelError = defaultLabel;
            //confirm pass
            $scope.$watch('ngModel', function(val) {
                var password = attrs.repeatPassword;
                if (typeof val !== 'undefined' && val !== password) {
                    $scope.labelError = gettextCatalog.getString('Passwords do not match.');
                    wrapperEl.addClass('input--unvalid');
                    $scope.className = 'errorLabel';
                    ngModel.$setValidity(inputName, false);
                } else {
                    $scope.labelError = defaultLabel;
                    wrapperEl.removeClass('input--unvalid');
                    $scope.className = '';
                    ngModel.$setValidity(inputName, true);
                }
            });
            // new pass
            attrs.$observe('repeatPassword', function(val) {
                if (typeof $scope.ngModel !== 'undefined' && val !== $scope.ngModel) {
                    $scope.labelError = gettextCatalog.getString('Passwords do not match.');
                    wrapperEl.addClass('input--unvalid');
                    $scope.className = 'errorLabel';
                    ngModel.$setValidity(inputName, false);
                } else {
                    $scope.labelError = defaultLabel;
                    wrapperEl.removeClass('input--unvalid');
                    $scope.className = '';
                    ngModel.$setValidity(inputName, true);
                }
            });
        },
        template: "<div class='{{className}}'>{{labelError}}</div>"
    };
}
