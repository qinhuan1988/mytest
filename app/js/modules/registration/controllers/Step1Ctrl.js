angular.module('webapp.registration.step1', [

]).controller({
    Step1Ctrl: ['$scope', '$state', 'MemberInfoService', 'DEFAULT_SETTING', 'api', '$ionicModal', 'DialogService', 'aem', 'aemModalService', 'TrackingService', 'gettextCatalog', ctrl]
});

function ctrl($scope, $state, memberInfoService, DEFAULT_SETTING, api, $ionicModal, DialogService, aem, aemModalService, TrackingService, gettextCatalog) {

    var vm = this;

    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.isOTPSent = false;
    vm.canValidateOTP = false;
    vm.formData = {};

    vm.formData.phoneNumber = memberInfoService.getLoginCache().phoneNumber;
    vm.errors = {
        otpErrorMessage: ''
    };

    vm.checkIfPhoneValidated = function() {
        if ($scope.registrationObject.phoneNumber) {
            if ($scope.registrationObject.phoneNumber === vm.formData.phoneNumber) {
                vm.canValidateOTP = true;
            } else {
                vm.canValidateOTP = false;
                vm.formData.OTP = '';
            }
        }
        vm.setLoginCache();
    };


    vm.setLoginCache = function() {
        if (/^1(?!2)\d{10}$/.test(vm.formData.phoneNumber)) {
            memberInfoService.setLoginCache({
                phoneNumber: vm.formData.phoneNumber
            });
        }
    };


    vm.setCaptchaId = function(id) {
        vm.captchaId = id;
    };

    var verifyMobileNo = function() {
        var filterObj = {
            mobileNo: $scope.registrationObject.phoneNumber,
            disablePopupError: true
        };
        api.verifyMobileNo(filterObj).then(function() {
            vm.isOTPSent = true;
            vm.canValidateOTP = true;
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    var checkDuplication = function() {
        var filterObj = {
            mobileNumber: vm.formData.phoneNumber,
            disablePopupError: true
        };
        api.chkDupEnrollment(filterObj).then(function() {
            verifyMobileNo();
        }, function(res) {
            $scope.registrationObject.phoneNumber = '';
            vm.isCaptchaExpired = true;
            vm.formData.captchaText = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.requestOTP = function() {
        var filterObj = {
            validationType: '2',
            captchaId: vm.captchaId,
            captchaText: vm.formData.captchaText,
            disablePopupError: true
        };
        api.verifyOTP(filterObj).then(function() {
            $scope.registrationObject.captchaText = vm.formData.captchaText;
            vm.errorMsg = '';
            if ($scope.registrationObject.phoneNumber !== vm.formData.phoneNumber) {
                checkDuplication();
            } else {
                vm.isOTPSent = true;
                vm.canValidateOTP = true;
            }
            // saving user info into registration object
            $scope.registrationObject.firstName = vm.formData.firstName;
            $scope.registrationObject.lastName = vm.formData.lastName;
            $scope.registrationObject.phoneNumber = vm.formData.phoneNumber;
        }, function(res) {
            vm.isCaptchaExpired = true;
            vm.formData.captchaText = '';
            vm.errorMsg = res.data.errorMessage;
        });
    };

    var loginUser = function(userId, password) {
        var postData = {
            userId: userId,
            password: password,
            disablePopupError: true
        };
        api.login(postData).then(function(result) {
            var membershipId = result.membershipId;
            TrackingService.setUserID(membershipId);

            var sessionToken = result.sessionToken;
            memberInfoService.setSessionToken(sessionToken);

            api.getMemberInfo(membershipId).then(function(result) {
                api.setRegionCode(result.countryCode);
                memberInfoService.setMemberInfo(result.plain());
                $state.go('registration.congratulationMsg');
            });
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    var enrollUser = function() {
        $scope.registrationObject.firstName = vm.formData.firstName;
        $scope.registrationObject.lastName = vm.formData.lastName;
        $scope.registrationObject.phoneNumber = vm.formData.phoneNumber;
        var postData = {
            mobileNumber: $scope.registrationObject.phoneNumber,
            firstName: $scope.registrationObject.firstName,
            lastName: $scope.registrationObject.lastName,
            disablePopupError: true,
            isAutoLogin: "Y"
        };
        api.enrollment(postData).then(function(result) {
            loginUser(result.membershipId, result.password);
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.enroll = function() {
        var filterObj = {
            validationType: '1',
            mobileNo: $scope.registrationObject.phoneNumber,
            OTP: vm.formData.OTP,
            disablePopupError: true
        };
        $scope.registrationObject.OTP = vm.formData.OTP;
        vm.formData.OTP = '';
        api.verifyOTP(filterObj)
            .then(function() {
                vm.formData.OTP = $scope.registrationObject.OTP;
                vm.errors.otpErrorMessage = '';
                enrollUser();
            })
            .catch(function(res) {
                vm.errors.otpErrorMessage = res.data.errorMessage;
            });
    };

    /*
     * show AEM content functions
     */

    vm.showTCForBMW = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('BMW Terms and Conditions'), aem.getTermsAndConditionsTemplateURL('bmw'));
    };

    vm.showTCForCustomer = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Terms & Conditions for customer consent'), aem.getTermsAndConditionsTemplateURL('customer-consent'));
    };
}
