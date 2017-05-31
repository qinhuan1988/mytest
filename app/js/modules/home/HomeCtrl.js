angular.module('webapp.home', [])
    .controller('HomeCtrl', [
        '$state',
        '$scope',
        'aem',
        'MemberInfoService',
        'api',
        'gettextCatalog',
        'aemModalService',
        'AEMData',
        'TrackingService',
        ctrl
    ]);


function ctrl(
    $state,
    $scope,
    aem,
    memberInfoService,
    api,
    gettextCatalog,
    aemModalService,
    AEMData,
    TrackingService
) {


    var vm = this;
    $scope.$parent.isHomePage = true;
    var rememberMe = memberInfoService.getRememberMe();

    if (rememberMe !== null) {
        memberInfoService.setSessionToken(rememberMe.sessionToken);

        // if api succeed, sessionToken is still valid
        api.getMemberInfo( rememberMe.membershipId )
            .then(function ( result ) {
                TrackingService.setUserID( rememberMe.membershipId );
                api.setRegionCode( result.countryCode );
                memberInfoService.setMemberInfo( result.plain() );
                $state.go( 'dash.chat' );
            });
    }

    $scope.getCurrentLanguage = function() {
        return gettextCatalog.getCurrentLanguage();
    };

    vm.showAbout = function() {
        aemModalService.showModal(
            $scope,
            gettextCatalog.getString('about-title-before-login'),
            aem.getAboutUsTemplateURL(),
            'js/modules/aem/aemLogoModalTemplate.html'
        );
    };

    vm.showEarnPoints = function() {
        aemModalService.showModal(
            $scope,
            gettextCatalog.getString('Earn Points'),
            'js/modules/benefits/templates/pointsRules.html',
            'js/modules/aem/aemLogoModalTemplate.html'
        );
    };

    AEMData.refreshLevels().then(function() {
        $scope.levels = AEMData.getLevels();
    });

}
