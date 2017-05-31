angular.module('webapp.registration.step5', [

]).controller({
    Step5Ctrl: ['$scope', '$state', 'MemberInfoService', 'api', '$ionicHistory', 'AccessoryBarService', ctrl]
});

function ctrl($scope, $state, memberInfoService, api, $ionicHistory, accessoryBarService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;
    $scope.partial = vm;

    vm.memberInfo = memberInfoService.getMemberInfo();
    if (!vm.memberInfo) {
        $state.go('login');
    }

    vm.addDealer = function() {
        $scope.registrationObject.province = vm.formData.province;
        $scope.registrationObject.city = vm.formData.city;
        $scope.registrationObject.dealer = vm.formData.dealer;
        $scope.registrationObject.isAgreed = vm.formData.isAgreed;

        var postData = {
            membershipId: vm.memberInfo.membershipId,
            partnerCode: vm.formData.dealer,
            disablePopupError: true
        };
        api.addDealer(postData)
            .then(function() {
                api.getMemberInfo(vm.memberInfo.membershipId)
                    .then(function (result) {
                        memberInfoService.setMemberInfo(result.plain());
                        $ionicHistory.clearCache();
                        $state.go('dash.chat', {
                            isNewUser: true
                        });
                    });
            })
            .catch(function(error) {
                vm.errorMsg = error.data.errorMessage;
            });
    };
}
