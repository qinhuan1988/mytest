angular.module('webapp.dealers').controller(
    'DealerInfoCtrl', ['$timeout', '$scope', '$rootScope', '$ionicHistory', '$compile', '$state', '$ionicPopup', 'api', 'MemberInfoService', 'DealerService', 'gettextCatalog', 'DialogService', '$ionicSlideBoxDelegate', 'ENV_SETTING','LocaleService', ctrl]
);

function ctrl($timeout, $scope, $rootScope, $ionicHistory, $compile, $state, $ionicPopup, api, memberInfoService, dealerService, gettextCatalog, dialogService, $ionicSlideBoxDelegate, ENV_SETTING, localeService) {

    var vm = this;


    console.log($ionicHistory);
    // dealer group image

    vm.dealerGroupImgSrc = ENV_SETTING.imageBaseURL + '/content/dam/bmw-loyalty/voucher/dealergroupcode.png';

    // Search the view history for the view that you want to go back to
    var entryViewId = _.find($ionicHistory.viewHistory().views, {
        url: "/dash/dealers"
    });

    // Replace the current backview with the one you want users to actually go back to.
    if (entryViewId) {
        $ionicHistory.backView(entryViewId);
    }

    vm.dealer = dealerService.getDealerInfo();
    vm.dealer.partnerName = vm.dealer['partnerName_' + localeService.getLang()];
    vm.dealer.partnerGroupName = vm.dealer['partnerGroupName_' + localeService.getLang() ];

    vm.hasCards = !!vm.dealer.memberCards && vm.dealer.memberCards.length > 0;

    if (vm.hasCards) {
        vm.memberCards = [];
        angular.forEach(vm.dealer.memberCards, function(card) {
            var memberCard = dealerService.getCardInfo(vm.dealer);
            memberCard.cardNo = card.linkedCardNo;
            vm.memberCards.push(memberCard);
        });
    }

    // slider options and handling

    vm.slider = {
        options: {
            pagination: false,
            loop: false,
            speed: 200
        },
        delegate: null,
        activeIndex: 0
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        refreshSlider(data);
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
        vm.slider.activeIndex = data.slider.activeIndex;
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
        refreshSlider(data);
    });

    function refreshSlider(data) {
        vm.slider.next = data.slider._slideNext;
        vm.slider.prev = data.slider._slidePrev;
        vm.slider.activeIndex = data.slider.activeIndex;
        $scope.$apply();
    }

    // ------ slider options and handling

    // need more specifications and user story clarification....

    vm.custom = true;

    vm.getCardStatus = function() {
        if (!vm.slider.activeIndex) {
            return;
        }
        var filterObj = {
            market_code: vm.dealer.chMarketCode,
            code_no: vm.memberCards[vm.slider.activeIndex].cardNo,
            change_type: !vm.custom ? 'unfreeze' : 'freeze'
        };
        api.getCardStatus(filterObj).then(function(result) {
            vm.cardList = result.chResult;
            $ionicPopup.alert({
                title: 'Success',
                template: 'Successful'
            });
            vm.custom = !vm.custom;
        });
    };

    vm.replaceCardPopup = function() {
        if (!vm.hasCards) {
            return;
        }
        var confirmPopup = {
            msg: gettextCatalog.getString('Do you wish to replace your previous membership card?'),
            confirmText: gettextCatalog.getString('YES'),
            cancelText: gettextCatalog.getString('NO'),
            confirmOnTap: function() {
                $state.go('dash.replaceCardStep1');
            },
            cancelOnTap: function() {
                $state.go('dash.dealerInfo');
            }
        };
        dialogService.confirmWithRedirect(confirmPopup);
    };
}
