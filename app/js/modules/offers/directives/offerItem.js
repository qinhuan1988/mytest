angular.module('webapp.offers').directive({
    offerItem: [offerItem],
});

function offerItem() {
    return {
        restrict: 'A',
        scope: {
            item: '=offerItem',
            partnerItem: '='
        },
        templateUrl: 'js/modules/offers/templates/offerItem.html'
    };
}
