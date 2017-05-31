angular.module('webapp.transHistoryInfo', [

]).controller({
    TransHistoryInfoCtrl: ['$scope', '$state', 'api', 'MemberInfoService', 'GiftCardService', ctrl]
});

function ctrl($scope, $state, api, memberInfoService, giftCardService) {

    var vm = this;


    vm.memberInfo = memberInfoService.getMemberInfo();

    giftCardService.getTransactionHistory().then(function() {

        vm.TransactionList = giftCardService.getGiftCardsHistory();
        if (!vm.TransactionList) {
            vm.noTransHistory = true;
        }
    });
}
