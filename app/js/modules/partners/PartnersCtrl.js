angular.module('webapp.partners', [

]).controller({
    PartnersCtrl: ['$scope', '$state', 'DEFAULT_SETTING', 'aem', ctrl]
});

function ctrl($scope, $state, DEFAULT_SETTING, aem) {
    var vm = this;

    //vm.partnersTemplateUrl = aem.getPartnersTemplateURL();
}
