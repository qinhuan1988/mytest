angular.module('webapp.dealers').controller(
    'ReplaceCardStep1Ctrl', ['$scope', '$state', 'api', 'MemberInfoService', 'DealerService', 'DialogService', 'gettextCatalog', 'DEFAULT_SETTING', step1Ctrl]
);


function step1Ctrl($scope, $state, api, memberInfoService, dealerService, dialogService, gettextCatalog, DEFAULT_SETTING) {

    var vm = this;

    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.memberInfo = memberInfoService.getMemberInfo();
    vm.phoneNumber = vm.memberInfo.mobileNo;

    vm.requestOTP = function() {
        var userData = {
            'mobileNo': vm.phoneNumber
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

        vm.memberInfo = memberInfoService.getMemberInfo();
        vm.phoneNumber = vm.memberInfo.mobileNo;

        var filterObj = {
            validationType: '1',
            mobileNo: vm.phoneNumber,
            OTP: vm.formData.smsCode

        };

        api.verifyOTP(filterObj).then(function() {

            vm.dealer = dealerService.getDealerInfo();

            vm.marketCode = vm.dealer.chMarketCode;

            vm.oldCardNo = vm.dealer.memberCards || '';

            if (vm.oldCardNo === '') {

                dialogService.alertWithRedirect(gettextCatalog.getString('Bank card number does not exist in the system.'), 'dash.dealerInfo');
            } else {
                vm.oldCardNo = vm.dealer.memberCards[0].linkedCardNo;

                var postData = {
                    oldCardNo: vm.oldCardNo
                };

                api.replaceCard(postData).then(function(result) {

                    vm.successMsg = result.chResult;

                    dialogService.alertWithRedirect(gettextCatalog.getString('Your request will be processed.'), 'dash.dealerInfo');

                }, function() {
                    $state.go('dash.dealerInfo');
                });
            }

        }, function() {
            vm.formData.smsCode = '';
        });

    };
}
