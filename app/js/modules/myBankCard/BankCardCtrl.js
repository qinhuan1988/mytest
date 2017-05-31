angular.module('webapp.bankcard', [

]).controller({
    BankCardStep1Ctrl: ['$rootScope', '$scope', '$state', '$ionicModal', '$timeout', 'gettextCatalog', 'api', 'BankCardService', 'FileUploadService', step1Ctrl],
    BankCardStep2Ctrl: ['$scope', '$state', 'BankCardService', 'gettextCatalog', 'aemModalService', 'aem', step2Ctrl],
    BankCardStep3Ctrl: ['$scope', '$state', 'api', 'BankCardService', 'DEFAULT_SETTING', step3Ctrl],
    BankCardStep4Ctrl: ['$scope', '$state', 'BankCardService', step4Ctrl],
    BankCardStep5Ctrl: ['$scope', '$state', '$ionicHistory', 'gettextCatalog', 'DialogService', 'BankCardService', step5Ctrl],
    PaymentPasswordCtrl: ['$scope', '$state', '$timeout', 'api', 'BankCardService', paymentPasswordCtrl],
    BankCardMultiStep1Ctrl: ['$scope', '$state', 'api', 'BankCardService', multiStep1Ctrl],
    BankCardMultiStep2Ctrl: ['$scope', '$state', 'aemModalService', 'aem', 'gettextCatalog', 'BankCardService', multiStep2Ctrl],
    BankCardMultiStep3Ctrl: ['$scope', '$state', '$ionicHistory', 'api', 'BankCardService', 'DialogService', 'DEFAULT_SETTING', multiStep3Ctrl],
    PasswordUnlinkBankCard: ['$scope', '$state', 'BankCardService', 'DialogService', passwordUnlinkBankCard]
});

function step1Ctrl($rootScope, $scope, $state, $ionicModal, $timeout, gettextCatalog, api, bankCardService, fileUploadService) {
    var vm = this;

    vm.widgetId = 'idnumber';
    vm.widgetId2 = 'cardNumber';

    var resizeImageOption = {
        max_width: 1155,
        max_height: 660
    };

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;
    vm.isRealnameValidate = ( cardInfo.true_name_flg === '1' );

    // for stoping loop checking on security plugin
    vm.isSubmited = false;

    vm.isCardPositiveValid = false;
    vm.isCardOppositeValid = false;
    vm.saveCardPositive = function(file, extension) {
        vm.cardPositiveFile = file;
    };

    vm.saveCardOpposite = function(file, extension) {
        vm.cardOppositeFile = file;
    };

    vm.uploadOptions = {
        iconLink: $rootScope.imageBaseURL + 'img/upload/picture.svg',
        extension: {
            allowedExtensions: ['jpg', 'jpeg', 'png'],
            errorMsg: gettextCatalog.getString('upload file only support jpg,jpeg,png')
        },
        maxSize: {
            value: -1
        }
    };

    vm.isSubmitDisable = function() {
        if(vm.isRealnameValidate) {
            // only check bankcard number
            return vm.isInvalid2;
        } else {
            return vm.isInvalid1 || vm.isInvalid2 || !vm.isCardOppositeValid || !vm.isCardPositiveValid;
        }
    };

    var bankcardInfoQuery = function() {
        var bankcardData = {
            key: vm.key,
            bank_card_no: vm.cardNumber
        };
        api.bankcardInfoQuery(bankcardData).then(function(res2) {

            if (!res2.chResult.card_type) {
                vm.errorMsg = res2.chResult.msg;
                return false;
            }

            bankCardService.setBankCardInfo({
                bank_card_type: res2.chResult.card_type,
                card_name: res2.chResult.card_name,
                certificate_type: 'id',
                certificate_no: vm.idnumber,
                bank_card_no: vm.cardNumber
            });

            vm.isSubmited = true;

            $state.go('dash.bankCardStep2');
        });
    };

    var realnameValidate = function() {
        var realnameData = {
            key: vm.key,
            username: vm.cardHolder,
            id_card_no: vm.idnumber,
            id_card_positive: vm.cardPositiveData,
            id_card_opposite: vm.cardOppositeData
        };
        api.realnameValidate(realnameData).then(function(res1) {

            if (res1.chResult.result !== '00') {
                vm.errorMsg = res1.chResult.msg;
                return false;
            }
            vm.isRealnameValidate = true;
            bankcardInfoQuery();
        });
    };

    vm.submit = function() {
        if(vm.isRealnameValidate) {
            bankcardInfoQuery();
        } else {
            fileUploadService.resizeImage(vm.cardPositiveFile, resizeImageOption).then(function(resultPositive) {
                vm.cardPositiveData = fileUploadService.HTMLencode(resultPositive.split('base64,')[1]);

                fileUploadService.resizeImage(vm.cardOppositeFile, resizeImageOption).then(function(resultOpposite) {
                    vm.cardOppositeData = fileUploadService.HTMLencode(resultOpposite.split('base64,')[1]);

                    realnameValidate();

                });
            });
        }
    };

}

function step2Ctrl($scope, $state, bankCardService, gettextCatalog, aemModalService, aem) {
    var vm = this;

    vm.widgetId = 'expiredDate';
    vm.widgetId2 = 'cvn2';

    // for stoping loop checking on security plugin
    vm.isSubmited = false;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    // credit card - 02
    if (cardInfo.bank_card_type === '002') {
        vm.isCreditCard = true;
    }

    vm.showAgreement = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('P&C Terms and conditions'), aem.getTermsAndConditionsTemplateURL('bank-agreement'));
    };

    vm.submit = function() {

        cardInfo.mobile_phone = vm.phoneNumber;

        if (vm.isCreditCard) {
            cardInfo.valid = vm.expiredDate;
            cardInfo.cvn2 = vm.cvn;
        }

        bankCardService.setBankCardInfo(cardInfo);

        vm.isSubmited = true;
        $state.go('dash.bankCardStep3');
    };

}

function step3Ctrl($scope, $state, api, bankCardService, DEFAULT_SETTING) {
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

    vm.requestOTP();

    vm.submit = function() {
        var filterObj = {
            validationType: '1',
            mobileNo: vm.phoneNumber,
            OTP: vm.smsCode
        };
        api.verifyOTP(filterObj).then(function() {
            $state.go('dash.bankCardStep4');
        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
            vm.smsCode = '';
        });
    };

}

function step4Ctrl($scope, $state, bankCardService) {
    var vm = this;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    vm.submit = function(pwd) {
        bankCardService.removeAttr('password');
        bankCardService.setBankCardInfo({
            password: pwd
        });
        $state.go('dash.bankCardStep5');
    };
}

function step5Ctrl($scope, $state, $ionicHistory, gettextCatalog, DialogService, bankCardService) {
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

            bankCardService.bankcardBindFirst().then(function(result) {

                if (result.chResult.result === '00') {

                    bankCardService.setDefaultBank({
                        token_id: result.chResult.token_id
                    }).then(function(res2) {
                        $ionicHistory.clearCache();
                        DialogService.successWithRedirect(res2.chResult.msg, 'dash.paymentMethod');
                    });

                } else {
                    DialogService.alertWithRedirect(result.chResult.msg, 'dash.paymentMethod');
                }
            });

        } else {
            DialogService.alertMsg(gettextCatalog.getString('password does not match'));
        }
    };
}

function paymentPasswordCtrl($scope, $state, $timeout, api, bankCardService) {
    var vm = this;
    vm.key = '';
    vm.randomFactor = '';
    vm.submit = function(authCode) {
        bankCardService.clearCardInfo();
        bankCardService.setBankCardInfo({
            auth_code: authCode
        });
        $state.go('dash.bankCardMultiStep1');
    };
}

function multiStep1Ctrl($scope, $state, api, bankCardService) {
    var vm = this;

    vm.widgetId = 'cardNumberMul';

    vm.isSubmited = false;

    vm.submit = function() {

        bankCardService.setBankCardInfo({
            key: vm.key,
            random_factor: vm.randomFactor,
        });

        var bankcardData = {
            key: vm.key,
            bank_card_no: vm.cardNumber
        };

        api.bankcardInfoQuery(bankcardData).then(function(res) {

            if (!res.chResult.card_type) {
                vm.errorMsg = res.chResult.msg;
                return false;
            }

            bankCardService.setBankCardInfo({
                bank_card_type: res.chResult.card_type,
                card_name: res.chResult.card_name,
                bank_card_no: vm.cardNumber
            });

            vm.isSubmited = true;

            $state.go('dash.bankCardMultiStep2');
        });

    };
}

function multiStep2Ctrl($scope, $state, aemModalService, aem, gettextCatalog, bankCardService) {

    var vm = this;

    vm.widgetId = 'expiredDateMul';
    vm.widgetId2 = 'cvn2Mul';

    // for stoping loop checking on security plugin
    vm.isSubmited = false;

    var cardInfo = bankCardService.getBankCardInfo();

    vm.key = cardInfo.key;
    vm.randomFactor = cardInfo.random_factor;

    // credit card - 02
    if (cardInfo.bank_card_type === '002') {
        vm.isCreditCard = true;
    }

    vm.showAgreement = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('P&C Terms and conditions'), aem.getTermsAndConditionsTemplateURL('bank-agreement'));
    };

    vm.submit = function() {

        cardInfo.mobile_phone = vm.phoneNumber;

        if (vm.isCreditCard) {
            cardInfo.valid = vm.expiredDate;
            cardInfo.cvn2 = vm.cvn;
        }

        bankCardService.setBankCardInfo(cardInfo);

        vm.isSubmited = true;
        $state.go('dash.bankCardMultiStep3');
    };
}

function multiStep3Ctrl($scope, $state, $ionicHistory, api, bankCardService, DialogService, DEFAULT_SETTING) {
    var vm = this;

    vm.countDown = DEFAULT_SETTING.defaultCountDown;
    vm.phoneNumber = bankCardService.getBankCardInfo().mobile_phone;
    vm.requestOTP = function() {
        var userData = {
            'mobileNo': vm.phoneNumber
        };
        api.requestOTP(userData).then(function() {
            vm.isOTPSent = true;

        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
        });
    };

    vm.requestOTP();

    vm.submit = function() {

        var filterObj = {
            // 1: sms code
            // 2: capcha
            validationType: '1',
            mobileNo: vm.phoneNumber,
            OTP: vm.smsCode,
            disablePopupError: true
        };
        api.verifyOTP(filterObj).then(function() {

            bankCardService.bankcardBind().then(function(result) {
                $ionicHistory.clearCache();
                if (result.chResult.result === '00') {
                    DialogService.successWithRedirect(result.chResult.msg, 'dash.paymentMethod');
                } else {
                    vm.errorMsg = result.chResult.msg;
                    vm.smsCode = '';
                }
            });

        }, function(res) {
            vm.errorMsg = res.data.errorMessage;
            vm.smsCode = '';
        });

    };
}


function passwordUnlinkBankCard($scope, $state, bankCardService, DialogService) {
    var vm = this;
    vm.key = '';
    vm.randomFactor = '';
    vm.unlinkCard = function(authCode) {
        bankCardService.bankCardUnbind(authCode).then(function(result) {
            if (result.chResult.result === '00') {
                $state.go('dash.paymentMethod');
            } else {
                DialogService.alertWithRedirect(result.chResult.msg, 'dash.paymentMethod');
            }
        });
    };
}
