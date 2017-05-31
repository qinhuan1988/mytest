angular.module('webapp.dealers').controller(
    'DealerGroupInfoCtrl', ['$scope', 'MemberInfoService', '$state', 'api', 'aem', 'OffersService', 'DealerService', 'AccessoryBarService','LocaleService', ctrl]
);

function ctrl($scope, memberInfoService, $state, api, aem, offersService, dealerService, accessoryBarService, localeService) {

    accessoryBarService.addViewEvent($scope);

    var vm = this;

    vm.dealer = dealerService.getDealerInfo();
    vm.memberInfo = memberInfoService.getMemberInfo();
    vm.membershipID = vm.memberInfo.membershipId;

    vm.dealer.partnerGroupName = vm.dealer['partnerGroupName_' + localeService.getLang() ];

    var filterObj = {
        membershipId: vm.memberInfo.membershipId
    };

    api.getMemberPartnerOffer(filterObj).then(function(result) {
        vm.dealerList = result.partnerArray;
        vm.dealerDetails = vm.dealerList.filter(function(el) {
            return el.partnerGroupName_en === vm.dealer.partnerGroupName_en;
        });
        vm.selectedDealer = vm.dealerDetails[0];
        angular.forEach(vm.dealerList, function(dealer) {
            if (dealer.benefitDetailsArray.length > 0) {
                dealer.benefitDetailsArray = offersService.restructureOffers(dealer.benefitDetailsArray);
                // find first Benefit on the benefitDetailsArray that has assets on AEM
                var i = 0;
                findBenefitWithAssets(dealer, i);
            }
        });
    });

    vm.showOfferInfo = function(offerInfo) {
        offersService.setCurrentOfferInfo(offerInfo);
        $state.go('dash.offerInfo', {
            offerId: offerInfo.itemId
        });
    };

    function findBenefitWithAssets(dealer, i) {
        if (dealer.benefitToShow || !dealer.benefitDetailsArray[i]) {
            return;
        } else {
            offersService.extendOfferInfo(dealer.benefitDetailsArray[i]).then(function(res) {
                dealer.benefitToShow = res;
            }).catch(function() {
                console.warn('no assets for this ID: ' + dealer.benefitDetailsArray[i].itemId);
                findBenefitWithAssets(dealer, ++i);
            });
        }
    }

}
