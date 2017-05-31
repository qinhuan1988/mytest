angular.module('webapp.about', [

]).controller({
    AboutCtrl: ['$scope', '$state', 'DEFAULT_SETTING', 'aem', ctrl]
});

function ctrl($scope, $state, DEFAULT_SETTING, aem) {
    var vm = this;
    vm.aboutUsMoreTemplateURL = aem.getAboutUsMoreTemplateURL();
}
