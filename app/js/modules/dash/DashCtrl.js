angular.module('webapp.dash', []).controller({
    DashCtrl: [
        '$scope',
        '$rootScope',
        '$compile',
        '$state',
        '$ionicHistory',
        '$animate',
        'IFrameContainerService',
        'MemberInfoService',
        'OffersService',
        'aem',
        'externalLinks',
        'api',
        '$ionicTabsDelegate',
        '$ionicSideMenuDelegate',
        'DialogService',
        'gettextCatalog',
        'VehiclesService',
        'aemModalService',
        'ExternalLinksService',
        '$ionicScrollDelegate',
        'TutorialService',
        'BrandShopsService',
        'SideMenuService',
        'AndroidLocationPermissionsService',
        ctrl
    ]
});

function ctrl(
    $scope,
    $rootScope,
    $compile,
    $state,
    $ionicHistory,
    $animate,
    iFrameContainerService,
    memberInfoService,
    offersService,
    aem,
    externalLinks,
    api,
    $ionicTabsDelegate,
    $ionicSideMenuDelegate,
    dialogService,
    gettextCatalog,
    vehiclesService,
    aemModalService,
    externalLinksService,
    $ionicScrollDelegate,
    tutorialService,
    BrandShopsService,
    SideMenuService,
    AndroidLocationPermissionsService
) {

    var vm = this;

    vm.gettextCatalog = gettextCatalog;
    vm.memberInfo = memberInfoService.getMemberInfo();
    vm.nameDisplay = memberInfoService.getmemberName();

    var loadMemberInfo = function() {
        var stateName = $state.current.name;

        /* refresh member info on certain routes */
        if (stateName === 'dash.chat' || stateName === 'dash.dealers') {
            setMemberInfoDetails();
        }
    };

    function setMemberInfoDetails() {
        vm.memberInfo = memberInfoService.getMemberInfo();
        vm.nameDisplay = memberInfoService.getmemberName();

        if (!vm.firstName) {
            vm.firstName = vm.memberInfo.firstName;
        }
        if (!vm.lastName) {
            vm.lastName = vm.memberInfo.lastName;
        }
    }

    // force dashbaord's data update
    $scope.$on('$ionicView.afterEnter', function() {
        loadMemberInfo();

        $rootScope.$emit('translate:reRenderDashSVG', {
            lang: gettextCatalog.getCurrentLanguage()
        });
    });

    vm.dashboardOpen = false;

    vm.checkOurOffers = function() {
        return externalLinks.checkOurOffers();
    };
    vm.buildYourBMW = externalLinks.buildYourBMW();
    vm.requestYourQuotation = function() {
        return externalLinks.requestYourQuotation();
    };
    vm.joinYourBMWEvents = function() {
        return externalLinks.joinYourBMWEvents();
    };
    vm.locateYourDealer = function() {
        return externalLinks.locateYourDealer();
    };

    vm.bmwUsedCar = externalLinks.bmwUsedCar();
    vm.bmwEmall = externalLinks.bmwEmall();
    vm.bmwProductLine = externalLinks.bmwProductLine();
    vm.motorradProductLine = externalLinks.motorradProductLine();
    vm.miniUsedCar = externalLinks.miniUsedCar();
    vm.miniEmall = externalLinks.miniEmall();
    vm.miniProductLine = externalLinks.miniProductLine();
    vm.shareFeedback = externalLinks.shareFeedback;
    vm.bmwNews = externalLinks.bmwNews();
    vm.bmwMagazine = externalLinks.bmwMagazine;
    vm.requestTestDriveBMW = externalLinks.requestTestDriveBMW;
    vm.requestTestDriveMini = externalLinks.requestTestDriveMini;
    vm.requestTestDriveMotorrad = externalLinks.requestTestDriveMotorrad;
    vm.customerServices = externalLinks.customerServices;
    vm.chatWallpaper = externalLinks.chatWallpaper;
    vm.gifStickers = externalLinks.gifStickers;
    vm.digitalMagazine = externalLinks.digitalMagazine;
    vm.mobisite = externalLinks.mobisite;
    vm.apps = externalLinks.apps;
    vm.subscriptionHistory = externalLinks.subscriptionHistory;
    vm.ringtone = externalLinks.ringtone;
    vm.tv = externalLinks.tv;
    vm.financeSelfService = externalLinks.financeSelfService;
    vm.bmwCustomerServiceOverview = externalLinks.bmwCustomerServiceOverview;
    vm.bmwUsedCarDiscover = externalLinks.bmwUsedCarDiscover;
    vm.bmwConnetedDriveStore = externalLinks.bmwConnetedDriveStore;
    vm.bmwBuyAccessories = externalLinks.bmwBuyAccessories;
    vm.bmwLifeStyleShop = externalLinks.bmwLifeStyleShop;
    vm.bmwFindoutSuitsYou = externalLinks.bmwFindoutSuitsYou;

    vm.miniBuyAccessories = externalLinks.miniBuyAccessories;
    vm.miniLifeStyleShop = externalLinks.miniLifeStyleShop;
    vm.bmwOfficialOwnerClub = externalLinks.bmwOfficialOwnerClub;

    vm.reachnowBookACar = externalLinks.reachnowBookACar;
    vm.reachnowMyTrips = externalLinks.reachnowMyTrips;
    vm.reachnowSupport = externalLinks.reachnowSupport;
    vm.reachnowMore = externalLinks.reachnowMore;
    vm.merchant = externalLinks.merchant;
    vm.searchChargingStation = externalLinks.searchChargingStation;
    vm.aboutChargingService = externalLinks.aboutChargingService;
    vm.chargeNowOthers = externalLinks.chargeNowOthers;
    vm.findVehicleByOnline = externalLinks.findVehicleByOnline;
    vm.shopBuyNewVehicleOnline = externalLinks.shopBuyNewVehicleOnline;
    vm.motorradBuyNewVehicleOnline = externalLinks.motorradBuyNewVehicleOnline;
    vm.bookServiceAppointment = externalLinks.bookServiceAppointment;
    vm.vehicleOwnersHandbook = externalLinks.vehicleOwnersHandbook;

    vm.openExternalLink = function (link) {
        externalLinksService.openURL(link);
    };

    vm.openExternalLinkWithLocationPermission = function (link) {
        if ( ionic.Platform.isAndroid() ) {
            AndroidLocationPermissionsService.checkAndRequest()
            .finally(navigateToPageWithGeolocation);
        } else {
            vm.openExternalLink(link);
        }
        function navigateToPageWithGeolocation () {
            vm.openExternalLink(link);
        }
    };

    vm.openExternalLinkInDeviceBrowser = function(link, redirectPageName) {
        externalLinksService.openURLInDeviceBrowser(link, redirectPageName);
    };

    vm.sideMenuWidth = window.innerWidth - 50;


    $scope.mydealers = {};
    $scope.currentDealerInfo = {};
    $scope.setCurrentDealerInfo = function(dealer) {
        $scope.currentDealerInfo = dealer;
    };

    // my profile and addCreditCard pages
    vm.hideRightBtn = true;
    vm.onRightBtnClick = function() {};
    vm.rightBtnDisabled = false;

    vm.$state = $state;

    vm.hideCard = function() {
        $scope.modal.remove();
    };

    vm.showOfferInfo = function(offerInfo) {
        offersService.setCurrentOfferInfo(offerInfo);
        vm.hideCard();
        $state.go('dash.offerInfo', {
            offerId: offerInfo.itemId
        });
    };

    vm.openOffersView = function() {
        if ($ionicHistory.currentStateName() === 'dash.offers') {
            vm.clearLayer();
        } else {
            $state.go('dash.offers');
        }
    };
    vm.redirectToMyVouchers = function() {
        if ($ionicHistory.currentStateName() === 'dash.coupons') {
            vm.clearLayer();
        } else {
            $state.go('dash.coupons');
        }
    };

    vm.openActivePushView = function() {
        if ($ionicHistory.currentStateName() === 'dash.chat') {
            vm.clearLayer();
        } else {
            $state.go('dash.chat');
        }
    };

    vm.switchChatMode = function() {
        vm.clearLayer();
        $rootScope.isChatMode = true;
    };

    vm.openComingSoonView = function() {
        var msg = {
            title: gettextCatalog.getString('Coming soon'),
            body: gettextCatalog.getString('This feature is under construction. Please check back soon.'),
            buttonText: gettextCatalog.getString('close')
        };
        dialogService.alertComingSoon(msg);
    };

    vm.openNewsletterLink = function(needClearLayer) {
        api.getNewsletterLink().then(function(result) {
            var url = result.Result.responseBody;
            if (!/http/.test(url)) {
                url = 'http://' + url;
            }
            if(needClearLayer !== false){
                vm.clearLayer();
            }
            vm.openExternalLink(url);
        });
    };

    vm.openLegalDisclaimerLink = function() {
        vm.openExternalLink(externalLinks.legalDisclaimer());
    };

    vm.logout = function() {

        var options = {
            msg: gettextCatalog.getString('Comfirm to logout'),
            confirmText: gettextCatalog.getString('Yes'),
            cancelText: gettextCatalog.getString('Cancel'),
            confirmOnTap: function() {
                api.logout().then(function() {
                    vm.closeSideBar();
                    $rootScope.$emit('app:logout');
                    $state.go('home');
                });
            },
            cancelOnTap: function() {
                $state.go('dash.chat');
            }
        };

        // delete localstorage set for promotion page
        dialogService.confirmWithRedirect(options);

    };


    /*
     * show AEM content functions
     */

    vm.showTCForCustomer = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('BMW Terms and conditions'), aem.getTermsAndConditionsTemplateURL('bmw'));
    };

    vm.showCustomerConsent = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Customer Consent'), aem.getTermsAndConditionsTemplateURL('customer-consent'));
    };




    vm.toggleChatLayer = function() {
        vm.clearLayer('chats');
        vm.isChatShown = !vm.isChatShown;
    };

    vm.toggleOffersLayer = function() {
        vm.clearLayer('offer');
        if (!vm.isOfferShown) {
            $ionicTabsDelegate.select(2);
        }
        vm.isOfferShown = !vm.isOfferShown;
    };

    vm.toggleMeLayer = function() {
        vm.clearLayer('me');
        if (!vm.isMeShown) {
            $ionicTabsDelegate.select(4);
        }
        vm.isMeShown = !vm.isMeShown;
    };

    vm.openSideBar = function() {
        // hide others layers
        vm.hidePopupLayers();
        vm.clearLayer();
        // opens side menu
        $ionicSideMenuDelegate.toggleRight();
        // scroll top (in case content is long)
        $ionicScrollDelegate.$getByHandle('sideMenuScroll').scrollTop();
    };

    vm.goBackSideBar = function() {
        $ionicHistory.goBack();
        vm.openSideBar();
    };

    vm.sideMenuOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    };

    vm.closeSideBar = function(isBackOpen) {
        $ionicSideMenuDelegate.toggleRight();
        $ionicHistory.nextViewOptions({
            disableAnimate: true
        });
        if(isBackOpen) {
            vm.goBackEnableSidebar = true;
        }
    };

    vm.isLayerOpen = function() {
        return vm.isChatShown || vm.isMeShown || vm.isOfferShown;
    };

    vm.hidePopupLayers = function() {
        vm.isOfferShown = vm.isMeShown = vm.isChatShown = false;
    };

    vm.clearLayer = function(layer) {
        $animate.enabled(true);
        $ionicTabsDelegate.select(0);
        vm.dashboardOpen = false;

        if (vm.isOfferShown && layer !== 'offer') {
            vm.isOfferShown = false;
        }
        if (vm.isMeShown && layer !== 'me') {
            vm.isMeShown = false;
        }
        if (vm.isChatShown && layer !== 'chats') {
            vm.isChatShown = false;
        }
    };

    vm.goTo = function(state, params, externalLinkCbName) {
        if(externalLinkCbName){
            this.openExternalLink(vm[externalLinkCbName]());
        }else {
            $state.go(state, params);
        }

    };

    vm.callPhone = function(number) {
        externalLinksService.callPhone(number);
    };

    // show tutorial from side menu

    vm.showTutorial = function() {
        tutorialService.showTutorial($scope);
    };

    // show tutorial the user first time login

    if (!localStorage.getItem('hasBeenLogged')) {
        vm.showTutorial();
    }

    vm.toggleSideNav = function(menu, direction) {
        direction = direction || 'forward';

        var menus = SideMenuService.getMenus();
        _.each(menus, function (item, index) {
            if ( menu === item.menu ) {
                vm.parentSidemenu = item.parent;
            }
        });
        SideMenuService.menuTransition(direction, menu);
    };

    vm.redirectToBrandShopPage = function(name) {
        $state.go('dash.brandShopInfo', {
            name: name
        });
    };
    
    $scope.$on('openComingSoonView.event', function(){
        vm.openComingSoonView();
    });

}
