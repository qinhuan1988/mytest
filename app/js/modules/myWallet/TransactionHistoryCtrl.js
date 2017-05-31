angular.module('webapp.transactionHistory', [

]).controller({
    TransactionHistoryCtrl: ['$scope', '$state', 'GiftCardService', 'aem', ctrl]
});

function ctrl($scope, $state, giftCardService, aem) {

    var vm = this;

    giftCardService.getUserCards().then(function() {
        vm.userCards = giftCardService.getGiftCards();
        if (vm.userCards.length === 0) {
            vm.noGiftCard = true;
        }
        _.each(vm.userCards, function(item) {
            item.imgUrl = aem.getBankCardImgUrl(item.r_type);
            item.iconId = item.r_type;
        });
    });

    vm.setCurrentCard = function(number, name) {
        vm.currentCard = number;
        vm.currentCardName = name;
        giftCardService.setGiftCardsInfo(vm.currentCard);
    };
}
