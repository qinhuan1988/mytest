angular.module('webapp.common').directive({
    stepsNavigation: ['$state', stepsNavigation]
});

/*
 * Steps navigation
 *
 * @attrs:
 *  - prev: state
 *  - next: state
 *  - label: string
 *
 * @usage:
 *  - prev: default is disabled
 *  - next: default is disabled
 *  - label: custom string. default is "Skip" (if no next, default is disabled)
 */
function stepsNavigation($state) {
    return {
        restrict: 'A',
        scope: {
            prev: '@',
            next: '@',
            label: '=',
            current: '@',
            total: '@'
        },
        link: function(scope, element, attrs) {
            scope.goNext = function(next) {
                if (isValidHref(next)) {
                    $state.go(next);
                }
            };
            scope.goPrev = function(prev) {
                if (isValidHref(prev)) {
                    $state.go(prev);
                }
            };

            function isValidHref(value) {
                if (!value || value === '') {
                    return false;
                } else {
                    return true;
                }
            }
        },
        templateUrl: 'js/modules/common/templates/steps-navigation.html'
    };
}
