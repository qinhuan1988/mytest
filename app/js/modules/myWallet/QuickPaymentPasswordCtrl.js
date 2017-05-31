angular.module('webapp.quickPaymentPassword', [

]).controller({
    QuickPaymentPasswordCtrl: ['$scope', '$state', '$timeout', 'api', 'DialogService', 'MyWalletService', 'gettextCatalog', ctrl]
});

function ctrl($scope, $state, $timeout, api, dialogService, myWalletService, gettextCatalog) {

    var vm = this;

    vm.submit = function(pwd) {

        var postData = {
            key: vm.key,
            payment_pwd: pwd,
            order_id: myWalletService.getWalletInfo().trans_flow_id
        };

        api.validQuickPAY(postData).then(function(result) {
            if (result.chResult.result === '00') {
                dialogService.successWithRedirect(gettextCatalog.getString('pay successfully'), 'dash.myWallet');
            } else {
                dialogService.alertWithRedirect(result.chResult.msg, 'dash.myWallet');
            }
        });

    };
}
