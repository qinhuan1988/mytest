angular.module('webapp.common').service({
    LocaleService: ['$ionicConfig', 'moment', 'gettextCatalog', 'tmhDynamicLocale', 'DEFAULT_SETTING', LocaleService]
});

function LocaleService($ionicConfig, moment, gettextCatalog, tmhDynamicLocale, DEFAULT_SETTING) {

    var defaultLang = DEFAULT_SETTING.translate.lang;
    var currentLang = '';

    var languageMapping = {
        zh: {
            momentLang: 'zh-cn',
            gettextLang: 'zh',
            externalLink: 'ZH-CN',
            aemContent: 'zh',
            apiLang: 'zh-cn',
            chatDialogLang: 0,
            webSocket: 'ZH-CN',
            chatLeaveMsgLang: 'zh',
            ngLocale: 'zh'
        },
        en: {
            momentLang: 'en',
            gettextLang: 'en',
            externalLink: 'EN-US',
            aemContent: 'en',
            apiLang: 'en-us',
            chatDialogLang: 1,
            webSocket: 'EN-US',
            chatLeaveMsgLang: 'en',
            ngLocale: 'en'
        }
    };

    var getOriginLang = function() {
        var lang = localStorage.getItem('lang') || window.navigator.language || defaultLang;
        return lang.substr(0, 2);
    };

    var setLang = function(lang) {
        currentLang = lang;
    };

    var getLang = function() {
        return currentLang;
    };

    var setAppLangEnv = function(lang) {
        lang = lang || getOriginLang();

        // only support en & zh for now, set English by default if lang was not supported
        if (lang !== 'en' && lang !== 'zh') {
            lang = defaultLang;
        }

        setLang(lang);
        localise(lang);
        gettextCatalog.debug = DEFAULT_SETTING.translate.debug;
    };

    var switchAppLang = function(lang) {
        setLang(lang);
        localStorage.setItem('lang', lang);
        localise(lang);
    };

    function localise(lang) {
        moment.locale(languageMapping[lang].momentLang);
        gettextCatalog.setCurrentLanguage(languageMapping[lang].gettextLang);
        $ionicConfig.backButton.text(gettextCatalog.getString('Back'));
        tmhDynamicLocale.set(languageMapping[lang].ngLocale);
    }

    var getExternalLinkLang = function() {
        return languageMapping[currentLang].externalLink;
    };

    var getAPILang = function() {
        return languageMapping[currentLang].apiLang;
    };

    var getChatContentByLang = function(content) {
        var arr = content.split('@@');
        return arr[languageMapping[currentLang].chatDialogLang] || arr[0];
    };

    var getWebSocketLang = function() {
        return languageMapping[currentLang].webSocket;
    };

    var getChatLeaveMsgLang = function() {
        return languageMapping[currentLang].chatLeaveMsgLang;
    };

    var gettextLang = function() {
        return languageMapping[currentLang].gettextLang;
    };

    return {
        getLang: getLang,
        gettextLang: gettextLang,
        setAppLangEnv: setAppLangEnv,
        switchAppLang: switchAppLang,
        getExternalLinkLang: getExternalLinkLang,
        getAPILang: getAPILang,
        getChatContentByLang: getChatContentByLang,
        getWebSocketLang: getWebSocketLang,
        getChatLeaveMsgLang: getChatLeaveMsgLang
    };
}
