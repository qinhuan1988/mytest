angular.module('webapp.common').directive({
    imageLoaded: ['$timeout', imageLoaded]
});

function imageLoaded() {
    return {
        restrict: 'A',
        scope: {
            imageLoaded: '=imageLoaded'
        },
        link: function(scope, element) {
            scope.imageLoaded = false;
            element.bind('load', function() {
                scope.imageLoaded = true;
                scope.$apply();
            });
        }
    };
}
