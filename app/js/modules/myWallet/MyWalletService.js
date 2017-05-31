angular.module('webapp.myWallet').service({
    MyWalletService: ['api', 'MemberInfoService', '$filter', myWalletService]
});

function myWalletService(api, memberInfoService, $filter) {

    var memberinfo = memberInfoService.getMemberInfo();

    var myWalletInfo = {},
        numberQR,
        rb_status;

    var setQRValue = function(value) {
        numberQR = value;
    };
    var getQRValue = function() {
        return numberQR;
    };
    var setRBValue = function(value) {
        rb_status = value;
    };
    var getRBValue = function() {
        return rb_status;
    };

    var getWalletInfo = function() {
        return myWalletInfo;
    };

    var setWalletInfo = function(data) {
        myWalletInfo = _.defaults(data, myWalletInfo);
    };

    var generateQRCode = function() {
        //select a new payment method, then change the default payment.
        //the electrical card number should get from memberinfo again
        //card_num_no for hardcode
        var valid_start = new Date();
        var valid_end = new Date(valid_start.getTime() + (1.5 * 60 * 1000));
        var card_num_no = memberinfo.chCardNo;
        var postData = {
            card_no: card_num_no,
            prod_no: "01",
            valid_start: $filter('date')(valid_start, "yyyy-MM-dd HH:mm:ss"),
            valid_end: $filter('date')(valid_end, "yyyy-MM-dd HH:mm:ss")
        };
        return api.generateQRCode(postData).then(function(result) {
            setQRValue(result.chResult.code_no);
        });
    };
    var roundRobinQRCode = function() {
        var card_no = getQRValue();
        var postData = {
            card_no: card_no
        };
        return api.roundRobinQRCode(postData).then(function(result) {
            setRBValue(result.chResult.status);
            setWalletInfo({
                trans_flow_id: result.chResult.trans_flow_id
            });
        });
    };
    return {
        getQRValue: getQRValue,
        getRBValue: getRBValue,
        roundRobinQRCode: roundRobinQRCode,
        generateQRCode: generateQRCode,
        getWalletInfo: getWalletInfo
    };
}
