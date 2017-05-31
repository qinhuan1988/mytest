describe('MyWallet controller', function(){

    // assign to global variables in order to be accessible from specs

    var $scope,
        $rootScope,
        $state,
        mockStateParams,
        $ionicModal,
        $interval,
        $q,
        $controller,
        gettextCatalog,
        mockMyWalletService,
        mockBankCardService,
        mockOffersService,
        mockVehiclesService;

    // mock injected modules in order to UNIT test

    mockOffersService = {
        getTotalCommunicatedValue: function () {
            return {
                'allOffers': 1
            };
        }
    };
    mockMyWalletService = {
        generateQRCode: angular.noop,
        getQRValue: angular.noop,
        roundRobinQRCode: angular.noop,
        getRBValue: angular.noop
    };
    mockBankCardService = {
        getUserCards: angular.noop
    };
    mockStateParams = {
        'from': ''
    };



    beforeEach(module('webapp'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$q_) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $q = _$q_;

        // here as this following mock needs to access to $q

        mockVehiclesService = {
            getVehiclesList: function () {
                return [];
            },
            refreshVehiclesList: function () {
                return $q.when();
            }
        };

        // here global spies, on spies on functions called at init

        spyOn(mockVehiclesService, 'refreshVehiclesList').and.callThrough();

        $controller('MyWalletCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            $state: $state,
            $stateParams: mockStateParams,
            $ionicModal: $ionicModal,
            gettextCatalog: gettextCatalog,
            OffersService: mockOffersService,
            MyWalletService: mockMyWalletService,
            BankCardService: mockBankCardService,
            VehiclesService: mockVehiclesService
        });


    }));


    // actual specs

    it('should get vehicles data from api', function() {
        expect(mockVehiclesService.refreshVehiclesList).toHaveBeenCalled();
    });
});
