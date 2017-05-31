describe('BrandShops service', function () {

    // assign to global variables in order to be accessible from specs

    var BrandShopService,
        mockAEMData,
        $rootScope,
        $q;




    beforeEach(module('webapp'));

    // mock injected modules in a service

    beforeEach(function () {

        mockAEMData = {
            refreshBrands: angular.noop,
            getBrandItems: angular.noop,
            getBrandSliderAssets: angular.noop
        };
        module(function ($provide) {
            $provide.value('AEMData', mockAEMData);
        });

    });

    beforeEach(inject(function (_BrandShopsService_, _$q_, _$rootScope_) {

        BrandShopService = _BrandShopsService_;
        $q = _$q_;
        $rootScope = _$rootScope_;

    }));





    describe('interface contract', function () {
        it('should expose getBrand', function () {
            expect(BrandShopService.getBrand).toBeDefined();
        });
        it('should expose getBrandItems', function () {
            expect(BrandShopService.getBrandItems).toBeDefined();
        });
    });

    it('should expose getBrandSliderAssets', function () {
        expect(BrandShopService.getBrandSliderAssets).toBeDefined();
    });

    it('getBrand should get all brands and filter internally', function () {
        var deferred = $q.defer();
        spyOn(mockAEMData, 'refreshBrands').and.returnValue(deferred.promise);

        BrandShopService.getBrand('360')
            .then(function (res) {
                expect(res).toEqual({
                    pageName: '360'
                });
            });

        deferred.resolve([{
            pageName: 'baidu'
        }, {
            pageName: '360'
        }, {
            pageName: 'tencent'
        }]);
        $rootScope.$digest();
    });

});
