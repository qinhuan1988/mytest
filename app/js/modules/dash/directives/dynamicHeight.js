angular.module('webapp.dash')
    .directive('dynamicHeight', ['$window', dynamicHeight]);


function dynamicHeight($window) {

    return {
        restrict: 'A',

        link: function(scope, elem, attrs) {

            var winHeight = $window.innerHeight;
            if (attrs.dynamicHeight === 'contact_layer') {
                elem.css('max-height', winHeight - (winHeight * 0.52) + 'px');
            } else {
                elem.css('max-height', winHeight - (winHeight * 0.25) + 'px');
            }

        }

    };
}
