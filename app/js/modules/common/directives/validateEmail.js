angular.module('webapp.common').directive({
    validateEmail: ['gettextCatalog', validateEmail]
});

function validateEmail(gettextCatalog) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            selectedChannel: '=',
            inputName: '@'
        },
        link: function($scope, element, attrs, ngModel) {
            var wrapperEl = element.parent('.item-input');
            var defaultLabel = gettextCatalog.getString('E-mail address');
            var inputName = $scope.inputName;
            $scope.labelError = defaultLabel;

            $scope.$watch('ngModel', function(val) {
                if (val) {
                    //email validation
                    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
                        $scope.labelError = gettextCatalog.getString('Email invalid');
                        wrapperEl.addClass('input--unvalid');
                        $scope.className = 'errorLabel';
                        ngModel.$setValidity(inputName, false); // invalid
                    } else {
                        $scope.labelError = gettextCatalog.getString('Email address');
                        wrapperEl.removeClass('input--unvalid');
                        $scope.className = '';
                        ngModel.$setValidity(inputName, true); // valid
                    }
                } else if ($scope.selectedChannel !== '2') {
                    //if val is empty(as delete it), set validity true, instead of keep validity false
                    ngModel.$setValidity(inputName, true); // valid
                }
            });
        },
        template: "<div class='{{className}}'>{{labelError}}</div>"
    };
}
