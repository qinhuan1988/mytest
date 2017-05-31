angular.module('webapp.chat').service({
    WebSocketService: ['$ionicScrollDelegate', '$rootScope', '$timeout', 'moment', 'LocaleService', 'ChatService', 'gettextCatalog', 'MemberInfoService', 'ENV_SETTING', WebSocketService]
});


function WebSocketService($ionicScrollDelegate, $rootScope, $timeout, moment, localeService, chatService, gettextCatalog, memberInfoService, ENV_SETTING) {
    var webId,
        stompClient,
        socketDomain,
        socketURL,
        subscribeURL,
        subscribeHistoryURL,
        customerServiceMessageURL,
        lastReceiveDate = moment().format('YYYY-MM-DD HH:mm:ss'),
        previousMsg;

    var initWebSocketConfig = function() {
        webId = memberInfoService.getMemberInfo().membershipId;
        stompClient = null;
        socketDomain = ENV_SETTING.chatDomain;
        socketURL = socketDomain + '/api/chat';
        subscribeURL = '/topic/' + 'loyalty_' + webId + '/webSubscribe';
        subscribeHistoryURL = '/app/init/channel/loyalty/' + webId + '/';
        customerServiceMessageURL = '/app/webMessage';
        previousMsg = {
            content: '',
            time: ''
        };
    };

    var connect = function(viewModel) {
        initWebSocketConfig();
        var socket = new SockJS(socketURL);
        stompClient = Stomp.over(socket);
        stompClient.connect({
            app: 'loyalty',
            webId: webId
        }, function() {
            $timeout(function() {
                viewModel.wsLost = false;
                resendMsg();
            });
            stompClient.subscribe(subscribeHistoryURL + lastReceiveDate, function(data) {
                var historyMessageArray = JSON.parse(data.body);
                if (historyMessageArray.length > 0 && historyMessageArray[0].updateTime) {
                    lastReceiveDate = historyMessageArray[0].updateTime;
                }
                historyMessageArray.reverse();
                setHistoryDialogs(historyMessageArray);
            });
            stompClient.subscribe(subscribeURL, function(data) {
                var receivedMessage = JSON.parse(data.body);
                if (previousMsg.time === receivedMessage.createTime && previousMsg.content === receivedMessage.content) {
                    return false;
                }
                if (receivedMessage.createTime) {
                    lastReceiveDate = receivedMessage.createTime;
                }
                previousMsg.content = receivedMessage.content;
                previousMsg.time = receivedMessage.createTime;
                setDialogs(receivedMessage);
            });
        }, function(msg) {
            $timeout(function() {
                viewModel.wsLost = true;
            });

            $timeout(function() {
                connect(viewModel);
            }, 2000);

        });
    };

    var disconnect = function() {
        stompClient.disconnect();
    };

    var getUnSendMsg = function() {
        var allDialogs = chatService.getAllDialogs();
        return  _.filter(allDialogs, function(item) {
            return (item.isSending === true && item.origin === 'me');
        });
    };

    var resendMsg = function() {
        var unSendMsg = getUnSendMsg();
        _.each(unSendMsg, function(item) {
            sendMessage(item.content, item.flag);
        });
    };

    var sendMessage = function(content, flag) {
        var sendMsg = {
            userId: 'loyalty_' + webId,
            content: content || 'test',
            senderType: 1,
            type: 'text',
            flag: flag,
            local: localeService.getWebSocketLang()
        };
        stompClient.send(customerServiceMessageURL, {}, JSON.stringify(sendMsg));
    };

    var setDialogs = function(receivedMessage) {
        var allDialogs = chatService.getAllDialogs();
        // if user msg, check flag and change isSending to false
        if (receivedMessage.kfId === null) {
            _.each(allDialogs, function(item) {
                if(item.flag === receivedMessage.flag) {
                    item.isSending = false;
                }
            });
        }
        if (receivedMessage.kfId !== null && receivedMessage.content !== null && receivedMessage.content.trim() !== '') {
            receivedMessage.origin = 'bmw';
            allDialogs.push(receivedMessage);
        }
        $timeout(function() {
            chatService.setAllDialogs(allDialogs);
            $ionicScrollDelegate.scrollBottom();
        });
    };

    var setHistoryDialogs = function(historyMessageArray) {

        $timeout(function() {
            var allDialogs = chatService.getAllDialogs();
            _.each(historyMessageArray, function(item) {
                if (item.type === 2) {
                    item.origin = 'me';
                }

                if (item.type === 3) {
                    item.origin = 'bmw';
                }
                allDialogs.push(item);
            });

            chatService.setAllDialogs(allDialogs);
            $ionicScrollDelegate.scrollBottom(true);
        });
    };

    var init = function(viewModel) {
        if (stompClient) {
            disconnect();
        }
        connect(viewModel);
    };

    var setLocalMsg = function(msg, createTime, flag) {

        var allDialogs = chatService.getAllDialogs();
        allDialogs.push({
            content: msg,
            createTime: createTime,
            origin: 'me',
            type: 'text',
            isSending: true,
            flag: flag
        });
        chatService.setAllDialogs(allDialogs);

        $ionicScrollDelegate.scrollBottom();
    };

    return {
        init: init,
        sendMessage: sendMessage,
        setLocalMsg: setLocalMsg,
        disconnect: disconnect
    };
}
