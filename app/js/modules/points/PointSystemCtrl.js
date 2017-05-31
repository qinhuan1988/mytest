angular.module('webapp.pointSystem', [

]).controller({
    PointSystemCtrl: ['$scope', '$state', 'aem', ctrl]
});

function ctrl($scope, $state, aem) {

    var vm = this;

    vm.pointsListTemplateURL = aem.getPointsListTemplateURL();

}
