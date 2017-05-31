describe('Add Dealer Partial controller', function () {

    // assign to global variables in order to be accessible from specs

    var scope,
        mockApi,
        mockAem,
        mockAemModalService,
        mockGettextCatalog,
        deferred;


    // mock injected modules in order to UNIT test

    mockApi = {};
    mockAem = {
        getTermsAndConditionsTemplateURL: angular.noop
    };
    mockAemModalService = {
        showModal: angular.noop
    };
    mockGettextCatalog = {
        getString: angular.noop
    };


    beforeEach(module('webapp.dealers'));

    beforeEach(inject(function ($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();

        scope.partial = {
            formData: {},
            getDealerListFilterObj: {}
        };

        mockApi.getProvince = function () {
            return deferred.promise;
        };
        mockApi.getCity = function () {
            return deferred.promise;
        };
        mockApi.getDealers = function () {
            return deferred.promise;
        };

        spyOn( mockApi, 'getProvince' ).and.callThrough();
        spyOn( mockApi, 'getCity' ).and.callThrough();
        spyOn( mockApi, 'getDealers' ).and.callThrough();

        $controller('AddDealerPartialCtrl', {
            $scope: scope,
            api: mockApi,
            aem: mockAem,
            aemModalService: mockAemModalService,
            gettextCatalog: mockGettextCatalog
        });
    }));


    // actual specs

    describe('On init', function () {

        it('should polulates provinces select', function () {
            expect( mockApi.getProvince ).toHaveBeenCalled();
        });

        it('should polulates cities select', function () {
            expect( mockApi.getCity ).toHaveBeenCalled();
        });

        it('should polulates dealers select', function () {
            expect( mockApi.getDealers ).toHaveBeenCalled();
        });

    });

    describe('On user selection', function () {

        it('should get cities for new province selection', function () {
            scope.onProvinceChange( 123 );
            expect( mockApi.getCity ).toHaveBeenCalled();
        });

        it('should get dealers for new city selection', function () {
            scope.onCityChange( 123, 123 );
            expect( mockApi.getDealers ).toHaveBeenCalled();
        });

        it('should get dealer ToC for a new dealer', function () {
            spyOn( mockAem, 'getTermsAndConditionsTemplateURL' ).and.callThrough();
            scope.onDealerChange();
            expect( mockAem.getTermsAndConditionsTemplateURL ).toHaveBeenCalled();
        });

    });

    describe('Dealer ToC', function () {

        it('should be false by default', function () {
            expect(scope.partial.formData.isAgreed).toBeFalsy();
        });

        it('should be resettted when changing dealer', function () {
            scope.partial.formData.dealer = '1';
            scope.partial.formData.isAgreed = true;

            scope.$digest();

            scope.partial.formData.dealer = '2';

            scope.$digest();
            expect(scope.partial.formData.isAgreed).toBeFalsy();
        });

        it('should allow to read it', function () {
            spyOn( mockAemModalService, 'showModal' ).and.callThrough();
            scope.showDealerTC();
            expect( mockAemModalService.showModal ).toHaveBeenCalled();
        });

    });

});
