angular.module('webapp.common').controller({
    IFrameContainer: ['$scope', 'externalLinks', 'IFrameContainerService', ctrl]
}).service({
    IFrameContainerService: iFrameContainerService
});

function ctrl($scope, externalLinks, iFrameContainerService) {
    var vm = this;
    vm.externalLink = iFrameContainerService.getExternalLink() || '';
}

function iFrameContainerService() {

    var externalLink = '';

    var setExternalLink = function(link) {
        externalLink = link;
    };

    var getExternalLink = function() {
        return externalLink;
    };

    return {
        setExternalLink: setExternalLink,
        getExternalLink: getExternalLink
    };
}
