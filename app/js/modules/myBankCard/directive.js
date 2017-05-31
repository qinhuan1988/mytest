angular.module('webapp.bankcard').directive({
    securityPassword: ['$state', '$timeout', 'api', securityPassword],
    securityPasswordValidate: ['$state', '$timeout', 'api', 'DialogService', securityPasswordValidate],
    securityField: ['$state', '$timeout', 'api', securityField]
});

var isAndroid = ionic.Platform.isAndroid();
var isIOS = ionic.Platform.isIOS();

// resset password dots letter spacing
var resetLetterSpacing = function(widgetId, inputElement) {
    setTimeout(function() {
        // iphone 6 resolution
        var ratio = angular.element(document.getElementById(widgetId))[0].clientWidth/335;
        var spaceV = angular.element(document.getElementById(widgetId))[0].clientWidth/6 - 12/ratio;
        inputElement.css('letter-spacing', spaceV + 'px');
    }, 1000);
};

if(isAndroid) {

    var removeAndroidKeyboardOverlay = function() {
        var overlay = angular.element(document).find('body')[0].querySelector('.security-plugin-overlay--android');
        if(overlay && overlay.length !== 0) {
            overlay.remove();
        }
    };

    // handle android keyboard issue
    var setAndroidPageTop = function(top) {
        var body = angular.element(document).find('body');
        var pageContainter = angular.element(body[0].querySelector('.securityFieldContainer--android'));
        if(pageContainter.length !==0) {
            pageContainter[0].style.top = top + 'px';
            pageContainter[0].scrollTop = 0;
        }
    };

    document.addEventListener("backbutton", function() {
        passguardmanager.StopPassGuardKeyBoardAll();
        removeAndroidKeyboardOverlay();
        setAndroidPageTop(63);
    }, false);

    var registerAndroidKeyboardEvent = function(widgetId) {
        var body = angular.element(document).find('body');
        var overlay;
        if(angular.element(document.querySelector('.security-plugin-overlay--android')).length === 0) {
            overlay = document.createElement('div');
            overlay.className = 'security-plugin-overlay--android';
            body[0].appendChild(overlay);
            overlay.addEventListener('click', function() {
                // StopPassGuardKeyBoard is going to trigger window.doHideAction from passGuardManager.java
                passguardmanager.StopPassGuardKeyBoard(widgetId);
            }, false);
        }
    };

    window.doHideAction = function(id) {
        removeAndroidKeyboardOverlay();
        setAndroidPageTop(63);
        // passGuardManager is from passGuardManager.java, the keyboard plugin
        document.getElementById(id).value = passGuardManager.getText(id);
    };
    window.doShowAction = function(id) {
        // passGuardManager is from passGuardManager.java, the keyboard plugin
		document.getElementById(id).value = passGuardManager.getText(id);
	};
	window.addText = function(id, text) {
		document.getElementById(id).value = text;
	};
}

/*
 * create new payment password
 * <security-password></security-password>
 * widget-id="bindCard"
 * key="vm.key"
 * callback="fn()"
 */
function securityPassword($state, $timeout, api) {
    return {
        scope: {
            key: '=',
            randomFactor: '=?',
            callback: '&'
        },
        link: function(scope, element, attrs) {
            scope.widgetId = attrs.widgetId;
            var checkingPromise;
            scope.$on('$destroy', function() {
                $timeout.cancel(checkingPromise);
            });
            var checkLength = function() {
                checkingPromise = $timeout(function() {
                    passguardmanager.getOutput3(scope.widgetId, function(successParam) {
                        if(successParam < 6) {
                            checkLength();
                        } else {
                            passguardmanager.getOutput1(scope.widgetId, function(pwd) {
                                scope.isInitKeyboard = true;
                                passguardmanager.StopPassGuardKeyBoard(scope.widgetId);
                                if(isAndroid) {
                                    removeAndroidKeyboardOverlay();
                                    passguardmanager.clear(scope.widgetId);
                                    passguardmanager.destory(scope.widgetId);
                                }
                                scope.callback({paypassword: pwd});
                            });
                        }
                    });
                }, 500);
            };

            // security password / keyboard plugin
            var showKeyboard = function() {

                if(typeof passguardmanager !== 'undefined' && isAndroid) {

                    passguardmanager.hasPassGuard(scope.widgetId, function() {
            			passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                        passguardmanager.clear(scope.widgetId);
                        // make sure only register the listener once
                        if(scope.isInitKeyboard) {
                            checkLength();
                            scope.isInitKeyboard = false;
                        }
            		}, function() {
            			passguardmanager.newPassGuard(scope.widgetId, "");
            			passguardmanager.setPassGuardMode(scope.widgetId, "0");
                        passguardmanager.setButtonPress(scope.widgetId, true);
            			passguardmanager.setCipherKey(scope.widgetId, scope.randomFactor);
            			passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, false);
            			passguardmanager.setWebViewSyn(scope.widgetId, true);
                        passguardmanager.setWatchOutside(scope.widgetId, true);
            			passguardmanager.setMaxLength(scope.widgetId, 6);
                        passguardmanager.useNumberPad(scope.widgetId, true);
            			passguardmanager.initPassGuardKeyBoard(scope.widgetId);
            			passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                        passguardmanager.clear(scope.widgetId);
                        // make sure only register the listener once
                        if(scope.isInitKeyboard) {
                            checkLength();
                            scope.isInitKeyboard = false;
                        }
            		});

                    registerAndroidKeyboardEvent(scope.widgetId);
                }

                if(typeof passguardmanager !== 'undefined' && isIOS) {
                    passguardmanager.newPassGuard(scope.widgetId, scope.randomFactor);
                    passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, '0');
                    passguardmanager.setPassGuardMode(scope.widgetId, '0'); //设置明密文模式 ，0 密文 1 明文
                    passguardmanager.setMaxLength(scope.widgetId, '6');
                    passguardmanager.useNumberPad(scope.widgetId, '1');
                    passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                    // make sure only register the listener once
                    if(scope.isInitKeyboard) {
                        checkLength();
                        scope.isInitKeyboard = false;
                    }
                }
            };

            var inputElement = element.find('input');

            inputElement.on('click', showKeyboard);
            resetLetterSpacing(scope.widgetId, inputElement);

            if(!scope.key) {
                api.getRandomFactor().then(function(result) {
                    scope.key = result.chResult.key;
                    scope.randomFactor = result.chResult.random_factor;
                    scope.isInitKeyboard = true;
                    showKeyboard();
                });
            } else {
                scope.isInitKeyboard = true;
                showKeyboard();
            }
        },
        templateUrl: 'js/modules/myBankCard/template/securityPassword.html'
    };
}
/**

  * securityPassword validate for iOS
  * <security-password-validate></security-password-validate>

  * widget-id="bindCard"
  * valid-type="BBind"
  * callback="fn()"
**/
function securityPasswordValidate($state, $timeout, api, DialogService) {
    return {
        scope: {
            key: '=',
            randomFactor: '=',
            callback: '&'
        },
        link: function(scope, element, attrs) {
            scope.widgetId = attrs.widgetId;
            var checkingPromise;
            scope.$on('$destroy', function() {
                $timeout.cancel(checkingPromise);
            });
            var submit = function() {
                var postData = {
                    key : scope.key,
                    payment_pwd : scope.payment_pwd,
                    valid_type : attrs.validType
                };
                api.paymentPwdValidate(postData).then(function(result) {

                    if(result.chResult.result === '00') {
                        // bind card next tiem / unbind card
                        passguardmanager.StopPassGuardKeyBoard(scope.widgetId);

                        if(attrs.validType === 'BUnbind' || attrs.validType === 'BBind') {

                            scope.callback({authCode: result.chResult.auth_code});
                        } else {
                            //change password
                            scope.callback({pwd: scope.payment_pwd});
                        }
                    } else {
                        scope.isInitKeyboard = true;
                        DialogService.alertMsg(result.chResult.msg);
                        if(isAndroid) {
                            passguardmanager.StopPassGuardKeyBoard(scope.widgetId);
                            passguardmanager.clear(scope.widgetId);
                            passguardmanager.destory(scope.widgetId);
                        }
                    }

                    if(isAndroid) {
                        removeAndroidKeyboardOverlay();
                    }
                });
            };

            var checkLength = function() {
                checkingPromise = $timeout(function() {
                    passguardmanager.getOutput3(scope.widgetId, function(successParam) {
                        if(successParam < 6) {
                            checkLength();
                        } else {
                            passguardmanager.getOutput1(scope.widgetId, function(pwd) {
                                scope.payment_pwd  = pwd;
                                submit();
                            });
                        }
                    });
                }, 500);
            };

            var showKeyboard = function() {

                // security password / keyboard plugin
                if(typeof passguardmanager !== 'undefined' && isAndroid) {

                    registerAndroidKeyboardEvent(scope.widgetId);

                    passguardmanager.newPassGuard(scope.widgetId, "");
                    passguardmanager.setCipherKey(scope.widgetId, scope.randomFactor);
                    passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, false);
                    passguardmanager.setPassGuardMode(scope.widgetId, "0");
                    passguardmanager.setButtonPress(scope.widgetId, true);
                    passguardmanager.setWebViewSyn(scope.widgetId, true);
                    passguardmanager.setWatchOutside(scope.widgetId, true);
                    passguardmanager.setMaxLength(scope.widgetId, 6);
                    passguardmanager.useNumberPad(scope.widgetId, true);
                    passguardmanager.initPassGuardKeyBoard(scope.widgetId);
                    passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                    passguardmanager.clear(scope.widgetId);

                    // make sure only register the listener once
                    if(scope.isInitKeyboard) {
                        checkLength();
                        scope.isInitKeyboard = false;
                    }
                }

                if(typeof passguardmanager !== 'undefined' && isIOS) {
                    passguardmanager.newPassGuard(scope.widgetId, scope.randomFactor);
                    passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, '0');
                    passguardmanager.setPassGuardMode(scope.widgetId, '0'); //设置明密文模式 ，0 密文 1 明文
                    passguardmanager.setMaxLength(scope.widgetId, '6');
                    passguardmanager.useNumberPad(scope.widgetId, '1');
                    passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                    // make sure only register the listener once
                    if(scope.isInitKeyboard) {
                        checkLength();
                        scope.isInitKeyboard = false;
                    }
                }
            };

            var inputElement = element.find('input');

            inputElement.on('click', showKeyboard);
            resetLetterSpacing(scope.widgetId, inputElement);

            api.getRandomFactor().then(function(result) {
                scope.key = result.chResult.key;
                scope.randomFactor = result.chResult.random_factor;
                scope.isInitKeyboard = true;
                showKeyboard();
            });
        },
        templateUrl: 'js/modules/myBankCard/template/securityPassword.html'
    };
}

function securityField($state, $timeout, api) {
    return {
        scope: {
            callback: '&',
            key: '=',
            randomFactor: '=',
            widgetId: '=',
            widgetValue: '=',
            isInvalid: '=',
            isSubmited: '=',
            androidPageTop: '=?'
        },
        link: function(scope, element, attrs) {
            scope.title = attrs.placeholder || attrs.title;
            scope.regex = attrs.regex;
            var checkingPromise;
            scope.$on('$destroy', function() {
                $timeout.cancel(checkingPromise);
            });
            if(isIOS) {
                scope.numberPad = attrs.numberPad || "0";
            }

            if(isAndroid) {
                scope.numberPad = attrs.numberPad || 0;
            }

            if(attrs.maxlength) {
                scope.maxlength = attrs.maxlength;
            }

            var validation = function() {

                checkingPromise = $timeout(function() {
                    if(isAndroid) {
                        passguardmanager.checkMatch(scope.widgetId, function() {
                                checkMatchSuccess();
                        }, function() {
                            checkMatchFail();
                        });
                    }
                    if(isIOS) {
                        passguardmanager.checkMatch(scope.widgetId, function(successParam) {
                            if(successParam === '0') {
                                checkMatchFail();
                            } else {
                                checkMatchSuccess();
                            }
                        });
                    }
                }, 500);
            };

            var checkMatchSuccess = function() {
                passguardmanager.getOutput1(scope.widgetId, function(value) {
                    scope.widgetValue  = value;
                    scope.isInvalid = false;

                    scope.className = '';
                    scope.title = attrs.placeholder;
                    if(!scope.isSubmited) {
                        validation();
                    }
                });
            };

            var checkMatchFail = function() {
                scope.isInvalid = true;

                scope.className = 'errorLabel';
                scope.title = attrs.errorMsg;

                validation();
            };

            var showKeyboard = function() {
                // security password / keyboard plugin
                if(typeof passguardmanager !== 'undefined' && isAndroid) {

                    registerAndroidKeyboardEvent(scope.widgetId);
                    if(scope.androidPageTop) {
                        setAndroidPageTop(scope.androidPageTop);
                    }
                    passguardmanager.newPassGuard(scope.widgetId, "");
                    passguardmanager.setPassGuardMode(scope.widgetId, "1");
                    passguardmanager.setButtonPress(scope.widgetId, true);
                    passguardmanager.setCipherKey(scope.widgetId, scope.randomFactor);
                    passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, false);
                    passguardmanager.setWebViewSyn(scope.widgetId, true);
                    passguardmanager.setWatchOutside(scope.widgetId, true);
                    passguardmanager.setMatchRegex(scope.widgetId, attrs.regex);

                    if(scope.maxlength) {
                        passguardmanager.setMaxLength(scope.widgetId, scope.maxlength);
                    }
                    passguardmanager.useNumberPad(scope.widgetId, !!scope.numberPad);
                    passguardmanager.initPassGuardKeyBoard(scope.widgetId);
                    passguardmanager.StartPassGuardKeyBoard(scope.widgetId);
                    passguardmanager.clear(scope.widgetId);
                    // make sure only register the listener once
                    if(scope.isInitKeyboard) {
                        scope.isKeyboardShow = true;
                        validation();
                        scope.isInitKeyboard = false;
                    }
                }

                if(typeof passguardmanager !== 'undefined' && isIOS) {
                    passguardmanager.newPassGuard(scope.widgetId, scope.randomFactor);
                    passguardmanager.setPassGuardKeyBoardHasShowtoolbar(scope.widgetId, '0');
                    passguardmanager.setPassGuardMode(scope.widgetId, '1'); //设置明密文模式 ，0 密文 1 明文

                    passguardmanager.setMatchRegex(scope.widgetId, attrs.regex); //正则限制 输入完毕调用isMatch 判断是否符合预设的正则表达式

                    if(scope.maxlength) {
                        passguardmanager.setMaxLength(scope.widgetId, scope.maxlength);
                    }
                    passguardmanager.useNumberPad(scope.widgetId, scope.numberPad);
                    passguardmanager.StartPassGuardKeyBoard(scope.widgetId);


                    // make sure only register the listener once
                    if(scope.isInitKeyboard) {
                        scope.isKeyboardShow = true;
                        validation();
                        scope.isInitKeyboard = false;
                    }


                }
            };

            element.find('input').on('click', showKeyboard);

            if(!scope.key) {
                api.getRandomFactor().then(function(result) {
                    scope.key = result.chResult.key;
                    scope.randomFactor = result.chResult.random_factor;
                    scope.isInvalid = true;
                    scope.isInitKeyboard = true;
                });
            } else {
                scope.isInvalid = true;
                scope.isInitKeyboard = true;
            }
        },
        templateUrl: 'js/modules/myBankCard/template/securityField.html'
    };
}
