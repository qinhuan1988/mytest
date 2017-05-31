angular.module('webapp.common').directive({
    fallbackSrc: ['$parse', fallbackSrc]
});

function fallbackSrc($parse) {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attr) {
            var errorTime = 0;
            element.bind('error', function() {
                if (errorTime < 2) {
                    angular.element(this).attr('src', $parse(attr.fallbackSrc)(scope));
                }
                errorTime++;
            });
        }
    };
}
