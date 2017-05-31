angular.module('webapp.forgetPassword').controller(
    'ForgetPasswordStep2Ctrl', ['$state', 'api', 'MemberInfoService', '$ionicHistory', ctrl]
);


function ctrl ($state, api, memberInfoService, $ionicHistory) {

    var vm = this;
    var memberInfo = memberInfoService.getMemberInfo();


    vm.changePassword = function() {
        api.changePassword(getPostData())
            .then(goToChat)
            .catch(function (error) {
                vm.errorMsg = error.data.errorMessage;
            });
    };

    function getPostData () {
        return {
            newPassword: vm.newPassword,
            membershipId: memberInfo.membershipId,
            disablePopupError: true,
            isCommunicationSent: 'Y'
        };
    }

    function goToChat () {
        $ionicHistory.clearCache();
        $state.go('dash.chat');
    }

}
