angular.module('webapp.dash')
    .directive('dashRadialGauge', ['$rootScope', '$timeout', '$state', 'OffersService', 'gettextCatalog', 'LocaleService', '$filter', dashRadialGauge]);


function dashRadialGauge($rootScope, $timeout, $state, offersService, gettextCatalog, localeService, $filter) {
    return {
        scope: {
            memberInfo: '=',
            hideParent: '&'
        },
        link: function(scope, elem) {
            var view = {
                width: 375,
                height: 210
            };
            var animated = false;

            var userPoints = scope.memberInfo.centralStatusPoints;
            var userBalance = scope.memberInfo.centralDepositBalance;
            var userPointsNextStatus = scope.memberInfo.centralPointsForNextStatus;

            var svg = d3.select(elem[0])
                .append('svg')
                .attr('width', view.width)
                .style('margin', '0 auto')
                .attr('viewBox', '0 0 ' + view.width + ' ' + view.height);

            drawPointsNextStatus(userPointsNextStatus);
            appendGaugeSVG();
            drawBalance(userBalance);
            drawActivityGroup();

            // if user total savings change while the app is running
            scope.$watch(function() {
                return offersService.getTotalCommunicatedValue().allOffers;
            }, function(val) {
                scope.totalCommunicatedValue = val;
                drawTotalCommunacatedValue(scope.totalCommunicatedValue);
            });

            // if user points change while the app is running
            scope.$watch('memberInfo.centralStatusPoints', function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    animated = false;
                    userPoints = scope.memberInfo.centralStatusPoints;
                }
            });

            $rootScope.$on('gaugeAnimation', renderGauge);
            $rootScope.$on('translate:reRenderDashSVG', reRenderContent);

            function drawPointsNextStatus(points) {
                svg.selectAll('.bmwlp-dash-userPointsNextStatus').remove();
                var pointsNextGroup = svg.append('g').attr('class', 'bmwlp-dash-userPointsNextStatus');

                var nextPointsPositionX = 220;
                if(localeService.getLang() === 'zh') {
                    nextPointsPositionX = 195;
                }

                pointsNextGroup.append('svg:image')
                    .attr('class', 'bmwlp-dash-gauge-divider')
                    .attr("xlink:href", $rootScope.imageBaseURL + 'img/dashboard/dash-radial-gauge-divider.svg')
                    .attr('width', 185)
                    .attr('height', 50);

                pointsNextGroup.append('text')
                    .attr('transform', 'matrix(1 0 0 1 128 205)')
                    .style('fill', '#de4415')
                    .style('letter-spacing', '-0.1px')
                    .style('font-size', '10px')
                    .text(gettextCatalog.getString('Points to next level'));

                pointsNextGroup.append('text')
                    .attr('transform', 'matrix(1 0 0 1 ' + nextPointsPositionX + ' 205)')
                    .style('font-weight', 'bold')
                    .style('fill', '#fff')
                    .text($filter('number')(points));
            }

            function appendGaugeSVG(lang) {
                lang = lang || gettextCatalog.getCurrentLanguage();
                svg.selectAll('.bmwlp-dash-gauge-svg').remove();
                svg.append('svg:image')
                    .attr('class', 'bmwlp-dash-gauge-svg')
                    .attr("xlink:href", $rootScope.imageBaseURL + 'img/dashboard/dash-radial-gauge-' + lang + '.svg')
                    .attr('width', '100%')
                    .attr('height', 186);
            }

            function drawBalance(userBalance) {
                svg.selectAll('.bmwlp-dash-balance').remove();
                var balanceGroup = svg.append('g').attr('class', 'bmwlp-dash-balance');
                balanceGroup.append('text')
                    .attr('transform', 'matrix(0.8 0 0 0.8 55 143)')
                    .attr('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .style('fill', '#fff')
                    .text(gettextCatalog.getString('Payment Service'));

                var link = balanceGroup.append('text')
                    .attr('x', 32)
                    .attr('y', 165)
                    .style('font-size', '12px')
                    .style('fill', '#de4415')
                    .text(gettextCatalog.getString('Pay Now'));

                addLinkArrow(balanceGroup, link);

                svg.selectAll('.bmwlp-dash-balance').on('click', function() {
                     scope.hideParent();
                     $state.go('dash.paymentMethod');
                });
            }

            // draw Value of currentoffers
            function drawTotalCommunacatedValue(value) {
                svg.selectAll('.bmwlp-dash-communacatedValue').remove();

                var communacatedValueGroup = svg.append('g').attr('class', 'bmwlp-dash-communacatedValue');
                communacatedValueGroup.append('text')
                    .attr('transform', 'matrix(0.7 0 0 0.7 326 128)')
                    .attr('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .style('fill', '#fff')
                    .attr('dy', '.35em')
                    .call(wrap, 82);
                communacatedValueGroup.append('text')
                    .attr('transform', 'matrix(0.8 0 0 0.8 322 143)')
                    .attr('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .style('fill', '#fff')
                    .text(gettextCatalog.getString('My Vouchers'));
                var link = communacatedValueGroup.append('text')
                    .attr('x', 292)
                    .attr('y', 165)
                    .style('font-size', '12px')
                    .style('fill', '#de4415')
                    .text(gettextCatalog.getString('Check Now'));

                addLinkArrow(communacatedValueGroup, link);
                svg.selectAll('.bmwlp-dash-communacatedValue').on('click', function() {
                    scope.hideParent();
                    $state.go('dash.coupons');
                });
            }

            //status points
            function appendPointsGroup(userPoints) {
                svg.selectAll('.bmwlp-dash-points').remove();
                var pointsGroup = svg.append('g').attr('class', 'bmwlp-dash-points');
                pointsGroup.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('transform', 'matrix(0.7 0 0 0.7 190 128)')
                    .style('fill', '#fff')
                    .text(gettextCatalog.getString('Status Points'));

                var pointsTextGroup = pointsGroup.append('text')
                    .attr('transform', 'matrix(1.2 0 0 1.2 190 148)')
                    .attr('text-anchor', 'middle');
                pointsTextGroup.append('tspan')
                    .style('fill', '#fff')
                    .style('font-weight', 'bold')
                    .text($filter('number')(userPoints));
                svg.selectAll('.bmwlp-dash-points').on('click', function() {
                    scope.hideParent();
                    $state.go('dash.points');
                });
            }

            function drawActivityGroup() {
                svg.selectAll('.bmwlp-dash-activity-link').remove();
                var activityGroup = svg.append('g').attr('class', 'bmwlp-dash-activity-link');
                var link = activityGroup.append('text')
                    .attr('class', 'link')
                    .attr('x', 155)
                    .attr('y', 170)
                    .style('font-size', '12px')
                    .style('fill', '#de4415')
                    .text(gettextCatalog.getString('My Activity Log'));
                addLinkArrow(activityGroup, link);

                svg.selectAll('.bmwlp-dash-activity-link').on('click', function() {
                   // scope.hideParent();
                    scope.$emit('openComingSoonView.event');
                });
            }

            function addLinkArrow(parent, linkElement) {
                var position = linkElement.node().getBBox();
                parent.insert('svg:image')
                    .attr("xlink:href", $rootScope.imageBaseURL + 'img/icons/common/arrow-right.svg')
                    .attr('x', position.x + position.width )
                    .attr('y', position.y)
                    .attr('width', position.height)
                    .attr('height', position.height)
                    .style('fill', '#de4415');
            }

            function reRenderContent(event, args) {
                appendGaugeSVG(args.lang);
                drawPointsNextStatus(userPointsNextStatus);
                drawBalance(userBalance);
                drawTotalCommunacatedValue(scope.totalCommunicatedValue);
                drawActivityGroup();
                appendPointsGroup(userPoints);
            }

            var gaugeOptions = {
                value: userPoints,
                valueUnit: 'PT',
                upperLimit: 1800e3,
                lowerLimit: 0,
                precision: 0
            };

            function getNeedlePosition(maxPoints, currentPoints) {
                var minAngle = -120;
                var maxAngle = 120;
                var minToMaxAngle = Math.abs(minAngle) + maxAngle;
                var pointsPerDegree = minToMaxAngle / maxPoints;
                var minToCurrentAngle = minAngle + currentPoints * pointsPerDegree;

                return minToCurrentAngle;
            }

            /* render needle in initial state */
            function renderNeedle() {
                svg.selectAll('.bmwlp-dash-needle').remove();
                var pg = svg.append('g')
                    .attr('class', 'bmwlp-dash-needle');
                pg.append('svg:image')
                    .attr("xlink:href", $rootScope.imageBaseURL + 'img/dashboard/needle.svg')
                    .attr('width', 30)
                    .attr('height', 90);
            }

            /* animated needle to new gauge points */
            function animatedNeedle(maxPoints, currentPoints) {
                var angle = getNeedlePosition(maxPoints, currentPoints);
                angular.element(document.getElementsByClassName('bmwlp-dash-needle')[0]).find('image').css('transform', 'rotateZ(' + angle + 'deg)');
                animated = true;
            }

            /* render user points and gauge points*/
            function renderGauge() {
                var needleTotalValue = userPoints;

                // points can not be supperior to limit
                if (userPoints >= gaugeOptions.upperLimit) {
                    needleTotalValue = gaugeOptions.upperLimit;
                }
                // points can not be negative
                if (userPoints < 0) {
                    needleTotalValue = 0;
                }

                if (!animated) {
                    renderNeedle();
                    appendPointsGroup(userPoints);
                    $timeout(function() {
                        animatedNeedle(gaugeOptions.upperLimit, needleTotalValue);
                    }, 500);
                }
            }

            /*
             * as we may show very long number,
             * apply exponential display when digits superior to 10 digits (billion)
             */
            function formatNumber(number) {
                var numberLength = number.toString().length;

                if (numberLength >= 11) {
                    return parseInt(number).toExponential();
                } else {
                    return $filter('number')(number);
                }
            }
        }
    };
}

function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");
        word = words.pop();
        while (word) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
            word = words.pop();
        }
    });
}
