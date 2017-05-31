angular.module('webapp.offers').controller({
    OfferInfoCtrl: ['$rootScope', '$scope', 'aem', 'OffersService', 'TrackingService', ctrl]
});


function ctrl($rootScope, $scope, aem, offersService, trackingService) {

    var vm = this;

    vm.hidePopupLayer = function() {
        $scope.dash.isMembercardShown = false;
        $scope.dash.isVoucherShown = false;
    };

    $rootScope.$on('voucher:updated', function() {
        updateVoucherActions();
    });

    $scope.$on('$ionicView.beforeEnter', function() {

        // getting offer details

        vm.details = offersService.getCurrentOfferInfo();

        // updating vouchers actions

        updateVoucherActions();

        // tracking opening voucher event

        trackingService.trackVoucherDetails(vm.details);

    });


    // update voucher actions

    function updateVoucherActions() {

        vm.details.options = offersService.getVoucherOptions(vm.details);

        // getting the voucher options

        vm.fav = _.find(vm.details.options, function(option) {
            return option.info.action === "FB";
        });

        vm.unfav = _.find(vm.details.options, function(option) {
            return option.info.action === "UFB";
        });

        vm.grab = _.find(vm.details.options, function(option) {
            return option.info.action === "UB";
        });

        vm.call = _.find(vm.details.options, function(option) {
            return option.info.action === "call";
        });
    }

}
