angular.module('webapp.offers').filter('favorites', function() {
    return function(offers) {
        var favorites = [];
        angular.forEach(offers, function(offer) {
            if (offer.isFavorite === 'Y') {
                favorites.push(favorites);
            }
        });
        return favorites;
    };
}).filter('promotions', function() {
    return function(offers) {
        var promotions = [];
        angular.forEach(offers, function(offer) {
            if (offer.benefitTypeCode === 'V_1007') {
                promotions.push(promotions);
            }
        });
        return promotions;
    };
});
