angular.module('webapp.dash')
    .directive('bmwCentralCard', ['$ionicModal', '$compile', '$rootScope', 'ENV_SETTING', 'gettextCatalog', '$state', 'LocaleService', centralCardLayer]);

/*
 * centralCardLayer aka "bmwCentralCard"
 *
 * TODO:
 *   - keep directive as a popup layer (abstract of member card)
 *	 - directive takes a template to render
 *	 - create a ctrl for this template (about member card...)
 */

function centralCardLayer($ionicModal, $compile, $rootScope, ENV_SETTING, gettextCatalog, $state, localeService) {
    return {
        restrict: 'A',
        scope: {
            memberInfo: '=',
            nameDisplay: '='
        },
        link: function($scope, $element, attrs) {

            $scope.goToMyVouchers = function() {
                $state.go('dash.coupons');
                $scope.hideCard();
            };

            $scope.goToQuickpayQR = function() {
                $state.go('dash.myWallet', {
                    from: 'bankCardList'
                });
                $scope.hideCard();
            };

            var levels, assetsPath;

            var setCardValues = function() {
                $scope.imageBaseURL = $rootScope.imageBaseURL;
                levels = ENV_SETTING.levels;
                assetsPath = "img/dashboard/membercard/vertical/" + localeService.gettextLang() + "/";

                switch ($scope.memberInfo.centralStatusId) {
                    case levels.silver:
                        $scope.memberType = gettextCatalog.getString('SILVER');
                        $scope.memberColor = 'silver';
                        $scope.imgLink = assetsPath + 'silver.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-silver';
                        break;
                    case levels.gold:
                        $scope.memberType = gettextCatalog.getString('GOLD');
                        $scope.memberColor = 'gold';
                        $scope.imgLink = assetsPath + 'gold.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-gold';
                        break;
                    case levels.platinium:
                        $scope.memberType = gettextCatalog.getString('PLATINUM');
                        $scope.memberColor = 'platinium';
                        $scope.imgLink = assetsPath + 'platinum.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-platinium';
                        break;
                    case levels.pure:
                        $scope.memberType = gettextCatalog.getString('PURE Diamond');
                        $scope.memberColor = 'pure';
                        $scope.imgLink = assetsPath + 'pure.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-pure';
                        break;
                    case levels.blue:
                        $scope.memberType = gettextCatalog.getString('BLUE Diamond');
                        $scope.memberColor = 'blue';
                        $scope.imgLink = assetsPath + 'blue.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-blue';
                        break;
                    default:
                        $scope.memberType = gettextCatalog.getString('SILVER');
                        $scope.memberColor = 'silver';
                        $scope.imgLink = assetsPath + 'silver.png';
                        $scope.bmwCardIcon = 'bmw-card-icon-silver';
                        break;
                }
            };

            setCardValues();

            $rootScope.$on('reload:centralCard', setCardValues);

            // show card
            $scope.showCard = function() {
                $ionicModal.fromTemplateUrl('js/modules/dash/memberCard.html', function($ionicModal) {
                    $scope.modal = $ionicModal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function() {
                    $scope.modal.show();

                    var view = {
                        width: 375,
                        height: 260
                    };
                    var svg = d3.select("#bmwCentralCard")
                        .append('svg')
                        .attr('width', view.width)
                        .style('margin', '0 auto')
                        .attr('viewBox', '0 0 ' + view.width + ' ' + view.height);

                    svg.selectAll('.bmwlp-centralCard').remove();

                    var centralCardGroup = svg.append('g').attr('class', 'bmwlp-centralCard');
                    centralCardGroup.append('svg:image')
                        .attr("xlink:href", $scope.imageBaseURL + $scope.imgLink)
                        .attr('width', '100%')
                        .attr('height', 260);

                    centralCardGroup.append("text")
                        .attr('transform', 'matrix(0.9 0 0 0.9 27 215)')
                        .style("text-transform", "uppercase")
                        .style('fill', 'white')
                        .text($scope.nameDisplay);

                    centralCardGroup.append("text")
                        .attr('transform', 'matrix(0.9 0 0 0.9 27 232)')
                        .style("text-transform", "uppercase")
                        .style('fill', 'white')
                        .text($scope.memberInfo.membershipId);

                    $compile(angular.element(document.querySelector('#bmwCentralCard')).contents())($scope);
                });
            };
            // hide card
            $scope.hideCard = function() {
                $scope.modal.remove();
            };
        },
        templateUrl: 'js/modules/dash/bmwCentralCard.html'
    };
}
