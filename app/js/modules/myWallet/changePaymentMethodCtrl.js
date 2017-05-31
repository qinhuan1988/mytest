angular.module('webapp.changePaymentMethod', [

]).controller({
    ChangePaymentMethodCtrl: ['$scope', '$state', '$interval', 'BankCardService', 'aem','DialogService',
        ctrl
    ]
});

function ctrl($scope, $state, $interval, bankCardService, aem, dialogService) {

    var vm = this;

    bankCardService.getUserCards().then(function() {
        vm.userCards = bankCardService.getBankCards();
        if (vm.userCards.length === 0) {
            vm.userCardsIsEmptyArray = true;
        }

        _.each(vm.userCards, function(item) {
            if (item.is_default_pay === '00') {
                vm.setCurrentCard(item.r_card, item.r_name);
            }
            item.imgUrl = aem.getBankCardImgUrl(item.bank_no);
            item.iconId = item.r_type;
        });

    });

    vm.setCurrentCard = function(number, name) {
        vm.currentCard = number;
        vm.currentCardName = name;
        //set default bank card function
    };

    vm.submit = function() {
        bankCardService.setDefaultBank({
            token_id: vm.currentCard
        }).then(function(result) {
            if (result.chResult.token_id) {
                $state.go('dash.myWallet', { from: 'bankCardList' });
            } else{
                dialogService.alertMsg(result.chResult.msg);
                $state.go('dash.myWallet');
            }
        });
    };
}
