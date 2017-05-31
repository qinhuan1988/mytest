angular.module('webapp.chat').service({
    ChatService: ['moment', 'api', 'gettextCatalog', 'OffersService', '$ionicScrollDelegate', '$timeout', ChatService]
});


function ChatService(moment, api, gettextCatalog, offersService, $ionicScrollDelegate, $timeout) {
    var allCampaigns = [],
        allDialogs = [],
        previousAllCampaigns = [],
        previousCampaigns = [], // status = 1
        previousDialogs = [],
        specialCampaigns = [],
        generalCampaigns = [],
        chatDialogs = [],
        currentCampaignIndex = 0,
        currentDialogIndex = 0,
        previousRequestDate = '',
        currentCampaign = {},
        markDownTime = '',
        defaultChatDialog = {
            content: gettextCatalog.getString('Welcome to BMW, how can I help you?'),
            createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastDialog: true,
            type: 'text',
            origin: 'bmw'
        };

    var getRequestDate = function(responseData) {
        if (responseData.length !== 0) {
            return moment(responseData[0].updateTime).format('YYYYMMDD');
        } else {
            return moment().format('YYYYMMDD');
        }
    };

    var setAllCampaigns = function() {
        allCampaigns = _.filter(allCampaigns, function(item) {
            return item.status === 0;
        });
    };

    var setGeneralCampaigns = function() {
        generalCampaigns = _.filter(allCampaigns, function(item) {
            return /#.+#/.test(item.content);
        });
    };

    var setSpecialCampaigns = function() {
        specialCampaigns = _.filter(allCampaigns, function(item) {
            if (item.children && item.children.length === 1) {
                item.children[0].lastDialog = true;
            }
            return (item.children && item.children.length > 0);
        });
    };

    var setPreviousCampaigns = function(campaigns) {
        previousAllCampaigns = [];
        previousAllCampaigns = campaigns;
        previousCampaigns = [];
        previousCampaigns = _.filter(campaigns, function(item) {
            return item.status === 1;
        });
    };

    var getVoucherId = function(content) {
        return content.split('##')[1];
    };

    var setPreviousDialogs = function() {
        previousDialogs = [];
        _.each(previousCampaigns, function(item) {
            item.isPrevious = true;

            if (item.children && item.children.length === 0) {
                if (/##.+/.test(item.content)) {
                    item.voucherId = getVoucherId(item.content);
                }
                if (/#welcome#/.test(item.content)) {
                    item.lastDialog = true;
                }
                previousDialogs.push(item);
            } else {
                _.each(item.children, function(subItem, index) {
                    if (/##.+/.test(subItem.content)) {
                        subItem.voucherId = getVoucherId(subItem.content);
                    }
                    if (item.children.length === (index + 1)) {
                        subItem.lastDialog = true;
                    }
                    if (/#faq#/.test(subItem.content)) {
                        subItem.isFaq = true;
                        // #faq#{{titleZH@@titleEN}}{{descriptionZH@@descriptionEN}}
                        var tempContent = subItem.content;
                        var tempArr = tempContent.split('}}{{');

                        subItem.title = tempArr[0].replace('{{', '');
                        subItem.content = tempArr[1].replace('}}', '');

                    }
                    subItem.isPrevious = true;
                    previousDialogs.push(subItem);
                });
            }
        });
    };

    var setPreviousChatDialogs = function() {
        chatDialogs = [];
        chatDialogs = _.filter(previousCampaigns, function(item) {
            // 2 is client msg
            // 3 is service msg
            return (item.type === 2 || item.type === 3);
        });
    };

    var setPreviousRequestDate = function(responseData) {
        if (responseData.length !== 0) {
            previousRequestDate = moment(responseData[responseData.length-1].updateTime).subtract(1, 'days').format('YYYYMMDD');
        } else {
            previousRequestDate = false;
        }
    };

    var loadActivePushData = function(data) {
        return api.loadActivePushData(data).then(function(res) {
            var requestData = getRequestDate(res.chatResult.data.data);
            if (moment(requestData).isSame(moment().format('YYYYMMDD'))) {
                allCampaigns = res.chatResult.data.data;
                setAllCampaigns();
                setGeneralCampaigns();
                setSpecialCampaigns();

                // history for today
                setPreviousCampaigns(res.chatResult.data.data);
                setPreviousDialogs();
                setPreviousChatDialogs();
                setPreviousRequestDate(res.chatResult.data.data);
            } else {
                previousRequestDate = requestData;
            }
        });
    };

    var loadPreviousActivePushData = function(data) {
        return api.loadActivePushData(data).then(function(res) {
            setPreviousCampaigns(res.chatResult.data.data);
            setPreviousDialogs();
            setPreviousChatDialogs();
            setPreviousRequestDate(res.chatResult.data.data);
        });
    };

    var chatUserUpdate = function() {
        return api.chatUserUpdate();
    };

    var updateActivePush = function(data) {
        data = data || {};
        var postData = _.defaults(data, {
            id: currentCampaign.id
        });
        return api.updateActivePush(postData);
    };

    // when user click yes
    var showNextDialog = function() {
        currentDialogIndex++;
    };

    var isGeneralCampaign = function(content) {
        return /#.+#/.test(content);
    };

    var getPreviousAllCampaigns = function() {
        return previousAllCampaigns;
    };

    var isLastDialog = function() {
        if (currentCampaign.children.length > 0 && currentCampaign.children.length === (currentDialogIndex + 1)) {
            currentCampaign.children[currentDialogIndex].lastDialog = true;
            return true;
        }
        return false;
    };

    var loadVoucherContentById = function(item) {
        offersService.getOfferById(item.voucherId).then(function(result) {
            if (result.benefitDetails !== null) {
                offersService.restructureOffers(result.benefitDetails);
                offersService.extendOfferInfo(result.benefitDetails[0]).then(function(res) {
                    item.benefitItem = res;
                    if (!item.isPrevious) {
                        $timeout(function() {
                            $ionicScrollDelegate.scrollBottom(true);
                        }, 1000);
                    }
                });
            } else {
                item.noVoucherContent = 'offerId: ' + item.voucherId + ': No result found';
            }
        });
    };

    var setSpecialDialogVoucher = function() {
        var currentDialogContent = currentCampaign.children[currentDialogIndex].content;
        if (/##.+/.test(currentDialogContent)) {
            currentCampaign.children[currentDialogIndex].voucherId = getVoucherId(currentDialogContent);
            loadVoucherContentById(currentCampaign.children[currentDialogIndex]);
        }
    };

    var setSpecialDialogFAQ = function() {
        var currentDialogContent = currentCampaign.children[currentDialogIndex].content;
        // #faq#{{titleZH@@titleEN}}{{descriptionZH@@descriptionEN}}
        if (/#faq#/.test(currentDialogContent)) {
            currentCampaign.children[currentDialogIndex].isFaq = true;
            var tempArr = currentDialogContent.split('}}{{');

            currentCampaign.children[currentDialogIndex].title = tempArr[0].replace('{{', '');
            currentCampaign.children[currentDialogIndex].content = tempArr[1].replace('}}', '');
        }
    };

    var getDialogVoucherId = function() {
        return currentCampaign.children[currentDialogIndex].voucherId;
    };

    var moveToNextCampaign = function() {
        currentCampaignIndex++;
        currentDialogIndex = 0;
    };

    // isForcePush: when user anwser yes / no
    var setDialogs = function(isForcePush) {

        if (allCampaigns.length === 0) {
            return false;
        }

        // if no more special campaigns, stop appending
        if (specialCampaigns.length < (currentCampaignIndex + 1)) {
            return false;
        }

        currentCampaign = specialCampaigns[currentCampaignIndex];

        setSpecialDialogVoucher();
        setSpecialDialogFAQ();
        // check if array not exceed and
        // currentDialog not included in allDialogs (when user login again)
        if (currentCampaign.children.length >= (currentDialogIndex + 1) &&
            (isForcePush || !_.some(allDialogs, currentCampaign.children[currentDialogIndex]))
        ) {
            allDialogs.push(currentCampaign.children[currentDialogIndex]);

        }
    };

    var getGeneralCampaignByChoice = function(choice) {
        if (!choice) {
            return void(0);
        }
        return _.find(generalCampaigns, function(item) {
            return item.content.indexOf('#' + choice + '#') !== -1;
        });
    };

    var isLastCampaign = function() {
        return (specialCampaigns.length <= (currentCampaignIndex + 1));
    };

    var isSoloCampaign = function() {
        return currentCampaign.children.length === 1;
    };

    var getPreviousDialogs = function() {
        return previousDialogs;
    };

    var insertPreviousActivePush = function() {
        previousDialogs.reverse();
        _.each(previousDialogs, function(item) {
            allDialogs.unshift(item);

            if (item.voucherId) {
                loadVoucherContentById(item);
            }
        });
    };

    var insertDefaultChatDialog = function() {
        allDialogs.unshift(defaultChatDialog);
    };

    var getPreviousRequestDate = function() {
        return previousRequestDate;
    };

    var insertChatDialogs = function() {
        _.each(chatDialogs, function(item) {
            if (item.type === 2) {
                item.origin = 'me';
            }
            if (item.type === 3) {
                item.origin = 'bmw';
            }
            allDialogs.unshift(item);
        });
    };

    var cleanAllDialogs = function() {
        allCampaigns = [];
        allDialogs = [];
        previousAllCampaigns = [];
        previousCampaigns = [];
        previousDialogs = [];
        specialCampaigns = [];
        generalCampaigns = [];
        chatDialogs = [];
    };

    var getAllDialogs = function() {
        return allDialogs;
    };

    var setAllDialogs = function(dialogs) {
        allDialogs = dialogs;
    };

    var setMarkDownTime = function() {
        markDownTime = '';
        _.each(allDialogs, function(item) {
            var currentTime = item.updateTime || item.createTime;
            if (!markDownTime && currentTime) {
                markDownTime = currentTime;
                item.markDownTime = markDownTime;
            } else {
                if (moment(currentTime).subtract(5, 'minutes').isAfter(moment(markDownTime))) {
                    markDownTime = currentTime;
                    item.markDownTime = markDownTime;
                }
            }
        });
    };

    return {
        loadActivePushData: loadActivePushData,
        loadPreviousActivePushData: loadPreviousActivePushData,
        chatUserUpdate: chatUserUpdate,
        updateActivePush: updateActivePush,
        showNextDialog: showNextDialog,
        setDialogs: setDialogs,
        isLastDialog: isLastDialog,
        moveToNextCampaign: moveToNextCampaign,
        getGeneralCampaignByChoice: getGeneralCampaignByChoice,
        isGeneralCampaign: isGeneralCampaign,
        isLastCampaign: isLastCampaign,
        getDialogVoucherId: getDialogVoucherId,
        isSoloCampaign: isSoloCampaign,
        getPreviousAllCampaigns: getPreviousAllCampaigns,
        getPreviousDialogs: getPreviousDialogs,
        insertPreviousActivePush: insertPreviousActivePush,
        insertDefaultChatDialog: insertDefaultChatDialog,
        getPreviousRequestDate: getPreviousRequestDate,
        insertChatDialogs: insertChatDialogs,
        cleanAllDialogs: cleanAllDialogs,
        getAllDialogs: getAllDialogs,
        setAllDialogs: setAllDialogs,
        setMarkDownTime: setMarkDownTime
    };

}
