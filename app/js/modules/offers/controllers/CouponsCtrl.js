angular.module('webapp.offers').controller({
    CouponsCtrl: ['$rootScope', '$scope', '$state', 'CouponsService', '$ionicPopup', '$ionicScrollDelegate', ctrl]
});

function ctrl($rootScope, $scope, $state, couponsService, $ionicPopup, $ionicScrollDelegate) {

    var vm = this;

    // init pagination

    var pageLength = 3;
    var currentPage = 0;


    vm.isEmpty = false;


    // complete list of all coupons
    var couponsList = [];
    // complete paginated list of all offers
    var paginatedList = [];
    // list displayed
    vm.displayedList = [];

    vm.canLoadMore = false;


    couponsService.refreshCouponsList().then(function(result) {
        couponsList = result;
        if (couponsList.length === 0) {
            vm.isEmpty = true;
        }
        paginatedList = _.chunk(couponsList, pageLength);
        vm.canLoadMore = true;
    });

    vm.loadMoreCoupons = function() {
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
        couponsService.refreshCouponsList().then(function(result) {
            vm.displayedList = [];
            couponsList = result;
            if (couponsList.length === 0) {
                vm.isEmpty = true;
            }
            paginatedList = _.chunk(couponsList, pageLength);
            vm.canLoadMore = true;
        }).finally(function() {
            $rootScope.pullToRefresh = 0;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicScrollDelegate.resize();
        });
    };

    // redirect to coupons details page

    vm.showCouponInfo = function(couponInfo) {
        couponsService.setCouponInfo(couponInfo);
        $state.go('dash.couponInfo', {
            couponId: couponInfo.voucherId
        });
    };


}
