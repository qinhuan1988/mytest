angular.module('webapp.myProfile', [

]).controller({
    MyProfileCtrl: ['$state', '$rootScope', '$scope', 'MemberInfoService', 'DEFAULT_SETTING', ctrl],
    MyPostCodeCtrl: ['$state', '$scope', 'MemberInfoService', postCodeCtrl],
    MyProvinceCtrl: ['$state', '$scope', 'api', 'MemberInfoService', provinceCtrl],
    MyCityCtrl: ['$state', '$scope', 'api', 'MemberInfoService', cityCtrl],
    MyPreferredModeCtrl: ['$state', '$scope', 'MemberInfoService', 'DEFAULT_SETTING', preferredModeCtrl],
    EmailCtrl: ['$state', '$scope', 'MemberInfoService', emailCtrl],
    MyIDTypeCtrl: ['$state', '$scope', 'api', 'MemberInfoService', 'DEFAULT_SETTING', MyIDTypeCtrl],
    MyIDNumberCtrl: ['$state', '$scope', 'MemberInfoService', MyIDNumberCtrl],
    MyPassportNumberCtrl: ['$state', '$scope', 'MemberInfoService', MyPassportNumberCtrl],
    MyAddressCtrl: ['$state', '$scope', 'MemberInfoService', MyAddressCtrl]
});

function ctrl($state, $rootScope, $scope, memberInfoService, DEFAULT_SETTING) {

    var vm = this;

    $scope.$on('$ionicView.beforeEnter', function() {
        vm.userInfo = memberInfoService.getMemberInfo();
        vm.nameDisplay = memberInfoService.getmemberName();
    });

    vm.getIDType = function(id) {
        if (id) {
            return _.find(DEFAULT_SETTING.IDTypes, function(o) {
                return o.id === id;
            }).name;
        } else {
            return '';
        }

    };

    vm.getCommunicationType = function (id) {
        if (id) {
            var type = _.find(DEFAULT_SETTING.communicationTypes, function(o) {
                return o.id === id;
            });
            if (type) {
                return type.name;
            }
        }
        return '';
    };

    vm.refreshView = function() {
        $rootScope.pullToRefresh = 1;
        memberInfoService.getMemberInfoFromServer(vm.userInfo.membershipId).then(function() {
            vm.userInfo = memberInfoService.getMemberInfo();
            $scope.$broadcast('scroll.refreshComplete');
            $rootScope.pullToRefresh = 0;
        });
    };

}







function postCodeCtrl($state, $scope, memberInfoService) {
    var vm = this;
    vm.isValid = false;
    initModificationCtrl(vm, $scope, memberInfoService);

    $scope.$watch('myPostCode.isValid', function (newVal) {
        $scope.dash.rightBtnDisabled = !newVal;
    });

    $scope.dash.onRightBtnClick = function() {
        saveMemberInfo(vm, $state, memberInfoService);
    };
}






function MyAddressCtrl($state, $scope, memberInfoService) {
    var vm = this;
    initModificationCtrl(vm, $scope, memberInfoService);
    $scope.dash.onRightBtnClick = function() {
        saveMemberInfo(vm, $state, memberInfoService);
    };
}

function emailCtrl($state, $scope, memberInfoService) {
    var vm = this;
    initModificationCtrl(vm, $scope, memberInfoService);
    $scope.dash.onRightBtnClick = function() {
        saveMemberInfo(vm, $state, memberInfoService);
    };
}

function provinceCtrl($state, $scope, api, memberInfoService) {

    var vm = this;
    initModificationCtrl(vm, $scope, memberInfoService);
    $scope.dash.hideRightBtn = true;
    vm.memberInfo = memberInfoService.getMemberInfo();
    var previousProvince = vm.userInfo.provinceCode;
    api.setRegionCode(vm.memberInfo.countryCode);
    api.getProvince({
        dataFor: 'M'
    }).then(function(result) {
        vm.provinceList = result.provinceArray;
    });

    vm.setProvince = function(province) {
        vm.userInfo.province = province.provinceName;
        vm.userInfo.udfTable24ID = province.provinceCode;
        if (previousProvince !== vm.userInfo.udfTable24ID) {
            vm.userInfo.udfTable23ID = vm.userInfo.cityCode = '';
        }
        saveMemberInfo(vm, $state, memberInfoService);
    };
}


function cityCtrl($state, $scope, api, memberInfoService) {

    var vm = this;

    initModificationCtrl(vm, $scope, memberInfoService);
    $scope.dash.hideRightBtn = true;

    api.getCity({
        provinceCode: vm.userInfo.provinceCode,
        dataFor: 'M'
    }).then(function(result) {
        vm.cityList = result.arrayCity;
    });

    vm.setCity = function(city) {
        vm.userInfo.city = city.cityName;
        vm.userInfo.udfTable23ID = city.cityCode;
        saveMemberInfo(vm, $state, memberInfoService);
    };

}

function preferredModeCtrl($state, $scope, memberInfoService, DEFAULT_SETTING) {
    var vm = this;

    initModificationCtrl(vm, $scope, memberInfoService);
    $scope.dash.hideRightBtn = true;

    vm.communicationTypes = DEFAULT_SETTING.communicationTypes;

    vm.setCommunicationType = function(type) {
        vm.userInfo.communicationType = vm.userInfo.preferredModeOfCommunication = type.id;
        saveMemberInfo(vm, $state, memberInfoService);
    };

}

function MyIDTypeCtrl($state, $scope, api, memberInfoService, DEFAULT_SETTING) {
    var vm = this;


    initModificationCtrl(vm, $scope, memberInfoService);

    var previousType = vm.userInfo.udf27;

    vm.IDTypes = DEFAULT_SETTING.IDTypes;
    $scope.dash.hideRightBtn = true;
    vm.setIDType = function(type) {
        vm.userInfo.udf27 = type.id;
        if (previousType !== vm.userInfo.udf27 || !vm.userInfo.udf28) {
            vm.userInfo.udf28 = null;
        }
        saveMemberInfo(vm, $state, memberInfoService);
    };
}

function MyIDNumberCtrl($state, $scope, memberInfoService) {
    var vm = this;

    initModificationCtrl(vm, $scope, memberInfoService);

    vm.userInfo.IDNumberValue = vm.userInfo.udf28;

    vm.isIDNumber = function() {
        return /^(?=.*\d)[A-Za-z\d]{18}$/.test(vm.userInfo.IDNumberValue);
    };
    $scope.dash.rightBtnDisabled = !vm.isIDNumber();


    vm.checkIDNumber = function() {
        $scope.dash.rightBtnDisabled = false;

        if (!vm.isIDNumber()) {
            $scope.dash.rightBtnDisabled = true;
        }
    };

    $scope.dash.onRightBtnClick = function() {
        vm.userInfo.udf28 = vm.userInfo.IDNumberValue;
        saveMemberInfo(vm, $state, memberInfoService);
    };
}

function MyPassportNumberCtrl($state, $scope, memberInfoService) {
    var vm = this;

    initModificationCtrl(vm, $scope, memberInfoService);

    vm.userInfo.passportNumberValue = vm.userInfo.udf28;

    vm.isPassportNumber = function() {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9}$/.test(vm.userInfo.passportNumberValue);
    };
    $scope.dash.rightBtnDisabled = !vm.isPassportNumber();

    vm.checkPassportNumber = function() {
        $scope.dash.rightBtnDisabled = false;

        if (!vm.isPassportNumber()) {
            $scope.dash.rightBtnDisabled = true;
        }
    };

    $scope.dash.onRightBtnClick = function() {
        vm.userInfo.udf28 = vm.userInfo.passportNumberValue;
        saveMemberInfo(vm, $state, memberInfoService);
    };
}

function initModificationCtrl(vm, $scope, memberInfoService) {
    $scope.dash.rightBtnDisabled = false;
    vm.userInfo = memberInfoService.getMemberInfo();

    vm.userInfo.udfTable25ID = vm.userInfo.countryCode || 'CN';
    vm.userInfo.udfTable23ID = vm.userInfo.cityCode;
    vm.userInfo.udfTable24ID = vm.userInfo.provinceCode;
    vm.userInfo.communicationType = vm.userInfo.preferredModeOfCommunication;

    $scope.dash.hideRightBtn = false;
    $scope.$on('$destroy', function() {
        $scope.dash.hideRightBtn = true;
    });
}

function saveMemberInfo(vm, $state, memberInfoService) {

    memberInfoService.updateMemberInfo(vm.userInfo).then(function() {
        memberInfoService.getMemberInfoFromServer(vm.userInfo.membershipId).then(function() {
            $state.go('dash.myProfile');
        });
    });
}
