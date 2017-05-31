describe('BrandShopInfo controller', function(){

    // assign to global variables in order to be accessible from specs

    var $scope,
        $rootScope,
        mockBrandShopsService,
        mockStateParams,
        $q,
        ctrl;

    // mock injected modules in order to UNIT test

    mockBrandShopsService = {
        getBrand: angular.noop,
        getBrandItems: angular.noop,
        getBrandSliderAssets: angular.noop
    };
    mockIonicSlideBoxDelegate = {
        $getByHandle: function () {
            return {
                update: angular.noop
            };
        },
        getBrandItems: angular.noop
    };
    mockStateParams = {
        name: 'bmw'
    };



    beforeEach(module('webapp'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$q_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $q = _$q_;

        // here global spies, on spies on functions called at init

        spyOn(mockBrandShopsService, 'getBrand').and.returnValue(
            $q.when('foo')
        );
        spyOn(mockBrandShopsService, 'getBrandItems');
        spyOn(mockBrandShopsService, 'getBrandSliderAssets').and.returnValue(
            $q.when(['image1', 'image2'])
        );

        ctrl = $controller('BrandShopInfoCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            $stateParams: mockStateParams,
            $ionicSlideBoxDelegate: mockIonicSlideBoxDelegate,
            BrandShopsService: mockBrandShopsService
        });

    }));


    // actual specs


    describe('on init', function () {
        it('should get brand\'s data', function() {
            expect(mockBrandShopsService.getBrand).toHaveBeenCalledWith('bmw');
        });

        it('should get brand\'s items', function() {
            $scope.$digest();
            expect(mockBrandShopsService.getBrandItems).toHaveBeenCalledWith('foo');
        });

        it('should get brand\'s slider assets', function () {
           $scope.$digest();
           expect(mockBrandShopsService.getBrandSliderAssets).toHaveBeenCalledWith('foo');
       });

        it('should load brand\'s template', function () {
            expect(ctrl.externalLinksTemplate).toBeDefined();
        });
    });

});
