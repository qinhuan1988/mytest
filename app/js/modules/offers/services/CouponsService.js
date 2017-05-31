angular.module('webapp.offers').service({
    CouponsService: ['aem', 'api', '$q', 'AEMData', couponsService]
});

function couponsService(aem, api, $q, AEMData) {

    // single coupon details

    var couponInfo = {};

    // total communicated value

    var totalCommunicatedValue = 0;

    // API filter object parameter to call get member vouchers

    var filterObj = {
        sortField: 'expiryDate',
        sortDirection: 'asc',
        voucherStatus: 'N'
    };


    // service object

    var couponsService = {
        refreshCouponsList: refreshCouponsList,
        setCouponInfo: setCouponInfo,
        getCouponInfo: getCouponInfo,
        getCouponCode: getCouponCode
    };

    return couponsService;


    // set coupon info

    function setCouponInfo(info) {
        couponInfo = info;
    }

    // get coupon info

    function getCouponInfo() {
        return couponInfo;
    }

    // refresh Coupons List

    function refreshCouponsList() {
        var deferred = $q.defer();
        api.getMemberVouchers(filterObj).then(function(result) {
            // coupons list data from ELS
            var couponsELS = result.VoucherDetails;
            // total communicated value
            totalCommunicatedValue = result.totalCommunicatedValue;
            // getting assets from AEM
            AEMData.refreshOffersList().then(function(couponsAEM) {
                var list = extendCouponsData(couponsELS, couponsAEM);
                deferred.resolve(list);
            });
        });
        return deferred.promise;
    }


    // extends coupons with AEM assets

    function extendCouponsData(couponsELS, couponsAEM) {
        var list = [];
        angular.forEach(couponsELS, function(coupon) {
            if (couponsAEM[coupon.voucherId]) {
                var newCoupon = _.defaults(coupon, couponsAEM[coupon.voucherId]);
                list.push(newCoupon);
            }
        });
        return list;
    }

    /*
     * a voucher can be grabbed multiple times
     * use the first instance of the grabbed voucher
     */
    function getCouponCode(coupon) {
        var instance = _.find(coupon.voucherCodeDetails, {
            voucherStatus: 'N'
        });
        return instance.voucherCode;
    }

}
