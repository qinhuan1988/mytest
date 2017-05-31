angular.module('webapp.myWallet', [

]).controller({
    MyWalletCtrl: [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        '$ionicModal',
        '$interval',
        'gettextCatalog',
        'MyWalletService',
        'BankCardService',
        'OffersService',
        'VehiclesService',
        ctrl
    ]
});

function ctrl(
    $scope,
    $rootScope,
    $state,
    $stateParams,
    $ionicModal,
    $interval,
    gettextCatalog,
    myWalletService,
    bankCardService,
    OffersService,
    vehiclesService
) {
    var vm = this;

    var loopRBStatusValidation,
        loopQRCodeNum;

    vm.getCardName = function() {
        bankCardService.getUserCards().then(function() {
            vm.errorMsg = '';
            var userCards = bankCardService.getBankCards();
            if (userCards.length === 0) {
                vm.errorMsg = gettextCatalog.getString('You need to add a bank card first');
                return false;
            }
            _.each(userCards, function(item) {
                if (item.is_default_pay === '00') {
                    vm.hasDefaultCardName = bankCardService.rewriteCardName(item);
                    vm.QRCodeNum();
                }
            });
        });
    };

    vm.showModal = function() {
        $ionicModal.fromTemplateUrl('js/modules/myWallet/quickPayQR.html', function($ionicModal) {
            vm.modal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function() {
            vm.modal.show();
        });
    };

    vm.QRCodeNum = function() {
        myWalletService.generateQRCode().then(function() {
            vm.QRCode = myWalletService.getQRValue();
        }, function(response) {
            if(response.data.errorCode === '-1225' && response.data.errorMessage === 'Session has been expired, Please login again.') {
                $interval.cancel(loopQRCodeNum);
                $interval.cancel(loopRBStatusValidation);
            }
        });
    };

    vm.closeQuickPayQR = function() {
        vm.modal.remove();
        $interval.cancel(loopQRCodeNum);
        $interval.cancel(loopRBStatusValidation);
        if ($stateParams.from === "bankCardList") {
            $state.transitionTo('dash.myWallet', null, {
                notify: false
            });
        }
        if ($stateParams.from === "iDrive") {
            $state.transitionTo('dash.chat');
        }
    };

    vm.RBStatusValidation = function() {
        $rootScope.qrCodeRefreshing = 1;
        if (vm.hasDefaultCardName) {
            myWalletService.roundRobinQRCode().then(function() {
                vm.Rbstatus = myWalletService.getRBValue();
                if (vm.Rbstatus === '1') {
                    vm.closeQuickPayQR();
                    $state.go('dash.quickPaymentPassword');
                }
                $rootScope.qrCodeRefreshing = 0;
            }, function(response) {
                if(response.data.errorCode === '-1225' && response.data.errorMessage === 'Session has been expired, Please login again.') {
                    $interval.cancel(loopQRCodeNum);
                    $interval.cancel(loopRBStatusValidation);
                }
            });
        }
    };

    var showQRImg = function() {
        vm.getCardName();
        loopQRCodeNum = $interval(vm.QRCodeNum, 60000);
        vm.showModal();
    };

    vm.showQuickPayQR = function() {
        showQRImg();
        //invalid Rb status
        loopRBStatusValidation = $interval(vm.RBStatusValidation, 5000);
    };

    if ($stateParams.from === 'bankCardList' || $stateParams.from === 'iDrive') {
        vm.showQuickPayQR();
    }

    // show enroll credit card only if user has vehicles
    vehiclesService.refreshVehiclesList()
        .then(function() {
            vm.canEnrollCreditCard = !!vehiclesService.getVehiclesList().length;
        });

    $scope.$on('$destroy', function() {
        if(vm.modal) {
            vm.modal.remove();
            $interval.cancel(loopQRCodeNum);
            $interval.cancel(loopRBStatusValidation);
        }
    });
}
