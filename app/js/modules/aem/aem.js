angular.module('webapp.aem', [

]).factory('aem', ['$rootScope', '$http', 'ENV_SETTING', 'LocaleService', function($rootScope, $http, ENV_SETTING, localeService) {
    var DAMPath = ENV_SETTING.aemDomain + ENV_SETTING.aemDam;
    var lang = localeService.getLang;
    var contentPath = function() {
        var contentPath = ENV_SETTING.aemDomain;
        if (lang() === 'zh') {
            contentPath += ENV_SETTING.aemContentZh;
        } else {
            contentPath += ENV_SETTING.aemContentEn;
        }
        return contentPath;
    };
    return {
        getOfferDesc: function(offerId) {
            var url = contentPath() + '/offers/' + offerId.toString().toLowerCase() + '/_jcr_content/text.json';
            $rootScope.isLoadAEM = 1;
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getOfferDetails: function(offerId) {
            var url = contentPath() + '/offers/' + offerId.toString().toLowerCase() + '/_jcr_content/offer_details.json';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getOfferImgUrl: function(offerId) {
            return contentPath() + '/offers/' + offerId.toString().toLowerCase() + '/_jcr_content/image/image.img.png/';
        },

        getPartnerImgUrl: function(partnerCode) {
            return DAMPath + '/partners/' + partnerCode.toString().toLowerCase() + '.png';
        },

        getBankCardImgUrl: function(typeId) {
            return DAMPath + '/bankIcons/' + typeId.toString().toLowerCase() + '.png';
        },
        getAboutUsTemplateURL: function() {
            return contentPath() + "/about.html";
        },

        getSpendPointsMoreTemplateURL: function() {
            return contentPath() + "/about_us/spend-points-more.html";
        },

        getSpendPointsTemplateURL: function() {
            return contentPath() + "/about_us/spend_points.html";
        },

        getFAQTemplateURL: function() {
            return contentPath() + "/faq.html";
        },

        getContactFAQTemplateURL: function() {
            return contentPath() + "/contactfaq.html";
        },

        getAboutUsMoreTemplateURL: function() {
            return contentPath() + "/about.html";
        },

        getPartnersTemplateURL: function() {
            return contentPath() + "/partners.html";
        },

        getLevelsBenefitsTemplateURL: function() {
            return contentPath() + "/points_system/membership_benefits.html";
        },

        getPointsListTemplateURL: function() {
            return contentPath() + "/about_us/Membership_Benefits.html";
        },

        getEarnPointsMoreTemplateURL: function() {
            return contentPath() + "/about_us/Earn_Status_Points.html";
        },

        getTakeATourModalTemplateURL: function() {
            console.warn('aem.js: no "Take a Tour" link provided');
        },

        getEarnPointsTemplateURL: function() {
            return contentPath() + "/Earn_Status_Points.html";
        },

        getCustomerConsentURL: function() {
            return contentPath() + '/termsandconditions/customer-consent.html';
        },

        getVINInfoTemplateURL: function() {
            return contentPath() + "/vin.html";
        },
         getBankListInfoTemplateURL: function() {
            return contentPath() + "/banklist.html"; 
        },

        getOwershipInfoTemplateURL: function() {
            return contentPath() + "/vin1.html";
        },

        getTermsAndConditionsTemplateURL: function(id) {
            if (id) return contentPath() + "/termsandconditions/" + id.toString().toLowerCase() + ".html";
            else return '';
        },

        getRoadSideAssistanceTemplateURL: function() {
            return contentPath() + "/services/roadside_assistance.html";
        },

        getContactTemplateURL: function() {
            return contentPath() + "/services/contact.html";
        },

        // get partners list for the brand shops
        getPartnersList: function() {
            var url = ENV_SETTING.aemDomain;
            // AEM query builder
            url += '/bin/querybuilder.json';
            // search content under this node path
            url += '?path=/content/BMW-Loyalty/' + lang() + '/partners';
            // type and value of property to filter results
            url += '&property=cq:template';
            url += '&property.value=/apps/bmwLP/templates/partners_template';
            // select only the title
            url += '&p.hits=selective';
            url += '&p.properties=jcr:title';
            // getting full list, no pagging
            url += '&p.limit=-1';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getPartnerInfo: function(partnerName) {
            var url = ENV_SETTING.aemDomain;
            // AEM query builder
            url += '/bin/querybuilder.json';
            url += '?path=/content/BMW-Loyalty/' + lang() + '/partners/' + partnerName + '/jcr:content';
            url += '&path.flat=true';
            url += '&p.limit=-1';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getPartnerItemsList: function(partnerName) {
            var url = ENV_SETTING.aemDomain;
            // AEM query Builder
            url += '/bin/querybuilder.json';
            url += '?path=/content/BMW-Loyalty/' + lang() + '/partners/' + partnerName;
            url += '&type=cq:Page';
            url += '&path.flat=true';
            url += '&p.limit=-1';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getPartnerItemInfo: function(path) {
            var url = ENV_SETTING.aemDomain;
            // AEM query builder
            url += '/bin/querybuilder.json';
            url += '?path=' + path + '/jcr:content';
            url += '&path.flat=true';
            url += '&p.limit=-1';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        },

        getBrandShopSliderAssets: function(pageName) {
            var url = ENV_SETTING.aemDomain;
            // AEM querybuilder
            url += '/bin/querybuilder.json';
            url += '?path=/content/dam/bmw-loyalty/brandshops/' + pageName + '/slider&path.flat=true&p.limit=-1';
            url += '&path.flat=true&p.limit=-1';
            return $http({
                url: url,
                dataType: 'json',
                method: 'GET'
            });
        }
    };
}]);
