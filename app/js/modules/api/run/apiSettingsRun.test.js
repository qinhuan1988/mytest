describe('Api Settings Run', function () {


    var httpBackend,
        dialogService,
        rootScope,
        mockState,
        mockDialogService;


    mockState = {
        current: {}
    };
    mockDialogService = {
        alertMsg: angular.noop,
        alertWithRedirect: angular.noop
    };



    beforeEach(module('webapp'));

    beforeEach(function () {
        module(function ( $provide ) {
            $provide.value( '$state', mockState );
        });

        module(function ( $provide ) {
            $provide.value( 'DialogService', mockDialogService );
        });
    });

    beforeEach(inject(function ( $httpBackend, Restangular, $rootScope, $state ) {

        httpBackend = $httpBackend;
        rootScope = $rootScope;

        spyOn(mockDialogService, 'alertMsg');
        spyOn(mockDialogService, 'alertWithRedirect');
        spyOn(rootScope, '$emit');

        Restangular.one('foo').get();

    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });




    describe('on api errors', function () {

        describe('on root page', function () {

            it('should not logout page before login if session token is invalid', function () {
                var data = {
                    errorCode: '-1225'
                };
                mockState.current.url = '/';
                httpBackend.expect( 'GET', /(.+)foo(.+)/ ).respond( 400, data );
                httpBackend.flush();

                expectNotLogout();
            });

            it('should not logout page before login if session token is expired', function () {
                var data = {
                    errorCode: '-1227'
                };
                mockState.current.url = '/';
                httpBackend.expect( 'GET', /(.+)foo(.+)/ ).respond( 400, data );
                httpBackend.flush();

                expectNotLogout();
            });

        });

        describe('on others pages', function () {

            it('should logout if session token is invalid', function () {
                mockState.current.url = '/foo';
                httpBackend.expect( 'GET', /(.+)foo(.+)/ ).respond( 400, {
                    errorCode: '-1225'
                });
                httpBackend.flush();

                expectLogout();
            });

            it('should logout if session token is expired', function () {
                mockState.current.url = '/foo';
                httpBackend.expect( 'GET', /(.+)foo(.+)/ ).respond( 400, {
                    errorCode: '-1227'
                });
                httpBackend.flush();

                expectLogout();
            });

        });

        it('should show a dialog on status -1', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(-1);
            httpBackend.flush();

            expect(mockDialogService.alertMsg).toHaveBeenCalled();
        });


        it('should show a dialog on status 0', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(0);
            httpBackend.flush();

            expect(mockDialogService.alertMsg).toHaveBeenCalled();
        });


        it('should show a dialog on status 400', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(400, {
                data: {
                    errorMessage: 'foo'
                }
            });
            httpBackend.flush();

            expect(mockDialogService.alertMsg).toHaveBeenCalled();
        });


        it('should logout on status 401', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(401);
            httpBackend.flush();

            expect(rootScope.$emit).toHaveBeenCalledWith('app:logout');
            expect(mockDialogService.alertWithRedirect).toHaveBeenCalled();
        });


        it('should show a dialog on status 500', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(500, {
                data: {
                    errorMessage: 'foo'
                }
            });
            httpBackend.flush();

            expect(mockDialogService.alertMsg).toHaveBeenCalled();
        });

        it('should show a dialog on status 503', function () {
            httpBackend.expect('GET', /(.+)foo(.+)/).respond(503);
            httpBackend.flush();

            expect(mockDialogService.alertMsg).toHaveBeenCalled();
        });

    });

    function expectLogout () {
        expect( rootScope.$emit ).toHaveBeenCalledWith( 'app:logout' );
        expect( mockDialogService.alertWithRedirect ).toHaveBeenCalled();
    }

    function expectNotLogout () {
        expect( rootScope.$emit ).not.toHaveBeenCalled();
        expect( mockDialogService.alertWithRedirect ).not.toHaveBeenCalled();
    }

});
