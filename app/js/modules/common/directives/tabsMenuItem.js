angular.module('webapp.common').directive({
    tabsMenuItem: ['$rootScope', tabsMenuItem]
});

function tabsMenuItem($rootScope) {
    return {
        restrict: 'E',
        scope: {
            iconPath: '@',
            label: '='
        },
        link: function(scope) {
            scope.imgLink = $rootScope.imageBaseURL + scope.iconPath;
        },
        templateUrl: 'js/modules/common/templates/tabs-menu-item.html'
    };
}
