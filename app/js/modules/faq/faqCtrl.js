angular.module('webapp.faq', [

]).controller({
    FaqCtrl: ['$rootScope','$scope', 'aem', ctrl]
});

function ctrl($rootScope,$scope, aem) {
    var vm = this;
    $rootScope.isLoadAEM = 1;
    vm.FAQTemplateURL = aem.getFAQTemplateURL();
}
