
var passguardmanager = {
    hasPassGuard:function(id, successCallback, errParam) {

        Cordova.exec(successCallback, errParam, "PassGuardManager", "hasPassGuard", [id]);
    },
    newPassGuard:function(id, generatekey) {

        Cordova.exec(null, null, "PassGuardManager", "newPassGuard", [id, generatekey]);
    },
    setCipherKey:function(id, generatekey) {

        Cordova.exec(null, null, "PassGuardManager", "setCipherKey", [id, generatekey]);
    },
    setPassGuardKeyBoardHasShowtoolbar:function(id, isshow) {

        Cordova.exec(null, null, "PassGuardManager", "setPassGuardKeyBoardHasShowtoolbar", [id, isshow]);
    },
    setWebViewSyn:function(id, isWebview) {

        Cordova.exec(null, null, "PassGuardManager", "setWebViewSyn", [id, isWebview]);
    },
    setMaxLength:function(id, maxLength) {

        Cordova.exec(null, null, "PassGuardManager", "setMaxLength", [id, maxLength]);
    },
    initPassGuardKeyBoard:function(id) {

        Cordova.exec(null, null, "PassGuardManager", "initPassGuardKeyBoard", [id]);
    },
    StartPassGuardKeyBoard:function(id) {

    	Cordova.exec(null, null, "PassGuardManager", "StartPassGuardKeyBoard", [id]);
    },
    getOutput1:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput1", [id]);
    },
    getOutput2:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput2", [id]);
    },
    getOutput3:function(id, successCallback){

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput3", [id]);
    },
    getText:function(id) {

        Cordova.exec(null, null, "PassGuardManager", "getText", [id]);
    },
    StopPassGuardKeyBoard:function(id) {

    	Cordova.exec(null, null, "PassGuardManager", "StopPassGuardKeyBoard", [id]);
    },
    StopPassGuardKeyBoardAll:function() {

    	Cordova.exec(null, null, "PassGuardManager", "StopPassGuardKeyBoardAll", []);
    },
    setPassGuardMode:function(id, mode) {

    	Cordova.exec(null, null, "PassGuardManager", "setPassGuardMode", [id, mode]);
    },
    setButtonPress:function(id, isShow) {

    	Cordova.exec(null, null, "PassGuardManager", "setButtonPress", [id, isShow]);
    },
    setInputRegex:function(id, inputRegex) {

    	Cordova.exec(null, null, "PassGuardManager", "setInputRegex", [id, inputRegex]);
    },
    setMatchRegex:function(id, matchRegex) {

    	Cordova.exec(null, null, "PassGuardManager", "setMatchRegex", [id, matchRegex]);
    },
    setReorder:function(id, type) {

    	Cordova.exec(null, null, "PassGuardManager", "setReorder", [id, type]);
    },
    checkMatch:function(id, successCallback, errParam) {

    	Cordova.exec(successCallback, errParam, "PassGuardManager", "checkMatch", [id]);
    },
    getPassLevel:function(id, successCallback) {

    	Cordova.exec(successCallback, null, "PassGuardManager", "getPassLevel", [id]);
    },
    useNumberPad:function(id, numpadFlag) {

    	Cordova.exec(null, null, "PassGuardManager", "useNumberPad", [id, numpadFlag]);
    },
    isKeyBoardShowing:function(id, successCallback, errParam) {

    	Cordova.exec(successCallback, errParam, "PassGuardManager", "isKeyBoardShowing", [id]);
    },
    hasKeyBoardShowing:function(successCallback, errParam) {

    	Cordova.exec(successCallback, errParam, "PassGuardManager", "hasKeyBoardShowing", []);
    },
    setWatchOutside:function(id, need) {

    	Cordova.exec(null, null, "PassGuardManager", "setWatchOutside", [id, need]);
    },
    clear:function(id) {

    	Cordova.exec(null, null, "PassGuardManager", "clear", [id]);
    },
    destory:function(id) {

    	Cordova.exec(null, null, "PassGuardManager", "destory", [id]);
    }

};

module.exports = passguardmanager;
