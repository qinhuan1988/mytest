describe('ExternalLinks service', function () {

    // assign to global variables in order to be accessible from specs

    var ExternalLinksService;




    beforeEach(module('webapp'));

    // mock injected modules in a service

    beforeEach(function () {

        mockDialogService = {
            confirmExitAppFromLink: angular.noop
        };
        module(function ($provide) {
            $provide.value('DialogService', mockDialogService);
        });

    });

    beforeEach(inject(function (_ExternalLinksService_) {

        ExternalLinksService = _ExternalLinksService_;

    }));




    describe('interface contract', function () {
        it('should expose openURL', function () {
            expect(ExternalLinksService.openURL).toBeDefined();
        });
        it('should expose openURLInDeviceBrowser', function () {
            expect(ExternalLinksService.openURLInDeviceBrowser).toBeDefined();
        });
        it('should expose callPhone', function () {
            expect(ExternalLinksService.callPhone).toBeDefined();
        });
        it('should expose sendEmail', function () {
            expect(ExternalLinksService.sendEmail).toBeDefined();
        });
    });

    it('should ask confirmation of user when leaving the app', function () {
        spyOn(mockDialogService, 'confirmExitAppFromLink');
        ExternalLinksService.openURLInDeviceBrowser('https://www.foo.com');
        expect(mockDialogService.confirmExitAppFromLink).toHaveBeenCalled();
    });

});
