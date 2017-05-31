angular.module('webapp.benefits').controller({
    BenefitsCtrl: ['LocaleService', ctrl]
});


function ctrl(localeService) {

    var vm = this;

    vm.assetsPath = "img/benefits/" + localeService.gettextLang() + "/";

}
