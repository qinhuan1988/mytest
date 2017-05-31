angular.module('webapp.activity', [

]).controller({
    ActivityCtrl: ['$scope', '$filter', '$state', 'api', 'MemberInfoService', '$rootScope', 'AccessoryBarService', ctrl]
});

function ctrl($scope, $filter, $state, api, memberInfoService, $rootScope, accessoryBarService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;

    vm.memberInfo = memberInfoService.getMemberInfo();
    vm.membershipId = vm.memberInfo.membershipId;
    vm.startDate = '01-01-2016';
    vm.endDate = new Date();
    vm.endDate = $filter('date')(vm.endDate, "dd-MM-yyyy");
    vm.districtCode = '';

    var dataPartnerObj = {
        membershipId: vm.membershipId,
        districtCode: vm.districtCode,
        isMappedPartner: '1',
        type: 'Local'
    };
    var dataDealerObj = {
        membershipId: vm.membershipId,
        districtCode: vm.districtCode,
        isMappedPartner: '1',
        type: 'Dealer'
    };

    api.getDealers(dataPartnerObj).then(function(result) {
        vm.partnerList = result.partnerArray;
    });
    api.getDealers(dataDealerObj).then(function(result) {
        vm.dealerList = result.partnerArray;
    });

    vm.getActivity = function(dealerCode, partnerCode, sortDirection) {
        var filterObj = {
            membershipId: vm.membershipId,
            startDate: vm.startDate,
            endDate: vm.endDate,
            partnerCode: dealerCode ? dealerCode : partnerCode,
            sortField: sortDirection ? sortDirection : 'transactionDate',
            sortDirection: 'asc'
        };
        api.getMemberActivity(filterObj).then(function(result) {
            vm.partnerActivityList = result.activityArray;
        });
    };

    vm.refreshView = function(dealerCode, partnerCode, sortDirection) {
        $rootScope.pullToRefresh = 1;
        var filterObj = {
            membershipId: vm.membershipId,
            startDate: vm.startDate,
            endDate: vm.endDate,
            partnerCode: dealerCode ? dealerCode : partnerCode,
            sortField: sortDirection ? sortDirection : 'transactionDate',
            sortDirection: 'asc'
        };
        api.getMemberActivity(filterObj)
            .then(function(result) {
                vm.partnerActivityList = result.activityArray;
            })
            .finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $rootScope.pullToRefresh = 0;
            });
    };

    vm.getActivity();
}
