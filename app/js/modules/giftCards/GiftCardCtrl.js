angular.module('webapp.giftcard', [

]).controller({
    GiftCardStep1Ctrl: ['$scope', '$state', step1Ctrl],
    GiftCardStep2Ctrl: ['$scope', '$state', step2Ctrl],
    PasswordUnlinkGiftCard: ['$scope', '$state', '$stateParams', 'api', 'GiftCardService', passwordUnlinkGiftCard]
});

function step1Ctrl($scope, $state) {
    var vm = this;

    vm.submit = function() {
        $state.go('dash.giftCardStep2');
    };

}

function step2Ctrl($scope, $state) {
    var vm = this;

    vm.submit = function() {
        $state.go('dash.paymentMethod');
    };
}





function passwordUnlinkGiftCard($scope, $state, $stateParams, api, giftCardService) {
    var vm = this;

    vm.giftNumber = $stateParams.number;

    var cardsList = _.filter(giftCardService.getGiftCards(), function(o) {
        return o.number !== vm.giftNumber;
    });

    vm.submit = function() {
        giftCardService.setGiftCards(cardsList);
        $state.go('dash.paymentMethod');
    };
}
