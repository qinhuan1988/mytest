angular.module('webapp.dash')
    .directive('sideMenuItem', ['TrackingService', 'gettextCatalog', sideMenuItem]);


function sideMenuItem(TrackingService, gettextCatalog) {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {

            var itemName = gettextCatalog.getString(attrs.sideMenuItem);

            element.on('click', function () {
                TrackingService.trackSideMenuItem(itemName);
            });

        }
    };
}
