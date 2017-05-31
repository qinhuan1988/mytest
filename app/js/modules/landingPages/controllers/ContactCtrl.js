angular.module('webapp.landingPages').controller({
    ContactCtrl: ['$scope', '$state', 'aem', 'gettextCatalog', 'ExternalLinksService', 'externalLinks', 'DialogService', ctrl]
});

function ctrl($scope, $state, aem, gettextCatalog, externalLinksService, externalLinks, dialogService) {

    var vm = this;

    // feedback

    vm.feedback = function() {
        var link = externalLinks.shareFeedback();
        externalLinksService.openURL(link);
    };

    // request quotation

    vm.requestQuotation = function() {
        var link = externalLinks.requestYourQuotation();
        externalLinksService.openURL(link);
    };

    // call us

    vm.call = function(mobileNo) {
        var msg = gettextCatalog.getString('Please dial our 7x24 customer service hotline:') + mobileNo;
        var sucessCallback = function() {
            externalLinksService.callPhone(mobileNo);
        };
        dialogService.confirmCallPopup(msg, sucessCallback);
    };

    // email us

    vm.email = function(email) {
        var msg = gettextCatalog.getString('Please E-mail us to:') + email;
        var sucessCallback = function() {
            externalLinksService.sendEmail(email);
        };
        dialogService.confirmEmailPopup(msg, sucessCallback);
    };

    // open FAQ page

    vm.faq = function() {
        var link = externalLinks.contactFaq();
        externalLinksService.openURL(link);
    };


}
