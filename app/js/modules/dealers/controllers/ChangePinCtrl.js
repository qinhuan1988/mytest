angular.module('webapp.dealers').controller({
    ChangePinStep1Ctrl: ['$scope', '$state', 'api', 'MemberInfoService', 'DEFAULT_SETTING', step1Ctrl],
    ChangePinStep2Ctrl: ['$scope', '$state', 'DealerService', 'DialogService', step2Ctrl],
    ChangePinStep3Ctrl: ['$scope', '$state', 'DealerService', step3Ctrl],
    ChangePinStep4Ctrl: ['$scope', '$state', 'DealerService', 'DialogService', '$ionicHistory', 'gettextCatalog', step4Ctrl]
});


function step1Ctrl($scope, $state, api, memberInfoService, DEFAULT_SETTING) {

    var vm = this;

    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.memberInfo = memberInfoService.getMemberInfo();
    vm.phoneNumber = vm.memberInfo.mobileNo;

    vm.requestOTP = function() {
        var userData = {
            'mobileNo': vm.phoneNumber,
            disablePopupError: true
        };
        api.requestOTP(userData).then(function() {

            vm.isOTPSent = true;

        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.isOTPSent = true;
    vm.requestOTP();

    vm.submit = function() {
        var filterObj = {
            validationType: '1',
            mobileNo: vm.phoneNumber,
            OTP: vm.formData.smsCode,
            disablePopupError: true
        };

        api.verifyOTP(filterObj).then(function() {
            $state.go('dash.changePinStep2');
        }, function(res) {
            vm.formData.smsCode = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };
}

function step2Ctrl($scope, $state, dealerService, DialogService) {
    var vm = this;

    vm.submit = function(pwd) {

        dealerService.setDealerInfo({
            key: vm.key,
            random_factor: vm.randomFactor,
            old_password: pwd
        });

        dealerService.validateOldPin().then(function(result) {
            if(result.chResult.result === '00') {
                $state.go('dash.changePinStep3');
            } else {
                DialogService.alertMsg(result.chResult.msg);
            }
        });

    };
}


function step3Ctrl($scope, $state, dealerService) {

    var vm = this;

    var dealerInfo = dealerService.getDealerInfo();

    vm.key = dealerInfo.key;
    vm.randomFactor  = dealerInfo.random_factor;

    vm.submit = function(pwd) {
        dealerService.setDealerInfo({
            new_password: pwd
        });
        $state.go('dash.changePinStep4');
    };
}

function step4Ctrl($scope, $state, dealerService, DialogService, $ionicHistory, gettextCatalog) {

    var vm = this;

    var dealerInfo = dealerService.getDealerInfo();

    vm.key = dealerInfo.key;
    vm.randomFactor  = dealerInfo.random_factor;

    vm.submit = function(pwd) {
        dealerService.setDealerInfo({
            password_confirm: pwd
        });

        if(dealerService.comparePwd()) {

            dealerService.setDealerInfo({
                password: pwd
            });

            dealerService.changePin().then(function(result) {
                if(result.chResult.result === '00') {
                    DialogService.successWithRedirect(result.chResult.msg, 'dash.dealerInfo');
                } else {
                    DialogService.alertWithRedirect(result.chResult.msg, 'dash.dealerInfo');
                }
            });


        } else {
            DialogService.alertMsg(gettextCatalog.getString('password does not match'));
        }
        $state.go('dash.changePinStep4');
    };
}
