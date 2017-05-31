angular.module('webapp.offers').controller({
    CouponInfoCtrl: ['$rootScope', '$scope', '$state', 'aem', 'CouponsService', 'TrackingService', ctrl]
});

function ctrl($rootScope, $scope, $state, aem, couponsService, trackingService) {

    var vm = this;

    vm.coupon = couponsService.getCouponInfo();
    vm.voucherCode = couponsService.getCouponCode(vm.coupon);

    trackingService.trackCouponDetails(vm.coupon);

    vm.hidePopupLayer = function() {
        $scope.dash.isMembercardShown = false;
        $scope.dash.isVoucherShown = false;
    };

}
