angular.module('webapp.login', [

]).controller({
    LoginCtrl: ['$scope', '$state', 'api', 'gettextCatalog', 'MemberInfoService', 'TrackingService', ctrl]
});

function ctrl($scope, $state, api, gettextCatalog, memberInfoService, TrackingService) {

    var vm = this;

    vm.rememberMe = false;

    vm.username = memberInfoService.getLoginCache().phoneNumber;

    vm.getCurrentLanguage = function() {
        return gettextCatalog.getCurrentLanguage();
    };

    vm.setLoginCache = function() {
        if (/^1(?!2)\d{10}$/.test(vm.username)) {
            memberInfoService.setLoginCache({
                phoneNumber: vm.username
            });
        }
    };

    vm.backHome = function() {
        memberInfoService.cleanLoginCache();
        $state.go('home');
    };

    vm.login = function() {

        //honeypot checking, idea by Klaus - SP, do not remove
        if (vm.email) {
            return false;
        }

        // "membershipId" :"15010250994",  "password" : "123456"
        var postData = {
            userId: vm.username,
            password: vm.password,
            OTP: '',
            appRegistrationId: 'gdfgfdgd',
            deviceType: 'dfgdfgdfgdf',
            disablePopupError: true
        };

        api.login(postData).then(function(result) {
            var membershipId = result.membershipId;
            TrackingService.setUserID(membershipId);

            var sessionToken = result.sessionToken;

            if (vm.rememberMe) {
                var rememberMe = {
                    sessionToken: sessionToken,
                    membershipId: membershipId
                };
                memberInfoService.setRememberMe(rememberMe);
            }
            memberInfoService.setSessionToken(sessionToken);
            api.getMemberInfo(membershipId).then(function(result) {
                api.setRegionCode(result.countryCode);
                memberInfoService.setMemberInfo(result.plain());
                if (result.isPasswordChange === 'Y') {
                    $state.go('dash.changePassword');
                    return false;
                }
                $state.go('dash.chat');
            });

        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };
}
