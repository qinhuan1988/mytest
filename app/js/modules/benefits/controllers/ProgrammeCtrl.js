angular.module('webapp.benefits').controller({
    ProgrammeCtrl: ['$rootScope', '$scope', '$state', 'AEMData', ctrl]
});


function ctrl($rootScope, $scope, $state, AEMData) {
    var vm = this;

    AEMData.refreshLevels().then(function() {
        vm.levels = AEMData.getLevels();
    });

    AEMData.refreshBenefits().then(function() {
        vm.benefits = AEMData.getBenefits();
    });

    // check if level is in array

    vm.isLevelInBenefit = function(levelName, levelsArray) {
        return _.includes(levelsArray, levelName.toString().toLowerCase());
    };

}
