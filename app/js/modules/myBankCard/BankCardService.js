angular.module('webapp.bankcard').service({
    BankCardService: ['api', 'gettextCatalog', bankCardService]
});

function bankCardService(api, gettextCatalog) {

    var bankCH_Data = {
        'bankCardType': {
            '001': gettextCatalog.getString('Deposit Card'),
            '002': gettextCatalog.getString('Credit Card'),
            '02001': gettextCatalog.getString('BMW Wholesale Card'),
            '02002': gettextCatalog.getString('BMW Dealer Card'),
            '02003': gettextCatalog.getString('BMW Joint Gift Card'),
            '02004': gettextCatalog.getString('BMW Special Gift Card'),
            '06': gettextCatalog.getString('bankCardType-voucher')
        },
        'bankName': {
            '00001': gettextCatalog.getString('ICBC'),
            '00002': gettextCatalog.getString('ABC'),
            '00003': gettextCatalog.getString('BOC'),
            '00004': gettextCatalog.getString('CCB'),
            '00005': gettextCatalog.getString('BCM'),
            '00006': gettextCatalog.getString('PSBC'),
            '00007': gettextCatalog.getString('CMB'),
            '00008': gettextCatalog.getString('CEB'),
            '00009': gettextCatalog.getString('ECITIC'),
            '00010': gettextCatalog.getString('HXB'),
            '00011': gettextCatalog.getString('SPDB'),
            '00012': gettextCatalog.getString('CMBC'),
            '00013': gettextCatalog.getString('PAB'),
            '00014': gettextCatalog.getString('CIB'),
            '00015': gettextCatalog.getString('GDB'),
            '00016': gettextCatalog.getString('BOB'),
            '00017': gettextCatalog.getString('SHB'),
            '00018': gettextCatalog.getString('XMB')
        }
    };

    var bankCardInfo = {};

    var bankCards =  [];


    var getBankCards = function() {
        return bankCards;
    };

    var setBankCards = function(cardsList) {
        bankCards = _.filter(cardsList, function(item){
            return item.r_type === '001' || item.r_type === '002';
        });
        return bankCards;
    };


    var getBankCardInfo = function() {
        return bankCardInfo;
    };

    var setBankCardInfo = function(data) {
        bankCardInfo = _.defaults(data, bankCardInfo);
    };

    var getUserCards = function() {
        var postData = {
        };
        return api.getUserCards(postData).then(function(result) {
            setBankCards(result.chResult.detail);
        });
    };

    var removeAttr = function(attr) {
        if(bankCardInfo[attr]) {
            delete bankCardInfo[attr];
        }
    };

    var comparePwd = function() {
        return bankCardInfo.password === bankCardInfo.passwordConfrim;
    };

    var bankcardBindFirst = function() {
        return api.bankcardBindFirst(bankCardInfo);
    };

    var bankcardBind = function() {
        return api.bankcardBind(bankCardInfo);
    };

    var clearCardInfo = function() {
        bankCardInfo = {};
    };

    var paymentPwdChange = function() {
        return api.paymentPwdChange(bankCardInfo);
    };

    var setDefaultBank = function(data) {
        return api.setDefaultBank(data);
    };

    var bankCardUnbind = function(authCode) {
        var postData = {
            token_id: bankCardInfo.r_card,
            auth_code: authCode
        };
        return api.bankCardUnbind(postData);
    };

    var bankCardCheck = function() {
        return api.bankCardCheck(bankCardInfo);
    };

    var paymentPwdSetup = function() {
        var postData = {
            key: bankCardInfo.key,
            payment_pwd: bankCardInfo.payment_pwd
        };
        return api.paymentPwdSetup(postData);
    };

    var rewriteCardName = function(bankInfo) {
         // bank name + card type + number 4 digits
         var bankName = bankCH_Data.bankName[bankInfo.bank_no] || '';

         var cardType = bankCH_Data.bankCardType[bankInfo.r_type];
         // ***************3688|金穗通宝卡(银联卡)
         var indexOfVerticalBar = bankInfo.r_name.indexOf('|');
         var cardNumber = bankInfo.r_name.substr(indexOfVerticalBar-4, 4);

         return [bankName, cardType, cardNumber].join(' ');
    };

    return {
        getBankCardInfo: getBankCardInfo,
        setBankCardInfo: setBankCardInfo,
        getBankCards: getBankCards,
        setBankCards: setBankCards,
        getUserCards: getUserCards,
        removeAttr: removeAttr,
        comparePwd: comparePwd,
        bankcardBindFirst: bankcardBindFirst,
        bankcardBind: bankcardBind,
        clearCardInfo: clearCardInfo,
        paymentPwdChange: paymentPwdChange,
        setDefaultBank: setDefaultBank,
        bankCardUnbind: bankCardUnbind,
        bankCardCheck: bankCardCheck,
        paymentPwdSetup: paymentPwdSetup,
        rewriteCardName: rewriteCardName
    };
}
