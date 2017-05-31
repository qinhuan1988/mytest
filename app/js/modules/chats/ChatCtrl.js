angular.module('webapp.chat', [

]).controller({
    ChatCtrl: [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicModal',
        '$ionicNavBarDelegate',
        '$ionicScrollDelegate',
        '$timeout',
        '$ionicActionSheet',
        'gettextCatalog',
        'externalLinks',
        'moment',
        'OffersService',
        'ChatService',
        'WebSocketService',
        'LocaleService',
        'ExternalLinksService',
        '$ionicTabsDelegate',
        ctrl
    ]
});

function ctrl(
    $rootScope,
    $scope,
    $state,
    $ionicModal,
    $ionicNavBarDelegate,
    $ionicScrollDelegate,
    $timeout,
    $ionicActionSheet,
    gettextCatalog,
    externalLinks,
    moment,
    offersService,
    chatService,
    webSocketService,
    localeService,
    externalLinksService,
    $ionicTabsDelegate
) {
    var vm = this;

    /*
     * on chat view events
     *
     * order counts (http://www.gajotres.net/understanding-ionic-view-lifecycle/)
     *
     */

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
        // init with side menu open
        if (data.direction === 'back' && $scope.dash.goBackEnableSidebar) {
            $scope.dash.openSideBar();
            $scope.dash.goBackEnableSidebar = false;
        }

        // refresh title position
        $ionicNavBarDelegate.align('center');

        // show tabs
        $rootScope.hideTabs = false;
    });

    $scope.$on('$ionicView.afterEnter', function(event, data) {
        // init on tab input mode
        if (data.stateParams.openKeyboard) {
            $rootScope.isChatMode = true;
        }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
        // hide tabs menu
        $rootScope.hideTabs = true;

        // reset tab menu selection
        $ionicTabsDelegate.select(0);

        // hide tabs menu content
        $scope.dash.hidePopupLayers();
    });


    $scope.$on('scrollBottom', function() {
        $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
        }, 1000);
    });


    var cancelChatLogoutEvent = $rootScope.$on('chat:logout', function() {
        chatService.cleanAllDialogs();
        webSocketService.disconnect();
        vm.wsLost = true;
    });

    var cancelWebsocketEvent = $rootScope.$on('restart:webSocket', function() {
        webSocketService.init(vm);
    });

    $scope.$on('$destroy', function() {
        cancelWebsocketEvent();
        cancelChatLogoutEvent();
    });

    vm.wsLost = true;
    webSocketService.init(vm);

    var loadHistoryMsg = function() {
        chatService.loadPreviousActivePushData({
            date: chatService.getPreviousRequestDate(),
            status: 1,
            times: 2
        }).then(function() {
            $rootScope.loading++;
            chatService.insertPreviousActivePush();
            chatService.insertChatDialogs();
            chatService.setMarkDownTime();

            vm.dialogs = chatService.getAllDialogs();
            if (vm.dialogs.length === 0) {
                chatService.insertDefaultChatDialog();
            }
            if (chatService.getPreviousDialogs().length === 0 && chatService.getPreviousAllCampaigns().length !== 0) {
                $rootScope.loading--;
                $ionicScrollDelegate.scrollBottom();
            } else {
                $timeout(function() {
                    $ionicScrollDelegate.scrollBottom();
                    $rootScope.loading--;
                }, 1000);
            }
        });
    };

    var loadHistoryByPulldown = function() {
        chatService.loadPreviousActivePushData({
            date: chatService.getPreviousRequestDate(),
            status: 1
        }).then(function() {
            chatService.insertPreviousActivePush();
            chatService.insertChatDialogs();
            chatService.setMarkDownTime();

            vm.dialogs = chatService.getAllDialogs();
            $scope.$broadcast('scroll.refreshComplete');
            $rootScope.pullToRefresh = 0;

        });
    };

    var loadAllChatMsg = function() {
        chatService.cleanAllDialogs();
        vm.dialogs = [];

        chatService.chatUserUpdate().then(function() {
            chatService.loadActivePushData({
                date: moment().format('YYYYMMDD')
            }).then(function() {
                chatService.setDialogs();
                chatService.insertChatDialogs();
                chatService.insertPreviousActivePush();
                chatService.setMarkDownTime();
                vm.dialogs = chatService.getAllDialogs();
                if (vm.dialogs.length === 0) {
                    chatService.insertDefaultChatDialog();
                }
                $timeout(function() {
                    $ionicScrollDelegate.scrollBottom();
                }, 1000);
            });
        });
    };

    loadAllChatMsg();

    vm.refreshView = function() {
        var requireDate = chatService.getPreviousRequestDate();
        if (requireDate) {
            $rootScope.pullToRefresh = 1;
            chatService.chatUserUpdate().then(function() {
                loadHistoryByPulldown();
            });
        } else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    };

    vm.sendMsg = function() {
        if (!vm.msg) {
            return false;
        }
        var uniqueFlag = new Date().getTime() + '';
        webSocketService.setLocalMsg(vm.msg, moment().format('YYYY-MM-DD HH:mm:ss'), uniqueFlag);
        chatService.setMarkDownTime();
        webSocketService.sendMessage(vm.msg, uniqueFlag);
        vm.msg = '';
    };


    var showNextCampaign = function() {
        // show next campaign
        $timeout(function() {
            chatService.moveToNextCampaign();
            chatService.updateActivePush({}).then(function() {
                chatService.setDialogs();
                vm.dialogs = chatService.getAllDialogs();

                $ionicScrollDelegate.scrollBottom();

                if (chatService.isSoloCampaign()) {
                    showNextCampaign();
                }
            });
        }, 1000);
    };



    vm.openDialogLink = function(url) {
        if (url) {
            externalLinksService.openURL(url);
        }
    };

    vm.getChatContentByLang = function(content) {
        // cut generalCampaigns flag
        content = content.replace(/#.+#/, '');
        return localeService.getChatContentByLang(content);
    };

    vm.getChatOptionsByLang = function(options, answer) {
        if (options) {
            return localeService.getChatContentByLang(options);
        }
        if (answer === 'yes') {
            return gettextCatalog.getString('yes');
        }
        if (answer === 'no') {
            return gettextCatalog.getString('no');
        }
    };

    vm.updateAnswer = function(dialog, answer) {

        if (dialog.answer || dialog.isPrevious) {
            return false;
        }

        $scope.$broadcast('scrollBottom');

        dialog.answer = answer;

        if (answer === 'yes') {

            if (chatService.isGeneralCampaign(dialog.content)) {
                chatService.moveToNextCampaign();
                chatService.setDialogs();
                vm.dialogs = chatService.getAllDialogs();
                return false;
            }

            chatService.showNextDialog();

            chatService.setDialogs(true);
            vm.dialogs = chatService.getAllDialogs();

            if (chatService.isLastDialog()) {
                showNextCampaign();
            }

        } else if (answer === 'no') {

            // this case is only for one general campaign
            if (chatService.isGeneralCampaign(dialog.content)) {
                return false;
            }

            if (chatService.isLastCampaign()) {
                return false;
            }

            var generalCampaign = chatService.getGeneralCampaignByChoice(dialog.choice);

            if (!generalCampaign) {
                chatService.moveToNextCampaign();
                chatService.setDialogs();
                vm.dialogs = chatService.getAllDialogs();

            } else {
                vm.dialogs.push(generalCampaign);
            }
        }

    };


    vm.showOfferInfo = function(offerInfo) {
        offersService.setCurrentOfferInfo(offerInfo);
        $state.go('dash.offerInfo', {
            offerId: offerInfo.itemId
        });
    };

    vm.switchPushActiveMode = function() {
        if (typeof cordova !== 'undefined' && ionic.Platform.isIOS()) {
            cordova.plugins.Keyboard.close();
        }
        $rootScope.isChatMode = false;
    };

    vm.openLeaveMsgLink = function() {
        var ref = window.open(encodeURI(externalLinks.chatLeaveMsg()), '_blank', 'location=yes');
        ref.addEventListener('loadstop', function(event) {
            if (event.url.match('close.jsp')) {
                ref.close();
            }
        });
    };

    vm.showImage = function(url) {
        $scope.imageURL = url;
        $ionicModal.fromTemplateUrl('js/modules/chats/templates/imagePreview.html', function($ionicModal) {
            $scope.modal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function() {
            $scope.modal.show();

        });

        $scope.hideImg = function() {
            $scope.modal.remove();
        };
    };

    vm.onDialogHold = function(e, content, dialog) {
        if (dialog.origin && dialog.type !== 'text' && dialog.chatType !== 'text') {
            return false;
        }
        dialog.onhold = true;
        if (typeof cordova !== 'undefined' && ionic.Platform.isIOS()) {
            cordova.plugins.Keyboard.close();
        }
        $ionicActionSheet.show({
            buttons: [{
                text: gettextCatalog.getString('Copy Text')
            }, {
                text: gettextCatalog.getString('Cancel')
            }],
            cancel: function() {
                dialog.onhold = false;
            },
            buttonClicked: function(index) {
                switch (index) {
                    case 0: // Copy Text
                        if (typeof cordova !== 'undefined') {
                            cordova.plugins.clipboard.copy(content);
                        }
                        break;
                    case 1: // cancel
                        dialog.onhold = false;
                        break;
                    default:
                        dialog.onhold = false;
                }
                return true;
            }
        });
    };
}
