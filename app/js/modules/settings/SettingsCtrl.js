angular.module('webapp.settings', [

]).controller({
    SettingsCtrl: ['$scope', '$state', '$ionicHistory', 'gettextCatalog', ctrl],
    LanguagesCtrl: ['$rootScope', '$scope', '$ionicHistory','MemberInfoService', 'LocaleService', languages],
    ChangePaymentPasswordStep1: ['$scope', '$state', 'BankCardService', changePaymentPasswordStep1],
    ChangePaymentPasswordStep2: ['$scope', '$state', 'BankCardService', changePaymentPasswordStep2],
    ChangePaymentPasswordStep3: ['$scope', '$state', '$ionicHistory', 'BankCardService', 'DialogService', changePaymentPasswordStep3],
    ChangePaymentPasswordStep4: ['$scope', '$state', changePaymentPasswordStep4],
    ForgetPaymentPasswordStep1: ['$scope', '$state', 'BankCardService', 'api', 'aem', forgetPaymentPasswordStep1],
    ForgetPaymentPasswordStep2: ['$scope', '$state', 'BankCardService', forgetPaymentPasswordStep2],
    ForgetPaymentPasswordStep3: ['$scope', '$state', 'BankCardService', 'api', 'DEFAULT_SETTING', forgetPaymentPasswordStep3],
    ForgetPaymentPasswordStep4: ['$scope', '$state', 'BankCardService', forgetPaymentPasswordStep4],
    ForgetPaymentPasswordStep5: ['$scope', '$state', '$ionicHistory', 'DialogService', 'BankCardService', 'gettextCatalog', forgetPaymentPasswordStep5],
    ForgetPaymentPasswordStep6: ['$scope', '$state', forgetPaymentPasswordStep6]
});

function ctrl($scope, $state, $ionicHistory, gettextCatalog) {

    var vm = this;

    // Search the view history for the view that you want to go back to

    var entryViewId = _.find($ionicHistory.viewHistory().views, {
        url: '/dash/chat'
    });

    vm.lang = '';
    var langCode = gettextCatalog.getCurrentLanguage();
    if (langCode === 'en') {
        vm.lang = 'English';
    } else if (langCode === 'zh') {
        vm.lang = '中文';

    }

    // Replace the current backview with the one you want users to actually go back to.
    if (entryViewId) {
        $ionicHistory.backView(entryViewId);
    }

     if (typeof cordova !== 'undefined' && cordova.getAppVersion) {
        cordova.getAppVersion.getVersionNumber(function (version) {
            vm.appVersion = version;
        });
    }

}

function languages($rootScope, $scope, $ionicHistory, memberInfoService, localeService) {
    var vm = this;
    vm.selected = localeService.getLang();
    vm.update = function() {
        localeService.switchAppLang(vm.selected);
        $scope.dash.nameDisplay = memberInfoService.getmemberName();
        $rootScope.$emit('translate:reRenderDashSVG', {
            lang: vm.selected
        });
        $rootScope.$emit('reload:logo', {
            lang: vm.selected
        });
        $rootScope.$emit('reload:centralCard');
        $rootScope.$emit('restart:webSocket');
        $ionicHistory.goBack();
    };
}


function changePaymentPasswordStep1($scope, $state, bankCardService) {
    var vm = this;

    vm.submit = function(pwd) {
        bankCardService.clearCardInfo();
        bankCardService.setBankCardInfo({
            payment_pwd_old: pwd,
            key: vm.key,
            random_factor: vm.randomFactor
        });
        $state.go('dash.changePaymentPasswordStep2');
    };
}

function changePaymentPasswordStep2($scope, $state, bankCardService) {
    var vm = this;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    vm.submit = function(pwd) {
        bankCardService.setBankCardInfo({
            password: pwd
        });
        $state.go('dash.changePaymentPasswordStep3');
    };
}

function changePaymentPasswordStep3($scope, $state, $ionicHistory, bankCardService, DialogService) {
    var vm = this;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;


    vm.submit = function(pwd) {

        bankCardService.setBankCardInfo({
            passwordConfrim: pwd
        });

        if (bankCardService.comparePwd()) {


            bankCardService.setBankCardInfo({
                payment_pwd: pwd
            });

            bankCardService.paymentPwdChange().then(function(result) {
                if (result.chResult.result === '00') {
                    $ionicHistory.clearCache();
                    DialogService.successWithRedirect(result.chResult.msg, 'dash.myWallet');
                } else {
                    DialogService.alertWithRedirect(result.chResult.msg, 'dash.myWallet');
                }

            });

        } else {
            DialogService.alertMsg('password does not match');
        }

    };
}

function changePaymentPasswordStep4($scope, $state) {
    var vm = this;

    vm.submit = function() {
        $state.go('dash.myWallet');
    };
}

function forgetPaymentPasswordStep1($scope, $state, bankCardService, api, aem) {
    var vm = this;

    bankCardService.getUserCards().then(function() {
        vm.userCards = bankCardService.getBankCards();

        if (vm.userCards.length !== 0) {
            _.each(vm.userCards, function(item) {
                item.imgUrl = aem.getBankCardImgUrl(item.bank_no);
                item.iconId = item.r_type;
            });
        }

    });

    vm.setCurrentCard = function(card) {
        vm.currentCard = card;
    };

    vm.submit = function() {
        bankCardService.clearCardInfo();
        bankCardService.setBankCardInfo({
            remark1: vm.currentCard.r_card,
            bank_card_type: vm.currentCard.r_type
        });
        api.getRandomFactor().then(function(result) {
            bankCardService.setBankCardInfo({
                key: result.chResult.key,
                random_factor: result.chResult.random_factor
            });
            $state.go('dash.forgetPaymentPasswordStep2');
        });

    };
}

function forgetPaymentPasswordStep2($scope, $state, bankCardService) {

    var vm = this;

    vm.widgetId = 'idNumberFP';
    vm.widgetId2 = 'cardNumberFP';
    vm.widgetId3 = 'expiredDateFP';
    vm.widgetId4 = 'cvn2FP';

    // for stoping loop checking on security plugin
    vm.isSubmited = false;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    // credit card - 002
    if (cardInfo.bank_card_type === '002') {
        vm.isCreditCard = true;
    }

    vm.submit = function() {

        cardInfo.mobile_phone = vm.phoneNumber;
        cardInfo.account_name = vm.cardHolder;
        cardInfo.certificate_no = vm.idnumber;
        cardInfo.bank_card_no = vm.cardNumber;

        if (vm.isCreditCard) {
            cardInfo.valid = vm.expiredDate;
            cardInfo.cvn2 = vm.cvn;
        }

        bankCardService.setBankCardInfo(cardInfo);

        vm.isSubmited = true;

        bankCardService.bankCardCheck().then(function(result) {
            if (result.chResult.result === '00') {
                $state.go('dash.forgetPaymentPasswordStep3');
            } else {
                vm.errorMsg = result.chResult.msg;
            }
        });

    };

}

function forgetPaymentPasswordStep3($scope, $state, bankCardService, api, DEFAULT_SETTING) {
    var vm = this;

    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.phoneNumber = bankCardService.getBankCardInfo().mobile_phone;

    vm.requestOTP = function() {
        var userData = {
            'mobileNo': vm.phoneNumber,
            disablePopupError: true
        };
        api.requestOTP(userData).then(function() {
            vm.isOTPSent = true;

        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.isOTPSent = true;
    vm.requestOTP();

    vm.submit = function() {
        var filterObj = {
            validationType: '1',
            mobileNo: vm.phoneNumber,
            OTP: vm.smsCode,
            disablePopupError: true
        };
        api.verifyOTP(filterObj).then(function() {
            $state.go('dash.forgetPaymentPasswordStep4');
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
            vm.smsCode = '';
        });
    };
}


function forgetPaymentPasswordStep4($scope, $state, bankCardService) {
    var vm = this;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    vm.submit = function(pwd) {
        bankCardService.removeAttr('password');
        bankCardService.setBankCardInfo({
            password: pwd
        });
        $state.go('dash.forgetPaymentPasswordStep5');
    };
}

function forgetPaymentPasswordStep5($scope, $state, $ionicHistory, DialogService, bankCardService, gettextCatalog) {
    var vm = this;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    vm.submit = function(pwd) {

        bankCardService.setBankCardInfo({
            passwordConfrim: pwd
        });

        if (bankCardService.comparePwd()) {


            bankCardService.setBankCardInfo({
                payment_pwd: pwd
            });

            bankCardService.paymentPwdSetup().then(function(result) {

                if (result.chResult.result === '00') {
                    $ionicHistory.clearCache();
                    $state.go('dash.forgetPaymentPasswordStep6');
                } else {
                    DialogService.alertWithRedirect(result.chResult.msg, 'dash.myWallet');
                }
            });

        } else {
            DialogService.alertMsg(gettextCatalog.getString('password does not match'));
        }
    };
}

function forgetPaymentPasswordStep6($scope, $state) {
    var vm = this;

    vm.submit = function() {
        $state.go('dash.myWallet');
    };
}
