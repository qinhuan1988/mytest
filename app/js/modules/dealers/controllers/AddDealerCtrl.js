angular.module('webapp.dealers').controller(
    'AddDealerCtrl', ['$scope', '$state', 'api', 'MemberInfoService', 'AccessoryBarService', ctrl]
);

function ctrl($scope, $state, api, memberInfoService, accessoryBarService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;
    var memberInfo = memberInfoService.getMemberInfo();

    $scope.partial = vm;
    $scope.partial.getDealerListFilterObj = {
        isMappedPartner: 0,
        membershipId: memberInfo.membershipId
    };


    vm.addDealer = function() {
        var postData = {
            partnerCode: vm.formData.dealer,
            membershipId: memberInfo.membershipId,
            disablePopupError: true
        };
        api.addDealer(postData)
            .then(function() {
                api.getMemberInfo(memberInfo.membershipId)
                    .then(function(result) {
                        api.setRegionCode(result.countryCode);
                        memberInfoService.setMemberInfo(result.plain());                        
                        memberInfoService.getMemberInfo();
                        $state.go('dash.dealers');
                    });
            })
            .catch(function(error) {
                vm.errorMsg = error.data.errorMessage;
            });
    };
}
