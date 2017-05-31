angular.module('webapp.registration.step4', [

]).controller({
    Step4Ctrl: ['$scope', '$state', 'MemberInfoService', 'DEFAULT_SETTING', 'api', 'AccessoryBarService', ctrl]
});

function ctrl($scope, $state, memberInfoService, DEFAULT_SETTING, api, accessoryBarService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;
    vm.regionCode = '';
    vm.contractTypesArray = DEFAULT_SETTING.communicationTypes;
    vm.memberInfo = memberInfoService.getMemberInfo();
    if (!vm.memberInfo) {
        $state.go('login');
    }


    api.getRegion({
        dataFor: 'M'
    }).then(function(result) {
        vm.countryList = result.regionArray;
    });

    vm.getProvinceByCountryId = function(countryCode) {
        vm.regionCode = countryCode;
        api.getProvince({
            regionCode: countryCode,
            dataFor: 'M'
        }).then(function(result) {
            vm.provinceList = result.provinceArray;
        });
    };

    vm.getCityListByProvinceId = function(provinceCode) {
        var filterObj = {
            provinceCode: provinceCode,
            dataFor: 'M',
            regionCode: vm.regionCode
        };
        api.getCity(filterObj).then(function(result) {
            vm.cityList = result.arrayCity;
        });
    };

    vm.updateProfileInfo = function() {
        $scope.registrationObject.email = vm.formData.email;
        $scope.registrationObject.idNumber = vm.formData.idNumber;
        $scope.registrationObject.country = vm.formData.country;
        $scope.registrationObject.province = vm.formData.province;
        $scope.registrationObject.city = vm.formData.city;
        $scope.registrationObject.address = vm.formData.address;
        $scope.registrationObject.zipcode = vm.formData.zipcode;
        $scope.registrationObject.preferredContactChannel = vm.formData.preferredContactChannel;
        $scope.registrationObject.passportNumber = vm.formData.passportNumber;
        $scope.registrationObject.idType = vm.formData.idType;
        $scope.registrationObject.idNumber = vm.formData.idNumber;

        var postData = {
            mobileNumber: $scope.registrationObject.phoneNumber || '123456789',
            membershipId: vm.memberInfo.membershipId,
            udfTable25ID: vm.formData.country,
            udfTable24ID: vm.formData.province,
            udfTable23ID: vm.formData.city,
            address1: vm.formData.address,
            zipcode: vm.formData.zipcode,
            email: vm.formData.email,
            udf27: vm.formData.idType,
            udf28: vm.formData.idNumber || vm.formData.passportNumber,
            communicationType: vm.formData.preferredContactChannel,
            disablePopupError: true
        };
        api.enrollment(postData).then(function(result) {
            var membershipId = result.membershipId;
            api.getMemberInfo(membershipId).then(function(result) {
                memberInfoService.setMemberInfo(result.plain());
                $state.go('registration.step5');
            });
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };
}
