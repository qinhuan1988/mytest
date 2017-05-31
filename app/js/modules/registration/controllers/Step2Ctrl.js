angular.module('webapp.registration.step2', [

]).controller({
    Step2Ctrl: ['$scope', '$state', 'MemberInfoService', 'DEFAULT_SETTING', 'api', ctrl]
});

function ctrl($scope, $state, memberInfoService, DEFAULT_SETTING, api) {
    var vm = this;
    vm.memberInfo = memberInfoService.getMemberInfo();
    if (!vm.memberInfo) {
        $state.go('login');
    }
    vm.setPassword = function() {
        $scope.registrationObject.repeatPassword = vm.formData.repeatPassword;
        $scope.registrationObject.password = vm.formData.password;
        var postData = {
            newPassword: vm.formData.password,
            membershipId: vm.memberInfo.membershipId,
            disablePopupError: true
        };
        api.changePassword(postData)
            .then(function() {
                 $state.go('registration.step3');
            }, function(res) {
                vm.errorMsg = res.data.errorMessage;
            });
    };
}
