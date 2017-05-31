angular.module('webapp').service({
    TrackingService: ['ENV_SETTING', TrackingService]
});

function TrackingService(ENV_SETTING) {

    window._paq = window._paq || [];

    return {
        startTrack: function() {
            var u = 'https://analytics-cn.mcon-group.com/';
            _paq.push(['setTrackerUrl', u + 'piwik.php']);
            _paq.push(['setSiteId', ENV_SETTING.trackingId]);
            _paq.push(['enableLinkTracking']);

            var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];

            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = u + 'piwik.js';
            s.parentNode.insertBefore(g, s);
        },

        setPageTitle: function(pageName) {
            _paq.push(['setDocumentTitle', pageName]);
            _paq.push(['trackPageView']);
        },

        setUserID: function(membershipID) {
            _paq.push(['setUserId', membershipID]);
        },

        trackVoucherDetails: function(voucher) {
            var details = voucher.itemId + ' ' + voucher.itemName;
            _paq.push(['trackEvent', 'Vouchers', 'Open voucher details', details]);
        },

        trackCouponDetails: function(coupon) {
            var details = coupon.voucherId + ' ' + coupon.itemName;
            _paq.push(['trackEvent', 'Coupons', 'Open coupon details', details]);
        },

        trackSideMenuItem: function (itemName) {
            _paq.push(['trackEvent', 'Side Menu', 'Click on item', itemName]);
        },

        trackTabsMenuItem: function (itemName) {
            _paq.push(['trackEvent', 'Tabs Menu', 'Click on item', itemName]);
        },

        trackAppVersion: function (version) {
            _paq.push(['setCustomVariable', 1, 'AppVersion', version, 'visit']);
        }
    };
}
