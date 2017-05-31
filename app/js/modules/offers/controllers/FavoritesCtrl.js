angular.module('webapp.offers').controller({
    FavoritesCtrl: ['$rootScope', '$scope', '$state', 'OffersService', 'api', '$ionicScrollDelegate', ctrl]
});

function ctrl($rootScope, $scope, $state, offersService, api, $ionicScrollDelegate) {


    var vm = this;

    // init pagination

    var pageLength = 3;
    var currentPage = 0;


    vm.isEmpty = false;


    // complete list of all favorites vouchers
    var favoritesList = [];
    // complete paginated list of all offers
    var paginatedList = [];
    // list displayed
    vm.displayedList = [];

    vm.canLoadMore = false;



    offersService.refreshFavorites().then(function(result) {
        favoritesList = result;
        if (favoritesList.length === 0) {
            vm.isEmpty = true;
        }
        paginatedList = _.chunk(favoritesList, pageLength);
        vm.canLoadMore = true;
    });

    vm.loadMore = function() {
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
        offersService.refreshFavorites().then(function(result) {
            vm.displayedList = [];
            favoritesList = result;
            if (favoritesList.length === 0) {
                vm.isEmpty = true;
            }
            paginatedList = _.chunk(favoritesList, pageLength);
            vm.canLoadMore = true;
        }).finally(function() {
            $rootScope.pullToRefresh = 0;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicScrollDelegate.resize();
        });
    };

    // show details of an offer

    vm.showOfferInfo = function(offerInfo) {
        offersService.setCurrentOfferInfo(offerInfo);
        var params = {
            offerId: offerInfo.itemId
        };
        $state.go('dash.offerInfo', params);
    };


}
