describe('MobilityServices controller', function(){

    // assign to global variables in order to be accessible from specs

    var $scope,
        ctrl,
        mockExternalLinks,
        mockExternalLinksService;

    // mock injected modules in order to UNIT test

    mockExternalLinksService = {
        openURLInDeviceBrowser: angular.noop
    };
    mockExternalLinks = {
        getReachnowLink: angular.noop
    };



    beforeEach(module('webapp'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {

        $scope = _$rootScope_.$new();
        $controller = _$controller_;

        ctrl = $controller('MobilityServicesCtrl', {
            $scope: $scope,
            externalLinks: mockExternalLinks,
            ExternalLinksService: mockExternalLinksService
        });

    }));


    // actual specs

    describe('links', function () {
        it('should be defined for reachNow', function () {
            expect(ctrl.getReachNowLink).toBeDefined();
        });
    });

    it('should opens links in device browser', function() {
        spyOn(mockExternalLinksService, 'openURLInDeviceBrowser');
        ctrl.openLink('https://www.foo.com');
        expect(mockExternalLinksService.openURLInDeviceBrowser).toHaveBeenCalledWith('https://www.foo.com');
    });
});
