angular.module('webapp.dealers').controller(
    'DealersCtrl', [
        '$scope',
        '$state',
        'MemberInfoService',
        '$ionicSlideBoxDelegate',
        'DealerService',
        'LocaleService',
        ctrl
    ]
);

function ctrl(
    $scope,
    $state,
    memberInfoService,
    $ionicSlideBoxDelegate,
    dealerService,
    localeService
) {

    var vm = this;

    vm.slider = {
        options: {
            pagination: false,
            loop: false,
            speed: 200
        },
        delegate: null,
        activeIndex: 0
    };





    vm.init = function () {
        // TODO: refresh data from api instead of cached service
        // in add dealer pages, save successfully set data to service
        vm.list = memberInfoService.getMemberInfo().partnerDetails;
        vm.hasDealers = vm.list && vm.list.length > 0;

        if (vm.hasDealers) {
            processCardInfo();
        }

        $scope.$broadcast('scroll.refreshComplete');
    };

    function processCardInfo () {
        angular.forEach(vm.list, function(dealer) {
            dealer.positionInList = vm.list.indexOf(dealer) + 1;
            dealer.cardInfo = dealerService.getCardInfo(dealer);
            dealer.partnerName = dealer['partnerName_' + localeService.getLang()];
        });
    }

    vm.openDealerInfo = function(dealer) {
        dealerService.setDealerInfo(dealer);
        $state.go('dash.dealerInfo');
    };

    $scope.$on("$ionicView.beforeEnter", vm.init);



    //
    // Slider
    //

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        refreshSlider(data);
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
        vm.slider.activeIndex = data.slider.activeIndex;
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
        refreshSlider(data);
    });

    function refreshSlider(data) {
        vm.slider.next = data.slider._slideNext;
        vm.slider.prev = data.slider._slidePrev;
        vm.slider.activeIndex = data.slider.activeIndex;
        $scope.$apply();
    }
}
