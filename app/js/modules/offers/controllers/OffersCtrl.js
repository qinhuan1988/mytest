angular.module('webapp.offers').controller({
    OffersCtrl: ['$rootScope', '$stateParams', '$scope', '$state', 'MemberInfoService', 'api', 'OffersService', 'AEMData', '$ionicScrollDelegate', ctrl]
});

function ctrl($rootScope, $stateParams, $scope, $state, memberInfoService, api, offersService, AEMData, $ionicScrollDelegate) {

    var vm = this;

    // init filters

    vm.allShown = true;
    vm.favoritesShown = false;
    vm.byDateShown = false;

    vm.isEmpty = false;

    // init pagination

    var pageLength = 3;
    var currentPage = 0;

    // complete list of all offers
    var benefitsList = [];
    // complete paginated list of all offers
    var paginatedList = [];
    // list displayed
    vm.displayedList = [];

    vm.canLoadMore = false;

    offersService.refreshAllOffers().then(function(result) {
        benefitsList = result;
        if (benefitsList.length === 0) {
            vm.isEmpty = true;
        }
        paginatedList = _.chunk(benefitsList, pageLength);
        vm.canLoadMore = true;
    });

    vm.loadMoreOffers = function() {
        if (paginatedList[currentPage]) {
            vm.displayedList = _.concat(vm.displayedList, paginatedList[currentPage++]);
        } else {
            vm.canLoadMore = false;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicScrollDelegate.resize();
    };

    vm.refreshView = function() {
        currentPage = 0;
        vm.canLoadMore = false;
        vm.isEmpty = false;
        $rootScope.pullToRefresh = 1;
        if (vm.allShown) {
            updateAllOffers();
        } else if (vm.favoritesShown) {
            updateFavorites();
        } else if (vm.byDateShown) {
            updateDateAsc();
        }
    };



    vm.showList = function(type) {
        currentPage = 0;
        vm.isEmpty = false;
        vm.canLoadMore = false;
        vm.allShown = type === 'all' ? true : false;
        vm.favoritesShown = type === 'fav' ? true : false;
        vm.byDateShown = type === 'date' ? true : false;
        vm.filter = type;
        switch (vm.filter) {
            case 'all':
                updateAllOffers();
                break;
            case 'fav':
                updateFavorites();
                break;
            case 'date':
                updateDateAsc();
                break;
            default:
                break;
        }
    };


    // all offers

    function updateAllOffers() {

        offersService.refreshAllOffers().then(function(result) {
            vm.displayedList = [];
            benefitsList = result;
            if (benefitsList.length === 0) {
                vm.isEmpty = true;
            }
            paginatedList = _.chunk(benefitsList, pageLength);
            vm.canLoadMore = true;
        }).finally(function() {
            $rootScope.pullToRefresh = 0;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicScrollDelegate.resize();
        });

    }

    // favorites

    function updateFavorites() {
        offersService.refreshFavorites().then(function(result) {
            vm.displayedList = [];
            benefitsList = result;
            if (benefitsList.length === 0) {
                vm.isEmpty = true;
            }
            paginatedList = _.chunk(benefitsList, pageLength);
            vm.canLoadMore = true;
        }).finally(function() {
            $rootScope.pullToRefresh = 0;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicScrollDelegate.resize();
        });
    }

    // date Ascending

    function updateDateAsc() {
        offersService.refreshDateAsc().then(function(result) {
            vm.displayedList = [];
            benefitsList = result;
            if (benefitsList.length === 0) {
                vm.isEmpty = true;
            }
            paginatedList = _.chunk(benefitsList, pageLength);
            vm.canLoadMore = true;
        }).finally(function() {
            $rootScope.pullToRefresh = 0;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicScrollDelegate.resize();
        });
    }

    // show details of an offer

    vm.showOfferInfo = function(offerInfo) {
        offersService.setCurrentOfferInfo(offerInfo);

        var params = {
            offerId: offerInfo.itemId
        };

        if (vm.favoritesShown) {
            params.isFavorite = true;
        }

        $state.go('dash.offerInfo', params);
    };

}
