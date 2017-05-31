angular.module('webapp.dealers').filter('dealersOnly', function() {
    return function(memberCards) {
        var dealersCards = [];
        angular.forEach(memberCards, function(card) {
            if (card.partnerCode !== 'BMW') {
                dealersCards.push(card);
            }
        });
        return dealersCards;
    };
}).filter('partnerCode', function() {
    return function(partners, partnerCode) {
        var selectedPartner = null;
        angular.forEach(partners, function(partner) {
            if (partner.partnerCode === partnerCode) {
                selectedPartner = partner;
            }
        });
        return selectedPartner;
    };
});
