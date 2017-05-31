angular.module('webapp.benefits').controller({
    PointsCtrl: ['aem', 'AEMData','$scope', ctrl]
});

function ctrl(aem, AEMData, $scope) {

    var vm = this;

    AEMData.refreshLevels().then(function() {
        $scope.levels = AEMData.getLevels();
    });

}
