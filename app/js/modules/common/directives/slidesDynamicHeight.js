angular.module('webapp.common').directive({
    slidesDynamicHeight: ['$timeout', slidesDynamicHeight]
});

function slidesDynamicHeight($timeout) {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {
            var setHeight = function() {
                element[0].style.height = 'auto';
                element[0].style.height = (element[0].querySelectorAll('.swiper-slide-active')[0].offsetHeight + 20) + 'px';
            };

            $timeout(function(){
                setHeight();
            }, 500);

            scope.$on("$ionicSlides.slideChangeStart", function(){
                setHeight();
            });
        }
    };
}
