angular.module('webapp.paymentMethod', [

]).controller({
    PaymentMethodCtrl: [
        '$scope',
        '$state',
        '$ionicHistory',
        'api',
        'BankCardService',
        'GiftCardService',
        'DialogService',
        'gettextCatalog',
        'aem',
        'aemModalService',
         ctrl
         ]
});

function ctrl(
    $scope,
    $state,
    $ionicHistory,
    api,
    bankCardService,
    giftCardService,
    dialogService,
    gettextCatalog,
    aem,
    aemModalService
    ) {

    var vm = this;

    bankCardService.getUserCards().then(function() {
        vm.userCards = bankCardService.getBankCards();
        _.each(vm.userCards, function(item) {
           item.imgUrl = aem.getBankCardImgUrl(item.bank_no);
           item.iconId = item.bank_no;
       });
    });

    vm.giftCards = giftCardService.getGiftCards();

    // Search the view history for the view that you want to go back to
    var entryViewId = _.find($ionicHistory.viewHistory().views, {url : "/dash/myWallet"});

    // Replace the current backview with the one you want users to actually go back to.
    if(entryViewId) {
      $ionicHistory.backView(entryViewId);
    }

    vm.addBankCard = function() {

        api.accountInfoQuery().then(function(accountResult) {
            // already validate realname, bind card and set password
            if(accountResult.chResult.pwd_flg === '1') {
                $state.go('dash.paymentPassword');
            } else if(accountResult.chResult.pwd_flg === '0'){
                api.getRandomFactor().then(function(result) {
                    bankCardService.clearCardInfo();
                    bankCardService.setBankCardInfo({
                        key: result.chResult.key,
                        random_factor: result.chResult.random_factor,
                        true_name_flg: accountResult.chResult.true_name_flg
                    });
                    $state.go('dash.bankCardStep1');
                });
            } else {
                dialogService.alertMsg(gettextCatalog.getString('account info error'));
            }
        });



    };

    vm.deleteCard = function(card) {
        bankCardService.clearCardInfo();
        bankCardService.setBankCardInfo(card);
        $state.go('dash.passwordUnlinkBankCard');
    };

    vm.addGiftCard = function() {
        $state.go('dash.giftCardStep2');
    };

    vm.deleteGiftCard = function(card) {
        $state.go('dash.passwordUnlinkGiftCard', { 'number': card.number});
    };
    vm.showBankListInfo = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Bank List'), aem.getBankListInfoTemplateURL());
    };
}
