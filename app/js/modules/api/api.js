angular.module('webapp.api', [
    'restangular'
]).factory({
    api: ['Restangular', 'DEFAULT_SETTING', 'ENV_SETTING', 'LocaleService', '$filter', 'moment', api]
});

function api(Restangular, DEFAULT_SETTING, ENV_SETTING, localeService, $filter, moment) {

    var getMemberInfo = function() {
        return JSON.parse(sessionStorage.getItem('memberInfo'));
    };

    var outputType = 'json';
    var partnerCode = 'bmw';
    var clientCode = 'bmw';
    var countryCulture = localeService.getAPILang;
    var regionCode = 'CN';
    var districtCode = '';
    var category = 'all';
    var type = 'all';
    var actionType = '1';
    var code_no = '7310202640000166057=41933078C2FFE070';
    var change_type = 'freeze';
    var ip = '10.1.16.208';
    var cardPickup = 'y';

    var membershipId = function() {
        return getMemberInfo().membershipId;
    };
    var market_code = ENV_SETTING.market_code;
    var user_open_id = function() {
        return getMemberInfo().user_open_id;
    };
    var getMobileNo = function() {
        return getMemberInfo().mobileNo;
    };
    var getFirstName = function() {
        return getMemberInfo().firstName;
    };
    var getLastName = function() {
        return getMemberInfo().lastName;
    };

    Restangular.updateHeaders = function(isAuth) {
        var sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
        if (isAuth) {
            this.setDefaultHeaders({
                access_token: ENV_SETTING.accessToken,
                sessionToken: sessionToken
            });
        } else {
            this.setDefaultHeaders({
                access_token: ENV_SETTING.accessToken
            });
        }
    };

    return {

        // set regionCode

        setRegionCode: function(countryCode) {
            if (countryCode !== '') {
                regionCode = countryCode;
            }
        },

        // Enrollment

        enrollment: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                outputType: outputType,
                partnerCode: partnerCode,
                actionType: actionType,
                membershipDate: moment().format('DD-MM-YYYY'),
                source: 2,
                countryCulture: countryCulture(),
                isAutoLogin: "N"
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/Enrollment').post(null, postData);
        },

        // Check duplication enrollment

        chkDupEnrollment: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                partnerCode: partnerCode,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('member.svc/ChkDupEnrollment').get(paramsObj);
        },

        // get list of cities

        getCity: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                regionCode: regionCode
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetCity').get(paramsObj);
        },

        // get list of provinces

        getProvince: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                regionCode: regionCode
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetProvince').get(paramsObj);
        },

        // get list regions

        getRegion: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetRegion').get(paramsObj);
        },

        // get list of districts

        getDistrict: function(filterObj) {
            return Restangular.one('Master.svc/GetDistrict').get(filterObj);
        },

        // get zip code list
        getZipCode: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                regionCode: regionCode
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetZip').get(paramsObj);
        },

        // get dealers (or partners)

        getDealers: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                regionCode: regionCode,
                districtCode: districtCode,
                category: category,
                type: type
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetPartner').get(paramsObj);
        },

        // Add Dealer

        addDealer: function(userData) {
            var isAuth = true;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/AddPartnerMapping').post(null, postData);
        },

        // forgot password

        forgotPassword: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/ForgotPassword').post(null, postData);
        },

        // request OTP

        requestOTP: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('member.svc/RequestOTP').post(null, postData);
        },

        // login

        login: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/Login').post(null, postData);
        },

        // verify phone number

        verifyMobileNo: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/VerifyMobileNo').post(null, postData);
        },

        // verify OTP

        verifyOTP: function(filterObj) {
            var isAuth = false;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/VerifyOTP').get(paramsObj);
        },

        // change Password
        // requires sessionToken

        changePassword: function(userData) {
            var isAuth = true;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/ChangePassword').post(null, postData);
        },

        //change PIN
        changePIN: function(userData) {
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PCARD_PWD_CHANGE').post(null, postData);
        },

        validateOldPin: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PCARD_PWD_VALIDATE').post(null, postData);
        },

        //Forgot Pin
        forgotPIN: function(userData) {
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                user_open_id: user_open_id(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PIN_SETUP').post(null, postData);
        },

        //get transaction history

        getTransactionHistory: function(filterObj) {
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                membershipId: membershipId()
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PCARD_TRANSACTION_HISTORY').post(null, paramsObj);
        },

        //Member Activity

        getMemberActivity: function(filterObj) {
            var isAuth = true;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                membershipId: membershipId()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/MemberActivity').get(paramsObj);
        },

        //freeze card

        getCardStatus: function(filterObj) {
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                user_open_id: user_open_id(),
                optuser: membershipId(),
                code_no: code_no,
                change_type: change_type,
                ip: ip

            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PCARD_STATUS_CHANGE').post(null, paramsObj);
        },

        //replace card

        replaceCard: function(postData) {
            var isAuth = true;
            var paramsObj = _.defaults(postData, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                cardPickup: cardPickup,
                membershipId: membershipId()

            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/CardReplacementRequest').post(null, paramsObj);
        },

        //get ccb issuer

        getCCBissuer: function(userId) {
            var isAuth = true;
            var paramsObj = _.defaults(userId, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetCCBCardIssuer').get(paramsObj);
        },

        //get ccb card type

        getCCBCardType: function() {
            var isAuth = true;
            var paramsObj = {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture()
            };
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetCCBCardType').get(paramsObj);
        },

        // CCB enrollment

        ccbEnrollment: function(postData) {
            var isAuth = true;
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/CCBEnrollment').post(null, postData);
        },

        //get Member vehicle

        getMemberVehicle: function(userId) {
            var isAuth = true;
            var paramsObj = _.defaults(userId, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                membershipId: membershipId()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetMemberVehicle').get(paramsObj);
        },

        //remove vehicle

        removeVehicle: function(filterObj) {
            var isAuth = true;
            var paramsObj = _.defaults(filterObj, {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                membershipId: membershipId()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/DelinkVehicle').post(null, paramsObj);
        },

        //add vehicle
        addVehicle: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                membershipId: membershipId(),
                partnerCode: '',
                ownershipStatus: "owner",
                outputType: outputType
            });
            Restangular.updateHeaders(true);
            return Restangular.one('Miscellaneous.svc/AddVehicle').post(null, postData);
        },

        // get countries
        getCountry: function() {
            var isAuth = false;
            var paramsObj = {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            };
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Master.svc/GetCountries').get(paramsObj);
        },

        // get salutation

        getSalutation: function() {
            var isAuth = false;
            var paramsObj = {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            };
            Restangular.updateHeaders(isAuth);
            return Restangular.one('master.svc/GetSalutation').get(paramsObj);
        },

        GenerateCaptcha: function() {
            var isAuth = false;
            var paramsObj = {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            };
            Restangular.updateHeaders(isAuth);
            return Restangular.one('member.svc/GenerateCaptcha').get(paramsObj);
        },

        validateCarmenInfo: function(userData) {
            var isAuth = false;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/ValidateCarmenInfo').post(null, postData);
        },

        addCarmenInfo: function(userData) {
            var isAuth = true;
            var postData = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/AddCarmenInfo').post(null, postData);
        },

        getUserStatus: function() {
            return Restangular.one('Member.svc/PortalLoginService/Login').get();
        },

        getMemberInfo: function(userId) {
            var isAuth = true;
            var paramsObj = {
                clientCode: clientCode,
                membershipId: userId,
                countryCulture: countryCulture(),
                outputType: outputType
            };
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Member.svc/GetMemberInfo').get(paramsObj);
        },

        getMemberVouchers: function(userData) {
            var isAuth = true;
            var paramsObj = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType,
                membershipId: membershipId()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetMemberVouchers').get(paramsObj);
        },

        getMemberPartnerOffer: function(userData) {
            var isAuth = true;
            var paramsObj = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetMemberPartnerAndOffers').get(paramsObj);
        },

        getAllBenefits: function(userData) {
            var isAuth = true;
            var paramsObj = _.defaults(userData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType,
                membershipId: membershipId()
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/GetAllBenefits').get(paramsObj);
        },

        getStatusBenefit: function(benefitData) {
            var isAuth = true;
            var postData = _.defaults(benefitData, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                outputType: outputType
            });
            Restangular.updateHeaders(isAuth);
            return Restangular.one('Miscellaneous.svc/StatusBenefit').post(null, postData);
        },

        logout: function() {
            var paramsObj = {
                clientCode: clientCode,
                outputType: outputType,
                countryCulture: countryCulture(),
                membershipId: membershipId()
            };
            Restangular.updateHeaders(true);
            return Restangular.one('Member.svc/Logout').post(null, paramsObj);
        },

        getRandomFactor: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/RANDOM_FACTOR_GENERATE').post(null, postData);
        },

        paymentPwdValidate: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PAYMENT_PWD_VALIDATE').post(null, postData);
        },

        getUserCards: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/NWACCOUNT_MEDIA_LIST').post(null, postData);
        },

        generateQRCode: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                user_open_id: user_open_id(),
                market_code: market_code,
                optuser: membershipId(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/NWACCOUNT_QRCODE_GET').post(null, postData);
        },

        roundRobinQRCode: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                optuser: membershipId(),
                user_open_id: user_open_id(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/OFFLINE_PAY_QUERY').post(null, postData);
        },

        validQuickPAY: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                optuser: membershipId(),
                user_open_id: user_open_id(),
                ip: ip
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/OFFLINE_PAY').post(null, postData);
        },

        realnameValidate: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/REALNAME_VALIDATE').post(null, postData);
        },

        bankcardInfoQuery: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/BANKCARD_INFO_QUERY').post(null, postData);
        },

        bankcardBindFirst: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/BANKCARD_BIND_FIRST').post(null, postData);
        },

        bankcardBind: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/BANKCARD_BIND').post(null, postData);
        },

        setDefaultBank: function(data) {

            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });

            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/SET_DEFAULT_BANK').post(null, postData);
        },

        paymentPwdChange: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PAYMENT_PWD_CHANGE').post(null, postData);
        },

        bankCardUnbind: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/BANKCARD_UNBIND').post(null, postData);
        },

        bankCardCheck: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/BANK_CARD_CHECK').post(null, postData);
        },

        paymentPwdSetup: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/PAYMENT_PWD_SETUP').post(null, postData);
        },

        accountInfoQuery: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                market_code: market_code,
                user_open_id: user_open_id(),
                optuser: membershipId(),
                ip: ip,
                remark1: 'reserved',
                remark2: 'reserved'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHService.svc/NWACCOUNT_INFO_QUERY').post(null, postData);
        },

        // chat apis
        loadActivePushData: function(data) {
            var paramsObj = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                membershipId: membershipId(),
                times: 1
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHATService.svc/OBTAIN_DATA_ON_SPECIFIC_DATE').get(paramsObj);
        },

        updateActivePush: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                membershipId: membershipId(),
                status: '1'
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHATService.svc/CHAT_USER_UPDATE_ACTIVE_PUSH_STATUS').post(null, postData);
        },

        chatUserUpdate: function(data) {
            var postData = _.defaults(data, {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                membershipId: membershipId(),
                mobileNo: getMobileNo(),
                firstName: getFirstName(),
                lastName: getLastName()
            });
            Restangular.updateHeaders(true);
            return Restangular.one('CHATService.svc/CHAT_USER_UPDATE').post(null, postData);
        },

        getNewsletterLink: function() {
            var postData = {
                clientCode: clientCode,
                countryCulture: countryCulture(),
                mobile: getMobileNo()
            };
            Restangular.updateHeaders(true);
            return Restangular.one('NewsLetterService.svc/NEWS_LETTER_URL').post(null, postData);
        }
    };
}
