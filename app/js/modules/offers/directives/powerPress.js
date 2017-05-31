angular.module('webapp.offers').directive({
    powerPress: [
        '$ionicGesture',
        '$ionicScrollDelegate',
        '$window',
        'OffersService',
        powerPress
    ]
});

function powerPress($ionicGesture, $ionicScrollDelegate, $window, offersService) {
    return {
        restrict: 'A',
        replace: true,
        link: function($scope, $element) {

            // select the element to highlight when powerpressing
            // this needs to be improved, selecting the element to highlight should not be inside the directive for reusability reasons
            var item = $element.parent().parent();

            // init the voucher options

            var options = [];

            var selectedOption = null;

            // init powerPress menu

            var menuSize = {
                // angle within the menu is opened
                angle: 210,
                // distance between powerPress and options
                distance: 100,
                // padding angle of each option, should be in degrees
                optionPaddingAngle: 15
            };

            var body, backDrop, title;

            // screen size

            var screenSize = {
                width: $window.innerWidth,
                height: $window.innerHeight
            };

            // touch position

            var touchPosition = {
                posX: 0,
                posY: 0
            };

            var scroller = $ionicScrollDelegate.$getByHandle('vouchers');

            var titleEl;

            // bind show/hide menu functions to the scope

            $scope.showMenu = showMenu;
            $scope.hideMenu = hideMenu;


            /*
             * Power press menu functions
             *
             */

            function showMenu(e) {
                e.stopPropagation();
                //disable scroll
                disableScroll();
                // scale magnific animation on list
                highlightItem();
                // get voucher options
                options = offersService.getVoucherOptions($scope.$parent.item);
                touchPosition.posX = e.gesture.touches[0].clientX;
                touchPosition.posY = e.gesture.touches[0].clientY;
                var menuAngle = getMenuAngle(screenSize, touchPosition);
                renderMenu(options, touchPosition, menuAngle);

                // drag event listner
                var drag = function(e) {
                    dragToSelect({
                        angle: e.gesture.angle,
                        distance: e.gesture.distance
                    }, options);
                };
                $ionicGesture.on('drag', drag, $element);
            }

            function hideMenu(e) {
                e.stopPropagation();
                if (options.length > 0) {
                    if (selectedOption) {
                        selectedOption.action();
                        selectedOption = null;
                    }
                    if (backDrop) {
                        unhighlightItem();
                        backDrop.remove();
                        enableScroll();
                    }
                    options = [];
                }
            }

            function renderMenu(options, touchPosition, menuAngle) {
                // find body
                body = angular.element(document).find('body').eq(0);
                // append the powerpress menu container
                backDrop = angular.element('<div class="power-press-backdrop"></div>');
                body.append(backDrop);
                // add options to the menu....
                var i = 1;
                var n = options.length;
                // defining touch padding area size (angle) for each option
                // -10 to avoid intersection between adjacent angles
                if (n > 0) {
                    menuSize.optionPaddingAngle = menuSize.angle / n / 2 - 10;
                }

                titleEl = angular.element('<div class="power-press__title"></div>');
                backDrop.append(titleEl);
                positionTitle(touchPosition);

                angular.forEach(options, function(option) {
                    // create the option
                    var optionElement = angular.element('<div class="option"></div>');
                    optionElement.addClass(option.cssClass);
                    // append the new option to the backdrop
                    backDrop.append(optionElement);
                    // position the option on the touch position
                    var offsetX = parseInt(optionElement[0].offsetWidth) / 2;
                    var offsetY = parseInt(optionElement[0].offsetHeight) / 2;
                    var offsetMargin = 50;
                    var offsetPadding = 30;

                    // if too close from screen offset
                    // we apply a padding
                    if (touchPosition.posX < offsetMargin) {
                        touchPosition.posX += offsetPadding;
                    }
                    if (touchPosition.posX > screenSize.width - offsetMargin) {
                        touchPosition.posX -= offsetPadding;
                    }

                    optionElement.css({
                        top: (touchPosition.posY - offsetY) + 'px',
                        left: (touchPosition.posX - offsetX) + 'px'
                    });

                    // get the new position of the option according to the number of all options
                    var polarPosition = {
                        angle: menuAngle.start + i++ * (menuAngle.end - menuAngle.start) / (n + 1),
                        distance: menuSize.distance
                    };
                    option.polarPosition = polarPosition;
                    option.pos = polarToCartesien(polarPosition.angle, polarPosition.distance);
                    // move option to its new position
                    optionElement.css('transform', 'translate3d( ' + option.pos.x + 'px, ' + option.pos.y + 'px, 0)');
                    option.element = optionElement;
                });
            }

            function positionTitle (touchPosition) {
                // position horizontally
                // opposite side of clicked coordinates
                if (touchPosition.posX < screenSize.width / 2) {
                    titleEl.css('text-align', 'right');
                } else {
                    titleEl.css('text-align', 'left');
                }

                // position vertically
                if (touchPosition.posY < screenSize.height / 3) {               // clicked on 1/3
                    titleEl.css('top', '50%');
                } else if (touchPosition.posY > (screenSize.height / 3) * 2) {  // clicked on 3/3
                    titleEl.css('top', '30%');
                } else {                                                        // clicked on 2/3
                    titleEl.css('top', '10%');
                }
            }

            /*
             * select options functions
             *
             */

             function dragToSelect(currentPolarPosition, options) {
                 unselectAllOptions(options);
                 selectedOption = null;
                 angular.forEach(options, function(option) {
                     if (isDragWithinDistance(currentPolarPosition.distance) && isAngleSelected(currentPolarPosition.angle, option.polarPosition.angle)) {
                         selectOption(option, currentPolarPosition);
                     }
                 });
             }

             // check if dragging distance is between 1/2 and 3/2 of the distance

             function isDragWithinDistance(touchDistance) {
                 if (touchDistance < 1.3 * menuSize.distance && touchDistance > 0.25 * menuSize.distance) {
                     return true;
                 } else {
                     return false;
                 }
             }

             function unselectAllOptions(options) {
                 if (options && options.length) {
                     angular.forEach(options, function(option) {
                         option.element.removeClass('option--selected');
                         option.element.css('transform', 'translate3d( ' + option.pos.x + 'px, ' + option.pos.y + 'px, 0)');
                     });
                 }
             }

             function selectOption(option, currentPolarPosition) {
                 option.element.addClass('option--selected');
                 var newPolarposition = {
                     angle: option.polarPosition.angle,
                     distance: option.polarPosition.distance + 0.5 * currentPolarPosition.distance
                 };
                 var newPos = polarToCartesien(newPolarposition.angle, newPolarposition.distance);
                 // define scale ratio to animate the option
                 var scaleRatio = 1 + 0.4 * currentPolarPosition.distance / option.polarPosition.distance;
                 option.element.css('transform', 'translate3d( ' + newPos.x + 'px, ' + newPos.y + 'px, 0) scale(' + scaleRatio + ')');
                 selectedOption = option;
                 setSelectedOptionName(option);
             }

             function setSelectedOptionName (option) {
                 titleEl.html(option.info.name);
             }

             function highlightItem() {
                 if (item) {
                     item.css('transition', 'all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms');
                     item.addClass('item--powerpressactive');
                 }
             }

             function unhighlightItem() {
                 if (item) {
                     item.removeClass('item--powerpressactive');
                 }
             }

             // check if dragging angle position is in option angle position +- the angle padding

             function isAngleSelected(touchAngle, optionAngle) {
                 var optionAngleStart = optionAngle - menuSize.optionPaddingAngle;
                 var optionAngleEnd = optionAngle + menuSize.optionPaddingAngle;
                 // touch event gesture is returning values between -180 and 180
                 // option angle can go above/below that
                 if (optionAngleEnd < -180) {
                     optionAngleStart += 360;
                     optionAngleEnd += 360;
                 } else if (optionAngleStart > 180) {
                     optionAngleStart -= 360;
                     optionAngleEnd -= 360;
                 } else if (optionAngleStart < -180 && optionAngleEnd > -180) {
                     optionAngleStart += 360;
                     if ((touchAngle < optionAngleEnd) || (touchAngle > optionAngleStart)) {
                         return true;
                     } else {
                         return false;
                     }
                 } else if (optionAngleStart < 180 && optionAngleEnd > 180) {
                     optionAngleEnd -= 360;

                     if ((touchAngle < optionAngleEnd) || (touchAngle > optionAngleStart)) {
                         return true;
                     } else {
                         return false;
                     }
                 }
                 if ((touchAngle < optionAngleEnd) && (touchAngle > optionAngleStart)) {
                     return true;
                 } else {
                     return false;
                 }
             }

            /*
             * scroll functions
             *
             */

            function enableScroll() {
                scroller.getScrollView().options.scrollingY = true;
            }

            function disableScroll() {
                scroller.getScrollView().options.scrollingY = false;
            }

            // convert polar coordinates to cartesien coordinates

            function polarToCartesien(angle, distance) {
                return {
                    x: parseInt(distance * Math.cos(angle / 180 * Math.PI)),
                    y: parseInt(distance * Math.sin(angle / 180 * Math.PI))
                };
            }

            // define menu position angle

            function getMenuAngle(screenSize, touchPosition) {
                var angle = {
                    start: 0,
                    end: 0
                };
                var menuAngleDirection = 0;
                if (touchPosition.posX < screenSize.width / 4) {
                    if (touchPosition.posY < screenSize.height / 4) {
                        menuAngleDirection = 45;
                    } else {
                        menuAngleDirection = -45;
                    }
                } else if (touchPosition.posX > screenSize.width * 3 / 4) {
                    if (touchPosition.posY < screenSize.height / 4) {
                        menuAngleDirection = 135;
                    } else {
                        menuAngleDirection = -135;
                    }
                } else {
                    if (touchPosition.posY < screenSize.height / 4) {
                        menuAngleDirection = 90;
                    } else {
                        menuAngleDirection = -90;
                    }
                }
                angle.start = menuAngleDirection - menuSize.angle / 2;
                angle.end = menuAngleDirection + menuSize.angle / 2;
                return angle;
            }

        }
    };
}
