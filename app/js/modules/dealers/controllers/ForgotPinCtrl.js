angular.module('webapp.dealers').controller({
    ForgotPinStep1Ctrl: ['$scope', '$state', 'api', 'MemberInfoService', 'DEFAULT_SETTING', step1Ctrl],
    ForgotPinStep2Ctrl: ['$scope', '$state', 'DealerService', step2Ctrl],
    ForgotPinStep3Ctrl: ['$scope', '$state', '$ionicHistory', 'DealerService', 'DialogService', step3Ctrl]

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
            $state.go('dash.forgotPinStep2');
        }, function(res) {
            vm.formData.smsCode = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };
}


function step2Ctrl($scope, $state, dealerService) {
    var vm = this;

    vm.submit = function() {
        dealerService.setDealerInfo({
            card_no: vm.cardNO,
            optuser: vm.membershipID
        });
        $state.go('dash.forgotPinStep3');
    };
}

function step3Ctrl($scope, $state, $ionicHistory, dealerService, DialogService) {
    var vm = this;

    vm.submit = function(pwd) {
        dealerService.setDealerInfo({
            key: vm.key,
            password: pwd
        });
        dealerService.forgotPin().then(function(result) {
            if(result.chResult.result === '00') {
                DialogService.successWithRedirect(result.chResult.msg, 'dash.dealerInfo');
            } else {
                DialogService.alertWithRedirect(result.chResult.msg, 'dash.dealerInfo');
            }
        });
    };
}
