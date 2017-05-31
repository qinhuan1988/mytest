angular.module('webapp.requestOTP', [

]).controller({
    RequestOTPCtrl: ['$scope', '$state', '$timeout', 'MemberInfoService', 'api', 'DEFAULT_SETTING', ctrl]
});

function ctrl($scope, $state, $timeout, memberInfoService, api, DEFAULT_SETTING) {

    var vm = this;
    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.phoneNumber = memberInfoService.getLoginCache().phoneNumber;

    vm.setLoginCache = function() {
        if (/^1(?!2)\d{10}$/.test(vm.phoneNumber)) {
            memberInfoService.setLoginCache({
                phoneNumber: vm.phoneNumber
            });
        }
    };

    vm.isOTPSent = false;
    vm.canValidateOTP = false;

    vm.setCaptchaId = function(id) {
        vm.captchaId = id;
    };

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

    var setPostData = function() {
        vm.postData = {
            userId: vm.phoneNumber,
            password: '',
            OTP: vm.smsCode,
            appRegistrationId: 'gdfgfdgd',
            deviceType: 'dfgdfgdfgdf',
            disablePopupError: true
        };
    };

    vm.submit = function() {
        vm.errorMsg = '';
        setPostData();

        api.login(vm.postData).then(function(result) {
            var sessionToken = result.sessionToken;
            var membershipId = result.membershipId;
            if (vm.rememberMe) {
                var rememberMe = {
                    sessionToken: sessionToken,
                    membershipId: membershipId
                };
                memberInfoService.setRememberMe(rememberMe);
            }
            memberInfoService.setSessionToken(sessionToken);
            api.getMemberInfo(membershipId).then(function(result) {
                memberInfoService.setMemberInfo(result.plain());
                $state.go('dash.chat');
            });
        }, function(res) {
            vm.smsCode = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };

}
