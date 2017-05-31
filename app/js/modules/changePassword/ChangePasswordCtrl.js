angular.module('webapp.changePassword', [

]).controller({
    ChangePasswordCtrl: ['$scope', '$state', 'DialogService', 'api', 'MemberInfoService', 'gettextCatalog', ctrl]
});

function ctrl($scope, $state, DialogService, api, memberInfoService, gettextCatalog) {

    var vm = this;

    var setPostData = function() {
        vm.postData = {
            newPassword: vm.newPassword,
            membershipId: memberInfoService.getMemberInfo().membershipId,
            disablePopupError: true
        };
    };

    vm.setCaptchaId = function(id) {
        vm.captchaId = id;
    };

    vm.submit = function() {
        setPostData();

        var filterObj = {
            validationType: '2',
            captchaId: vm.captchaId,
            captchaText: vm.captchaValue,
            disablePopupError: true,
            isCommunicationSent: 'Y'
        };

        api.verifyOTP(filterObj).then(function(result) {
            if(result.errorCode === '0') {
                api.changePassword(vm.postData)
                    .then(function() {
                        DialogService.successWithRedirect( gettextCatalog.getString('Success'), 'dash.myProfile');
                    }, function(res) {
                        vm.errorMsg = res.data.errorMessage;
                    });
            }
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
            vm.captchaValue = '';
            vm.isCaptchaExpired = true;
        });
    };
}
