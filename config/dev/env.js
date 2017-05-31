angular.module('webapp.envConfig', [])

.constant('ENV_SETTING', {
        'imageBaseURL': '',
        'baseApiUrl': 'https://elsdemo-bmw-current.loyaltyprime.net/v1/services',
        'accessToken': 'nvSAYq+thobWCX2vI4oP9ZHNinE=',
        'aemDomain': 'http://bmwcn-loyaltyaem-publish-01-dev.bmw.mcon.net:4503',
        'chatDomain': 'https://ichatplatform.bmw.com.cn',
        'aemDam': '/content/dam/bmw-loyalty',
        'aemContentEn': '/content/BMW-Loyalty/en',
        'aemContentZh': '/content/BMW-Loyalty/zh',
        'trackingId': 14,
        'levels': {
            'silver': '16',
            'gold': '17',
            'platinium': '18',
            'pure': '72',
            'blue': '73'
        },
        'market_code': '4000105996',
        'DEBUG': true
    })
    .constant('EXTERNAL_LINKS', {
        "checkOurOffers": "https://ichatplatform.bmw.com.cn/LoyaltyProductInquiry/productCategory?locale=ZH-CN",
        "buildYourBMW": "https://www.bmw.com.cn/zh/ssl/configurator.html#/",
        "requestYourQuotation": "https://ichatplatform.bmw.com.cn/LoyaltyTestDrive/Index",
        "requestTestDriveBMW": "https://ichatplatform.bmw.com.cn/LoyaltyTestDrive/Index",
        "requestTestDriveMini": "http://www.minichina.com.cn/m_register.html?type=1",
        "requestTestDriveMotorrad": "http://139.217.2.64/bmwmoto/testdrivebooking.jsp",
        "joinYourBMWEvents": "https://ichatplatform.bmw.com.cn/LoyaltyWebCampaign/CampaignCategory",
        "locateYourDealer": "https://ichatplatform.bmw.com.cn/LoyaltyWebDealer/DealerCategory",
        "miniProductLine": "http://www.minichina.com.cn/index_m.html#miniAnchor",
        "miniEmall": "http://emall.minichina.com.cn/portal/CampaignApril2016/index_2.html",
        "miniUsedCar": "http://usedcar.minichina.com.cn/portal/mobilemini/index.html",
        "motorradProductLine": "http://m.bmw-motorrad.com.cn/cn/zh/bike/model_overview.html",
        "bmwProductLine": "http://www.bmw.com.cn/cn_mobi/zh/index.html?mz_ca=2018564&mz_sp=6zcwE&mz_kw=4355881&mz_sb=1",
        "bmwEmall": "http://www.bmw.com.cn/cn_mobi/zh/aftersales/ecommerce/overview.html",
        "bmwUsedCar": "http://bmwusedcar.bmw.com.cn/portal/mobile/index.html",
        "shareFeedback": {
            "en": "https://ichatplatform.bmw.com.cn/Questionair/Index?id=126&locale=en-us",
            "zh": "https://ichatplatform.bmw.com.cn/Questionair/Index?id=125&locale=zh-cn"
        },
        "legalDisclaimer": {
            "en": "http://www.bmw.com.cn/zh/footer/imprint-overview/personal_data.html",
            "zh": "http://www.bmw.com.cn/zh/footer/imprint-overview/personal_data.html"
        },
        "bmwNews": "http://mobilenews.bmw.com.cn/s0n0p0001.s",
        "bmwMagazine": "http://magazine.bmw.com.cn/cn/zh-hans",
        "leaveMsg": "https://ichatplatform.bmw.com.cn/client/leave-message.html?app=loyalty",
        "contactFaq": "https://kbs.bmw.com.cn:9443/faq/loyalty/faqSearch/",
        "customerServices": "https://cmscn.bmwgroup.com/content/bmw-wechat/",
        "chatWallpaper": "https://pchatplatform.bmw.com.cn/BMWMaterialDownLoad/Index",
        "gifStickers": "https://pchatplatform.bmw.com.cn/BMWMaterialDownLoad/Index",
        "digitalMagazine": {
            "en": "http://magazine.bmw.com.cn/cn/zh-hans",
            "zh": "http://magazine.bmw.com.cn/cn/zh-hans"
        },
        "mobisite": "http://www.bmw.com.cn/zh/index.html",
        "apps": "http://www.bmw.com.cn/zh/topics/owners/leasing.html",
        "subscriptionHistory": "https://pchatplatform.bmw.com.cn/WebCampaignHistory/Index",
        "ringtone": "https://pchatplatform.bmw.com.cn/BMWMaterialDownLoad/Index",
        "tv": "http://www.bmw.com.cn/zh/webtv/index.html",
        "financeSelfService": "https://mlp-prod.bmwgroup.com/MLP/Login",
        "reachnow": "https://www.reachnow.cn/content/apps/reachnow",
        "bmwCustomerServiceOverview": "https://cmscn.bmwgroup.com/content/bmw-wechat/ZH_CN/bmw_aftersales/car_teaching.html",
        "bmwUsedCarDiscover": "http://www.bmw.com.cn/zh/topics/used_car.html",
        "bmwConnetedDriveStore": "http://www.bmw.com.cn/zh/topics/experience/connected-drive/connecteddrive-store-portal.html",
        "bmwBuyAccessories": "https://bmw.m.tmall.com/shop/shop_auction_search.htm?spm=a320p.7692363.0.0&sort=default&shop_cn=原厂加装&ascid=1249770814&scid=1249770814",
        "bmwLifeStyleShop": "https://bmw.m.tmall.com/shop/shop_auction_search.htm?spm=a320p.7692363.0.0&sort=default&shop_cn=生活精品&ascid=982546590&scid=982546590",
        "miniBuyAccessories": "http://www.minichina.com.cn/factory_allparts_m.html",
        "miniLifeStyleShop": "http://www.minichina.com.cn/m_service_hqlife.html",
        "bmwFindoutSuitsYou": "http://findyour.bmw.com.cn/",
        "bmwOfficialOwnerClub":"https://www.mybmwclub.cn/member.php?mod=logging&action=login&referer=",
        "reachnowBookACar" :"https://www.reachnow.cn/download.html#book",
        "reachnowMyTrips" : "https://www.reachnow.cn/download.html#trips",
        "reachnowSupport": "https://www.reachnow.cn/download.html#support",
        "reachnowMore": "https://www.reachnow.cn/download.html#more",
        "merchant": {
            "en": "https://www.zihexin.net/merchant/en/",
            "zh": "https://www.zihexin.net/merchant/cn/"
        },
         "searchChargingStation": {
            "en": "https://pchatplatform.bmw.com.cn/chargeNow/listEn",
            "zh": "https://pchatplatform.bmw.com.cn/chargeNow/list"
        },
        "aboutChargingService": {
            "en": "https://cmscn.bmwgroup.com/content/cms/bmw-wechat/zh/bmw_loyalty/charge_en.html",
            "zh": "https://cmscn.bmwgroup.com/content/cms/bmw-wechat/zh/bmw_loyalty/charge_cn.html",

        },
        "chargeNowOthers": {
            "en": "https://cmscn.bmwgroup.com/content/cms/bmw-wechat/zh/bmw_loyalty/faq_en.html",
            "zh": "https://cmscn.bmwgroup.com/content/cms/bmw-wechat/zh/bmw_loyalty/faq_cn.html"
        },
        "findVehicleByOnline": "http://emall.bmw.com.cn/portal/bmwnc/index.html",
        "shopBuyNewVehicleOnline": "http://emall.bmw.com.cn/portal/bmwnc/index.html",
        "motorradBuyNewVehicleOnline": "http://emall.bmw-motorrad.com.cn/portal/motor/index.html",
        "bookServiceAppointment": "https://detail.m.tmall.com/item.htm?id=520306120297",
        "vehicleOwnersHandbook": "https://cmscn.bmwgroup.com/content/cms/bmw-wechat/en/welcome.html"
    });
