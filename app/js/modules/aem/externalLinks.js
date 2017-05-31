angular.module('webapp.externalLinks', [

]).factory('externalLinks', ['$http', 'EXTERNAL_LINKS', 'LocaleService', 'MemberInfoService', 'AESService',

    function($http, EXTERNAL_LINKS, localeService, memberInfoService, AESService) {


        var memberInfo = memberInfoService.getMemberInfo();

        var locale = localeService.getExternalLinkLang;
        var membershipId = memberInfo.membershipId;
        var membershipIdEncrypt = AESService.encryptString(membershipId);
        var membershipIdDoubleEncode = encodeURIComponent(encodeURIComponent(membershipIdEncrypt));

        var source = '4';
        var dealerId = '-1';
        var button = 'drive';


        return {
            checkOurOffers: function() {
                return EXTERNAL_LINKS.checkOurOffers + '?locale=' + locale();
            },
            buildYourBMW: function() {
                return EXTERNAL_LINKS.buildYourBMW;
            },
            requestYourQuotation: function() {
                return EXTERNAL_LINKS.requestYourQuotation + '?locale=' + locale() + '&source=' + source + '&dealerId=' + dealerId + '&userId=' + membershipIdEncrypt;
            },
            requestTestDriveBMW: function() {
                return EXTERNAL_LINKS.requestTestDriveBMW + '?locale=' + locale() + '&source=' + source + '&dealerId=' + dealerId + '&button=' + button + '&userId=' + membershipIdEncrypt;
            },
            requestTestDriveMini: function() {
                return EXTERNAL_LINKS.requestTestDriveMini;
            },
            requestTestDriveMotorrad: function() {
                return EXTERNAL_LINKS.requestTestDriveMotorrad;
            },
            joinYourBMWEvents: function() {
                return EXTERNAL_LINKS.joinYourBMWEvents + '?locale=' + locale() + '&userId=' + membershipIdEncrypt;
            },
            locateYourDealer: function() {
                return EXTERNAL_LINKS.locateYourDealer + '?locale=' + locale();
            },
            miniProductLine: function() {
                return EXTERNAL_LINKS.miniProductLine;
            },
            miniEmall: function() {
                return EXTERNAL_LINKS.miniEmall;
            },
            miniUsedCar: function() {
                return EXTERNAL_LINKS.miniUsedCar;
            },
            motorradProductLine: function() {
                return EXTERNAL_LINKS.motorradProductLine;
            },
            bmwProductLine: function() {
                return EXTERNAL_LINKS.bmwProductLine;
            },
            bmwEmall: function() {
                return EXTERNAL_LINKS.bmwEmall;
            },
            bmwUsedCar: function() {
                return EXTERNAL_LINKS.bmwUsedCar;
            },
            shareFeedback: function() {
                return EXTERNAL_LINKS.shareFeedback[localeService.gettextLang()] + '&memberId=' + membershipIdDoubleEncode;
            },
            bmwNews: function() {
                return EXTERNAL_LINKS.bmwNews;
            },
            bmwMagazine: function() {
                return EXTERNAL_LINKS.bmwMagazine;
            },
            chatLeaveMsg: function() {
                return EXTERNAL_LINKS.leaveMsg + '&lang=' + localeService.getChatLeaveMsgLang();
            },
            contactFaq: function() {
                var lang = locale();
                if (lang === "ZH-CN") {
                    return EXTERNAL_LINKS.contactFaq + "zh";
                } else {
                    return EXTERNAL_LINKS.contactFaq + "en";
                }
            },
            customerServices: function() {
                var lang = localeService.gettextLang();
                return EXTERNAL_LINKS.customerServices + lang + "/wcp/index.html";
            },
            chatWallpaper: function() {
                return EXTERNAL_LINKS.chatWallpaper + "?type=0" + "&locale=" + locale();
            },
            gifStickers: function() {
                return EXTERNAL_LINKS.gifStickers + "?type=1" + "&locale=" + locale();
            },
            digitalMagazine: function() {
                return EXTERNAL_LINKS.digitalMagazine[localeService.gettextLang()];
            },
            legalDisclaimer: function() {
                return EXTERNAL_LINKS.legalDisclaimer[localeService.gettextLang()];
            },
            mobisite: function() {
                return EXTERNAL_LINKS.mobisite;
            },
            apps: function() {
                return EXTERNAL_LINKS.apps;
            },
            subscriptionHistory: function() {
                return EXTERNAL_LINKS.subscriptionHistory + "?locale=" + locale();
            },
            ringtone: function() {
                return EXTERNAL_LINKS.ringtone + "?type=2" + "&locale=" + locale();
            },
            tv: function() {
                return EXTERNAL_LINKS.tv;
            },
            financeSelfService: function() {
                return EXTERNAL_LINKS.financeSelfService;
            },
            getReachnowLink: function () {
                return EXTERNAL_LINKS.reachnow;
            },
            bmwOfficialOwnerClub: function(){
                return EXTERNAL_LINKS.bmwOfficialOwnerClub;
            },
            reachnowBookACar: function(){
                return EXTERNAL_LINKS.reachnowBookACar;
            },
             reachnowMyTrips: function(){
                return EXTERNAL_LINKS.reachnowMyTrips;
            },
             reachnowSupport: function(){
                return EXTERNAL_LINKS.reachnowSupport;
            },
            reachnowMore: function(){
                return EXTERNAL_LINKS.reachnowMore;
            },
            bmwCustomerServiceOverview: EXTERNAL_LINKS.bmwCustomerServiceOverview,
            bmwUsedCarDiscover: EXTERNAL_LINKS.bmwUsedCarDiscover,
            bmwConnetedDriveStore: EXTERNAL_LINKS.bmwConnetedDriveStore,
            bmwBuyAccessories: EXTERNAL_LINKS.bmwBuyAccessories,
            bmwLifeStyleShop: EXTERNAL_LINKS.bmwLifeStyleShop,
            bmwFindoutSuitsYou: EXTERNAL_LINKS.bmwFindoutSuitsYou,

            miniBuyAccessories: EXTERNAL_LINKS.miniBuyAccessories,
            miniLifeStyleShop: EXTERNAL_LINKS.miniLifeStyleShop,
            merchant: function() {
                return EXTERNAL_LINKS.merchant[localeService.gettextLang()];
            },
            searchChargingStation: function() {
                return EXTERNAL_LINKS.searchChargingStation[localeService.gettextLang()];
            },
            aboutChargingService: function() {
                return EXTERNAL_LINKS.aboutChargingService[localeService.gettextLang()];
            },
            chargeNowOthers: function() {
                return EXTERNAL_LINKS.chargeNowOthers[localeService.gettextLang()];
            },
           findVehicleByOnline: EXTERNAL_LINKS.findVehicleByOnline,
           shopBuyNewVehicleOnline: EXTERNAL_LINKS.shopBuyNewVehicleOnline,
           motorradBuyNewVehicleOnline: EXTERNAL_LINKS.motorradBuyNewVehicleOnline,
           bookServiceAppointment: EXTERNAL_LINKS.bookServiceAppointment,
           vehicleOwnersHandbook: EXTERNAL_LINKS.vehicleOwnersHandbook
        };
    }
]);
