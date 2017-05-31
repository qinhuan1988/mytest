angular.module('webapp.registration.carlist', [

]).controller({
    CarListCtrl: ['$scope', '$state', 'MemberInfoService', 'api', ctrl]
});

function ctrl($scope, $state, memberInfoService, api) {
    var vm = this;

    vm.membershipId = memberInfoService.getMemberInfo().membershipId;
    vm.vehicleList = processVehicleList($scope.registrationObject.carManArray);

    function processVehicleList (list) {
        var _vehicleList =  list;
        _.each(_vehicleList, function(item) {
            item.price = '1';
        });
        return _vehicleList;
    }

    //add carmen info
    vm.goAddVehicle = function() {
        $state.go("registration.addNewCar");
    };

    vm.submit = function() {
        var postData = {
            membershipId: vm.membershipId,
            validateCarmentDataList: vm.vehicleList,
            disablePopupError: true
        };
        api.addCarmenInfo(postData)
            .then(function(result) {
                if (result.errorCode === "0") {
                    $state.go("registration.step4");
                }
            })
            .catch(function(res) {
                vm.errorMsg = res.data.errorMessage;
            });
    };
}
