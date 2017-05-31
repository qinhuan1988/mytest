angular.module('webapp.giftcard').service({
    GiftCardService: ['api', '$filter', giftCardService]
});

function giftCardService(api, $filter) {
    var giftCards = [];
    var giftCardsInfo = {};
    var giftCardsHistory = {};
    var setGiftCards = function(cardsList) {
        giftCards = _.filter(cardsList, function(item) {
            return item.r_type === '02001' || item.r_type === '02002';
        });
        return giftCards;
    };

    var getGiftCards = function() {
        return giftCards;
    };

    var getUserCards = function() {
        var postData = {};
        return api.getUserCards(postData).then(function(result) {
            setGiftCards(result.chResult.detail);
        });
    };

    var setGiftCardsInfo = function(data) {
        giftCardsInfo.card_bum = data;
    };

    var setGiftCardsHistory = function(data) {
        giftCardsHistory = data;
    };
    var getGiftCardsHistory = function() {
        return giftCardsHistory;
    };
    var clearGiftCardInfo = function() {
        giftCardsInfo = {};
    };
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var random_base64 = function(length) {
        var str = "";
        for (var i = 0; i < length; ++i) {
            // Math.random(): ((r0 << 16) + (r1 & 0xFFFF)) | 0
            var rand = Math.floor(Math.random() * ALPHABET.length);
            str += ALPHABET.substring(rand, rand + 1);
        }
        return str;
    };

    var _s_id = random_base64(32);

    var current_time = new Date();

    var valid_start = function() {
        var current_time = new Date();
        var temp = new Date(current_time.getTime() - (3 * 30 * 24 * 60 * 60 * 1000));
        return $filter('date')(temp, "yyyy-MM-dd HH:mm:ss");
    };

    var valid_end = function() {
        var temp = new Date();
        return $filter('date')(temp, "yyyy-MM-dd HH:mm:ss");
    };


    var time_stamp = current_time.toUTCString();
    var getTransactionHistory = function() {
        var postData = {
            card_no: giftCardsInfo.card_bum,
            s_id: _s_id,
            time_stamp: time_stamp,
            valid_start: valid_start(),
            valid_end: valid_end()
        };
        return api.getTransactionHistory(postData).then(function(result) {

            setGiftCardsHistory(result.chResult.detail);

        });
    };

    return {
        setGiftCards: setGiftCards,
        getGiftCards: getGiftCards,
        getUserCards: getUserCards,
        setGiftCardsInfo: setGiftCardsInfo,
        clearGiftCardInfo: clearGiftCardInfo,
        getTransactionHistory: getTransactionHistory,
        random_base64: random_base64,
        setGiftCardsHistory: setGiftCardsHistory,
        getGiftCardsHistory: getGiftCardsHistory,

    };
}
