angular.module('webapp.common').directive({
    validator: [validator]
});

function validator() {
    return {
        restrict: 'A',
        scope: {
            validator: '='
        },
        link: function($scope, element) {
            var wrapperEl = element.parent('.item-input');
            $scope.$watch('validator', function(value) {
                if (value && value !== '') {
                    wrapperEl.addClass('input--unvalid');
                } else {
                    wrapperEl.removeClass('input--unvalid');
                }
            });
        },
        template: "<div>{{ validator }}</div>"
    };
}
