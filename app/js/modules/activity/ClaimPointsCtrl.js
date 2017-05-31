angular.module('webapp.claimPoints', [

]).controller({
    ClaimPointsCtrl: ['$scope', '$state', 'api', 'MemberInfoService', 'DEFAULT_SETTING', 'AccessoryBarService', ctrl]
});

function ctrl($scope, $state, api, memberInfoService, DEFAULT_SETTING, accessoryBarService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;

    vm.userInfo = memberInfoService.getMemberInfo();
    vm.firstName = vm.userInfo.firstName;
    vm.lastName = vm.userInfo.lastName;


    vm.nameDisplay = memberInfoService.getmemberName();

    vm.membershipId = vm.userInfo.membershipId;

    vm.districtCode = '';
    vm.type = 'central';

    var filterObj = {
        districtCode: vm.districtCode,
        type: vm.type
    };

    api.getDealers(filterObj).then(function(result) {
        vm.partnerList = result.partnerArray;
    });

    vm.dealerList = vm.userInfo.partnerDetails;

}
