angular.module('webapp.dash')
    .directive('iconItem', [iconItem]);

function iconItem() {
    return {
        restrict: 'E',
        scope: {
            iconLink: '@',
            iconLabel: '='
        },
        templateUrl: 'js/modules/dash/directives/icon-item.html'
    };
}
