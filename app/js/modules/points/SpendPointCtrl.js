angular.module('webapp.spendPoint', [

]).controller({
    SpendPointCtrl: ['$scope', '$state', 'aem', ctrl]
});

function ctrl($scope, $state, aem) {

    var vm = this;

    vm.spendPointsTemplateURL = aem.getSpendPointsMoreTemplateURL();

}