/*
 *
 * security keyboard plugin
 * used in bmwlp payment keyboard
 *
*/
var passguardmanager = {
    hasPassGuard:function(id, successCallback) {
        Cordova.exec(successCallback, null, "PassGuardManager", "hasPassGuard", [id]);
    },
    newPassGuard:function(id, generatekey) {
        Cordova.exec(null, null, "PassGuardManager", "newPassGuard", [id, generatekey]);
    },
    newPassGuardTwo:function(id, repeatId, generatekey) {

        Cordova.exec(null, null, "PassGuardManager", "newPassGuardTwo", [id, repeatId, generatekey]);
    },
    setPassGuardMode:function(id, mode) {

        Cordova.exec(null, null, "PassGuardManager", "setPassMode", [id, mode]);
    },
    useNumberPad:function(id, numpadFlag) {
        Cordova.exec(null, null, "PassGuardManager", "useNumberPad", [id, numpadFlag]);
    },
    StartPassGuardKeyBoard:function(id) {

        Cordova.exec(null, null, "PassGuardManager", "StartPassGuardKeyBoard", [id]);
    },
    StopPassGuardKeyBoard:function(id) {

        Cordova.exec(null, null, "PassGuardManager", "StopPassGuardKeyBoard", [id]);
    },
    StopPassGuardKeyBoardAll:function() {

        Cordova.exec(null, null, "PassGuardManager", "StopPassGuardKeyBoardAll", []);
    },
    StopPassGuardKeyBoardAllExceptID:function(id) {

        Cordova.exec(null, null, "PassGuardManager", "StopPassGuardKeyBoardAllExceptID", [id]);
    },
    checkMatch:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "checkMatch", [id]);
    },
    setPassGuardKeyBoardHasShowtoolbar:function(id,isshow){
        Cordova.exec(null, null, "PassGuardManager", "setPassGuardKeyBoardHasShowtoolbar", [id,isshow]);
    },
    setCipherKey:function(id,generatekey) {

        Cordova.exec(null, null, "PassGuardManager", "setCipherKey", [id, generatekey]);
    },
    setMaxLength:function(id,maxLength) {

        Cordova.exec(null, null, "PassGuardManager", "setMaxLength", [id, maxLength]);
    },
    setMatchRegex:function(id, matchRegex) {
        Cordova.exec(null, null, "PassGuardManager", "setMatchRegex", [id, matchRegex]);
    },
    setInputRegex:function(id, inputRegex) {
        Cordova.exec(null, null, "PassGuardManager", "setInputRegex", [id, inputRegex]);
    },
    getText:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getText", [id]);
    },
    getOutput0:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput0", [id]);
    },
    getOutput1:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput1", [id]);
    },
    getOutput2:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput2", [id]);
    },
    getOutput3:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "getOutput3", [id]);
    },
    isKeyBoardShowing:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "isKeyBoardShowing", [id]);
    },
    hasKeyBoardShowing:function(successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "hasKeyBoardShowing", null);
    },
    validatePwdParams:function(id, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "validatePwdParams", [id]);
    },
    validateSetPwdParams:function(id, repeatId, successCallback) {

        Cordova.exec(successCallback, null, "PassGuardManager", "validateSetPwdParams", [id, repeatId]);
    },
    setHideKeyBoardJSName:function(id, HideKeyBoardJSName) {

        Cordova.exec(null, null, "PassGuardManager", "setHideKeyBoardJSName", [id, HideKeyBoardJSName]);
    },
    setDoneKeyBoardJSName:function(id, DoneKeyBoardJSName) {

        Cordova.exec(null, null, "PassGuardManager", "setDoneKeyBoardJSName", [id, DoneKeyBoardJSName]);
    },
    setCancelKeyBoardJSName:function(id, CancelKeyBoardJSName) {

        Cordova.exec(null, null, "PassGuardManager", "setCancelKeyBoardJSName", [id, CancelKeyBoardJSName]);
    },
    setWillShowKeyBoardJSName:function(id, WillShowKeyBoardJSName) {

        Cordova.exec(null, null, "PassGuardManager", "setWillShowKeyBoardJSName", [id, WillShowKeyBoardJSName]);
    }

};

module.exports = passguardmanager;
