angular.module('webapp.registration', [

]).controller({
    RegistrationCtrl: ['$scope', '$state', 'api', 'DEFAULT_SETTING', '$ionicHistory', 'MemberInfoService', ctrl]
});

function ctrl($scope, $state, api, DEFAULT_SETTING, $ionicHistory, memberInfoService) {

    //shared object in each steps
    $scope.registrationObject = {};

    var vm = this;

    vm.registrationGoback = function() {
        if($state.current.name == 'registration.step1') {
            memberInfoService.cleanLoginCache();
        	$ionicHistory.clearCache();
            $state.go('home');
        } else {
            $ionicHistory.goBack();
        }
    };

}
