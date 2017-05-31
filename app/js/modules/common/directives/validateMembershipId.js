angular.module('webapp.common').directive({
    validateMembershipId: ['gettextCatalog', 'MemberInfoService', validateMembershipId]
});

function validateMembershipId(gettextCatalog, memberInfoService) {
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
            $scope.labelError = 'Membership ID';

            $scope.$watch('ngModel', function(val) {
                if (val) {
                    //email validation
                    if (memberInfoService.getMemberInfo().membershipId !== val) {
                        $scope.labelError = gettextCatalog.getString('Membership ID invalid');
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
