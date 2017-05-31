angular.module('webapp.dash')
    .directive('memberDashboard', [
        '$state',
        '$timeout',
        '$ionicBackdrop',
        '$ionicScrollDelegate',
        '$ionicSlideBoxDelegate',
        '$rootScope',
        '$document',
        'VehiclesService',
        'MemberInfoService',
        'LocaleService',
        memberDashboard
    ]);

function memberDashboard($state, $timeout, $ionicBackdrop, $ionicScrollDelegate, $ionicSlideBoxDelegate, $rootScope, $document, vehiclesService, memberInfoService,localeService) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            memberInfo: "=",
            dashboardOpen: "="
        },
        link: function($scope, $element) {
            $scope.$watch('dashboardOpen', function(val) {
                if (!val) {
                    hideDashboard();
                }
            });

            $scope.imageBaseURL = $rootScope.imageBaseURL;
            var dash = angular.element(document.querySelectorAll("[member-dashboard]"));
            var header = $document.find("header");
            var drag = angular.element(document.querySelectorAll("#dashboardPullDown"));

            var translate3dY;
            var setDashboardPosition = function() {
                var dashboardHeight = $element[0].offsetHeight;
                //add ios-statusbar-height 20px
                if(ionic.Platform.isIOS() && angular.element(document.querySelectorAll('.platform-cordova')).length!==0) {
                    dashboardHeight -= 20;
                }
                translate3dY = dashboardHeight - 12;
                $element[0].style.top = -(dashboardHeight - 57) + 'px';
            };

            var updateZIndex = function() {
                dash.css('z-index', '16');
                header.css('z-index', '17');
            };
            var resetZIndex = function() {
                dash.css('z-index', '11');
                header.css('z-index', '12');
            };

            var showDashboard = function() {
                updateZIndex();
                drag.addClass('open');
                dash[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + translate3dY + 'px,0)';
                $scope.dashboardOpen = true;
                $rootScope.$broadcast('gaugeAnimation');
            };

            setDashboardPosition();
            $scope.getLang = localeService.getLang;
            $scope.dashboardOpen = false;
            $scope.onTapEvent = false;
            $scope.currentEvent = {
                deltaY: 0
            };
            $scope.lastEvent = {
                deltaY: 0
            };

            $scope.onTap = function(e) {
                $scope.onTapEvent = true;
                dash.addClass('dash-animated');
                header.addClass('dashboard--animated');

                if ($scope.dashboardOpen) {
                    hideDashboard();
                } else {
                    showDashboard();
                }
                e.preventDefault();
            };

            var enableScroll = function() {
                $ionicScrollDelegate.getScrollView().options.scrollingY = true;
            };
            var disableScroll = function() {
                $ionicScrollDelegate.getScrollView().options.scrollingY = false;
            };

            $scope.onDrag = function(e) {
                disableScroll();
                drag.addClass('active');
                dash.removeClass('dash-animated');
                header.removeClass('dashboard--animated');
                
                if (typeof cordova !== 'undefined') {
                    cordova.plugins.Keyboard.close();
                }

                $scope.lastEvent = {
                    deltaY: $scope.currentEvent.deltaY || 0
                };
                $scope.currentEvent = {
                    deltaY: e.gesture.deltaY
                };
                if ($scope.dashboardOpen) {
                    if (e.gesture.deltaY < 0 && e.gesture.deltaY > -translate3dY) {
                        dash[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (e.gesture.deltaY + translate3dY) + 'px,0)';
                    }
                } else {
                    if (e.gesture.deltaY < translate3dY && e.gesture.deltaY > 0) {
                        dash[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + e.gesture.deltaY + 'px,0)';
                    }
                }
            };

            $scope.onRelease = function(e) {
                enableScroll();
                drag.removeClass('active');
                if ($scope.onTapEvent) {
                    $scope.onTapEvent = false;
                    return;
                }
                dash.addClass('dash-animated');
                header.addClass('dashboard--animated');

                var interimDirection = $scope.currentEvent.deltaY - $scope.lastEvent.deltaY;
                if ($scope.dashboardOpen) {
                    if (interimDirection <= 0) {
                        hideDashboard();
                    } else {
                        showDashboard();
                    }
                } else {
                    if (interimDirection > 0) {
                        showDashboard();
                    } else {
                        hideDashboard();
                    }
                }
            };

            function hideDashboard () {
                resetZIndex();
                drag.removeClass('open');
                dash[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                $scope.dashboardOpen = false;
            }

            $scope.isDealersTabShown = true;
            $scope.isCarsTabShown = false;

            $ionicSlideBoxDelegate._instances = [];

            $scope.showMyDealersTab = function() {
                $scope.isDealersTabShown = true;
                $scope.isCarsTabShown = false;
            };

            var dealersDashSlider = $ionicSlideBoxDelegate.$getByHandle('dealersDashSlider');
            var carsDashSlider = $ionicSlideBoxDelegate.$getByHandle('carsDashSlider');


            /* watch values in order to update sliders, values can be async */
            $scope.$watch('memberInfo.carsDetails', function(val) {
                if (val) {
                    $ionicSlideBoxDelegate.$getByHandle('carsDashSlider').update();
                }
            });
            $scope.$watch('memberInfo.partnerDetails', function(val) {
                if (val) {
                    $ionicSlideBoxDelegate.$getByHandle('dealersDashSlider').update();
                }
            });

            $scope.currentDealerIndex = function() {
                if (!dealersDashSlider.currentIndex()) {
                    return 1;
                } else {
                    return dealersDashSlider.currentIndex() + 1;
                }
            };

            $scope.currentCarIndex = function() {
                if (!carsDashSlider.currentIndex()) {
                    return 1;
                } else {
                    return carsDashSlider.currentIndex() + 1;
                }
            };

            $scope.showMyCarsTab = function() {
                vehiclesService.refreshVehiclesList().then(function() {
                    $scope.memberInfo.carsDetails = vehiclesService.getVehiclesList();
                     _.each( $scope.memberInfo.carsDetails, function(item) {
                        if(item.cicStatus === 'A'){
                            item.approved = true;
                        }else if(item.cicStatus === 'R'){
                            item.rejected = true;
                        }else {
                            item.pending = true;
                        }
                    } );
                     memberInfoService.setMemberInfo($scope.memberInfo);
                });

                $ionicSlideBoxDelegate.$getByHandle('carsDashSlider').update();
                $scope.isDealersTabShown = false;
                $scope.isCarsTabShown = true;
            };

            $scope.nextDealer = function() {
                dealersDashSlider.next();
            };

            $scope.previousDealer = function() {
                dealersDashSlider.previous();
            };

            $scope.nextCar = function() {
                carsDashSlider.next();
            };

            $scope.previousCar = function() {
                carsDashSlider.previous();
            };

            $scope.goToAddDealer = function() {
                hideDashboard();
                $state.go('dash.addDealer');
            };

            $scope.goToAddVehicle = function() {
                hideDashboard();
                $state.go('dash.addVehicle');
            };

            $scope.goDealer = function() {
                hideDashboard();
                $state.go('dash.dealers');
            };

            $scope.goAddDealer = function() {
                hideDashboard();
                $state.go('dash.addDealer');
            };

            $scope.goVehicle = function() {
                hideDashboard();
                $state.go('dash.vehicles');
            };

            $scope.goAddVehicle = function() {
                hideDashboard();
                $state.go('dash.addVehicle');
            };

            $scope.hasVehicles = function() {
                return !!$scope.memberInfo.carsDetails && $scope.memberInfo.carsDetails.length !== 0;
            };

            $scope.hasPartners = function() {
                return !!$scope.memberInfo.partnerDetails && $scope.memberInfo.partnerDetails.length !== 0;
            };

            $scope.hideDashboard = hideDashboard;
        },
        templateUrl: 'js/modules/dash/memberDashboard.html'
    };
}
