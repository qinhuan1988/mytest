angular.module('webapp.earnPoint', [

]).controller({
    EarnPointCtrl: ['$scope', '$state', 'aem', ctrl]
});

function ctrl($scope, $state, aem) {

    var vm = this;

    vm.earnPointsTemplateURL = aem.getEarnPointsMoreTemplateURL();

}
