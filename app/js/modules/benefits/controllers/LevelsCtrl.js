angular.module('webapp.benefits').controller({
    LevelsCtrl: ['$rootScope', '$scope', '$state', 'AEMData', ctrl]
});


function ctrl($rootScope, $scope, $state, AEMData) {
    var vm = this;

    AEMData.refreshLevels().then(function() {
        vm.list = AEMData.getLevels();
    });

}
