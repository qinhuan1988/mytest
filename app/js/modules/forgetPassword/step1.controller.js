angular.module('webapp.forgetPassword').controller(
    'ForgetPasswordStep1Ctrl', ['$scope', '$state', '$timeout', 'api', 'MemberInfoService', 'DEFAULT_SETTING', step1Ctrl]
);

function step1Ctrl($scope, $state, $timeout, api, memberInfoService, DEFAULT_SETTING) {

    var vm = this;
    vm.countDown = DEFAULT_SETTING.defaultCountDown;

    var setLoginData = function() {
        vm.loginData = {
            userId: vm.phoneNumber,
            password: '',
            OTP: vm.smsCode,
            appRegistrationId: 'gdfgfdgd',
            deviceType: 'dfgdfgdfgdf',
            disablePopupError: true
        };
    };

    vm.submit = function() {
        setLoginData();
        //validationType == 1  : valid OPT
        //validationType == 2  : valid capchat value
        api.login(vm.loginData).then(function(result) {
            var sessionToken = result.sessionToken;
            var membershipId = result.membershipId;
            memberInfoService.setSessionToken(sessionToken);
            api.getMemberInfo(membershipId).then(function(result) {
                memberInfoService.setMemberInfo(result.plain());
                $state.go('forgetPasswordStep2');
            }, function(res) {
                vm.errorMsg = res.data.errorMessage;
            });
        }, function(res) {
            vm.smsCode = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.setCaptchaId = function(id) {
        vm.captchaId = id;
    };

    vm.isOTPSent = false;
    vm.canValidateOTP = false;

    vm.requestOTP = function() {
        vm.errorMsg = '';
        var userData = {
            'mobileNo': vm.phoneNumber,
            disablePopupError: true
        };
        var filterObj = {
            validationType: '2',
            captchaId: vm.captchaId,
            captchaText: vm.captchaValue,
            disablePopupError: true
        };
        api.verifyOTP(filterObj).then(function(result) {
            if (result.errorCode === '0') {
                api.requestOTP(userData).then(function() {
                    vm.isOTPSent = true;
                    vm.canValidateOTP = true;
                }, function(res) {
                    vm.errorMsg = res.data.errorMessage;
                });
            }
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
            vm.isCaptchaExpired = true;
            vm.captchaValue = '';
        });
    };
}
