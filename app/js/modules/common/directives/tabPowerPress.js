angular.module('webapp.common').directive({
    tabPowerPress: ['$timeout', '$rootScope', '$ionicSideMenuDelegate', 'TrackingService', 'gettextCatalog', tabPowerPress]
});

function tabPowerPress($timeout, $rootScope, $ionicSideMenuDelegate, TrackingService, gettextCatalog) {
    return {
        restrict: 'C',
        scope: {
            dial: '&dialFunc',
            redirect: '&redirectFunc',
            hideTabs: '&hideTabsFunc'
        },
        link: function(scope, element, attrs) {
            scope.imageBaseURL = $rootScope.imageBaseURL;
            var items = angular.element(element[0].querySelectorAll('.tab-power-press__item'));
            var backdrop = angular.element(document.getElementsByClassName('main-content-backdrop'));

            // distance range selecting an item
            var minDistance = 10;
            var maxDistance = 220;

            render();

            function render() {
                var paddingTop;
                var height = 68;
                var iterations = Math.floor(items.length / 2);

                for (var i = 0; i < iterations; i++) {
                    paddingTop = height / (i + 1);
                    angular.element(items[i]).css('padding-top', paddingTop + 'px');
                    angular.element(items[items.length - (i + 1)]).css('padding-top', paddingTop + 'px');
                }
            }

            scope.show = function() {
                scope.hideTabs();
                resetHighlight();
                disableSideMenuDrag();
                backdrop.addClass('main-content-backdrop--has-footer');
                element.addClass('tab-power-press--visible');
            };

            scope.hide = function() {
                backdrop.removeClass('main-content-backdrop--has-footer');
                element.removeClass('tab-power-press--visible');

                selectItem();
            };

            function selectItem() {
                var selection = document.getElementsByClassName('tab-power-press__item selected');
                if(selection && selection.length){
                    var sel = selection[0].querySelectorAll('.item__label');
                    var selectionName = sel[0].innerHTML;
                    TrackingService.trackTabsMenuItem(gettextCatalog.getString(selectionName));

                    $timeout(function() {
                        angular.element(selection[0]).triggerHandler('click');
                    });
                }
                
            }

            function highlightSelection(x, y, angle, distance) {
                if (distance >= minDistance && distance <= maxDistance && angle <= 0) {
                    var itemAngle = Math.abs(180 / items.length);
                    angle = Math.abs(angle);
                    var position = Math.floor(angle / itemAngle);

                    resetHighlight();
                    angular.element(items[items.length - position - 1]).addClass('selected');

                } else {
                    resetHighlight();
                }
            }

            function resetHighlight() {
                items.removeClass('selected');
            }

            scope.onDrag = function(event) {
                scope.show();

                var gesture = event.gesture;
                highlightSelection(gesture.deltaX, gesture.deltaY, gesture.angle, gesture.distance);
            };

            function disableSideMenuDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function restoreSideMenuDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }
        },
        templateUrl: 'js/modules/common/templates/tabs-power-press.html'
    };
}
