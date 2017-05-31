angular.module('webapp.registration.step3', [

]).controller({
    Step3Ctrl: [
        '$scope',
        '$state',
        'MemberInfoService',
        'api',
        'aem',
        'RegistrationService',
        'aemModalService',
        'gettextCatalog',
        ctrl
    ]
});

function ctrl(
    $scope,
    $state,
    memberInfoService,
    api,
    aem,
    registrationService,
    aemModalService,
    gettextCatalog
) {

    var vm = this;
    vm.defaultVinErrorMsg = gettextCatalog.getString('VIN number should be extaclty 17 characters');
    vm.memberInfo = memberInfoService.getMemberInfo();

    if (!vm.memberInfo) {
        $state.go('login');
    }

    vm.showVINInfo = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Find your VIN'), aem.getVINInfoTemplateURL());
    };

    vm.confirm = function() {
        $scope.registrationObject.vinNumber = vm.formdata.vinNumber;

        var postData = {
            mobileNumber: $scope.registrationObject.phoneNumber,
            lastName: $scope.registrationObject.lastName,
            VIN: $scope.registrationObject.vinNumber,
            disablePopupError: true
        };
        api.validateCarmenInfo(postData)
            .then(function(result) {
                registrationService.setRegistrationInfo(vm.formdata.vinNumber);
                if(result.errorCode === '0') {
                    $scope.registrationObject.carManArray = result.validateCarmentDataList;
                    $state.go('registration.carlist');
                } else {
                    $state.go('registration.step4');
                }
            })
            .catch(function(res) {
                vm.errorMsg = res.data.errorMessage;
            });
    };

    vm.skip = function () {
        $state.go('registration.step4');
    };
}
