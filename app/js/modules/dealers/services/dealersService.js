angular.module('webapp.dealers').service({
    DealerService: ['api', 'ENV_SETTING', 'MemberInfoService', 'LocaleService', dealerService]
});

function dealerService(api, ENV_SETTING, memberInfoService, localeService) {

    // init

    var dealers = [];
    var dealerInfo = {};

    // dealer service object

    var dealerService = {
        setDealers: setDealers,
        getDealers: getDealers,
        setDealerInfo: setDealerInfo,
        getDealerInfo: getDealerInfo,
        getCardInfo: getCardInfo,
        clearDealerInfo: clearDealerInfo,
        comparePwd: comparePwd,
        changePin: changePin,
        validateOldPin: validateOldPin,
        forgotPin: forgotPin
    };

    return dealerService;

    // set dealers list

    function setDealers(dealersArray) {
        dealers = dealersArray;
    }

    // get dealers list

    function getDealers() {
        return dealers;
    }

    // set dealer info

    function setDealerInfo(info) {
        dealerInfo = _.defaults(info, dealerInfo);
    }

    // get dealers info

    function getDealerInfo() {
        return dealerInfo;
    }

    // get dealer card Info

    function getCardInfo(partner) {
        return {
            status: partner.status,
            statusId: partner.statusId,
            memberName: memberInfoService.getmemberName(),
            cardNo: '',
            partnerName: partner['partnerName_' + localeService.getLang()],
            imgLink: 'img/dashboard/membercard/vertical/default.png'
        };
    }


    // comparePwd

    function comparePwd() {
        return dealerInfo.new_password === dealerInfo.password_confirm;
    }

    // clear Dealer Info

    function clearDealerInfo() {
        dealerInfo = {};
    }

    // change PIN

    function changePin() {
        var postData = {
            market_code: dealerInfo.chMarketCode,
            card_no: dealerInfo.memberCards[0].linkedCardNo,
            key: dealerInfo.key,
            password: dealerInfo.password,
            old_password: dealerInfo.old_password
        };
        return api.changePIN(postData);
    }

    // validate old PIN

    function validateOldPin() {
        var postData = {
            market_code: dealerInfo.chMarketCode,
            card_no: dealerInfo.memberCards[0].linkedCardNo,
            key: dealerInfo.key,
            password: dealerInfo.old_password
        };
        return api.validateOldPin(postData);
    }

    // forgot PIN

    function forgotPin() {
        var postData = {
            market_code: dealerInfo.chMarketCode,
            card_no: dealerInfo.card_no,
            key: dealerInfo.key,
            password: dealerInfo.password,
            optuser: dealerInfo.optuser
        };
        return api.forgotPIN(postData);
    }
}
