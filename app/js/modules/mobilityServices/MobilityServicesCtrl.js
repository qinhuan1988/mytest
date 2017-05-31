angular.module('webapp.dash')
    .controller({
        MobilityServicesCtrl: ['$scope', 'externalLinks', 'ExternalLinksService', ctrl]
    });


function ctrl ($scope, externalLinks, ExternalLinksService) {

    var vm = this;

    vm.getReachNowLink = externalLinks.getReachnowLink;

    vm.openLink = function (URL) {
        ExternalLinksService.openURLInDeviceBrowser(URL);
    };    

}
