angular.module('webapp')
    .run([ 'TrackingService', '$rootScope', '$state', run ]);


function run ( TrackingService, $rootScope, $state ) {

    $rootScope.$on('$ionicView.enter', function( event, current ) {

        var stateName = $state.current.name;
        var pageTitle = stateName.substr(stateName.indexOf(".") + 1);
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

        if (!!current.stateParams && current.stateParams.offerId) {
            pageTitle += ' ID: ' + current.stateParams.offerId;
        }

        TrackingService.setPageTitle(pageTitle);

    });

}
