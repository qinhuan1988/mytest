angular.module('webapp.brandShops')
    .controller({
        BrandShopInfoCtrl: [
            '$scope',
            '$rootScope',
            'BrandShopsService',
            'gettextCatalog',
            '$ionicSlideBoxDelegate',
            '$stateParams',
            ctrl
        ]
    });

function ctrl(
    $scope,
    $rootScope,
    brandShopsService,
    gettextCatalog,
    $ionicSlideBoxDelegate,
    $stateParams
) {

    var vm = this;
    vm.data = null;
    vm.items = null;
    vm.sliderImages = [];
    var brandName = $stateParams.name;
    var slider = $ionicSlideBoxDelegate.$getByHandle('brandShopHandler');

    init();

    function init () {
        $rootScope.loading++;
        loadTemplate(brandName);
        vm.lang = gettextCatalog.getCurrentLanguage();
        brandShopsService.getBrand(brandName)
            .then(function (brand) {
                vm.data = brand;
                vm.items = brandShopsService.getBrandItems(vm.data);
                getSliderImages(vm.data);
            })
            .catch()
            .finally(function () {
                $rootScope.loading--;
            });
    }

    function loadTemplate (name) {
        switch (name) {
            case 'bmw':
                vm.externalLinksTemplate = 'js/modules/brandShops/templates/externalLinks/bmw.html';
                break;
            case 'mini':
                vm.externalLinksTemplate = 'js/modules/brandShops/templates/externalLinks/mini.html';
                break;
            case 'motorrad':
                vm.externalLinksTemplate = 'js/modules/brandShops/templates/externalLinks/motorrad.html';
                break;
            default:
                break;
        }
    }


    /*
     * Sliders functions
     */

    function getSliderImages (brand) {
        brandShopsService.getBrandSliderAssets(brand)
            .then(function (data) {
                vm.sliderImages = data;
                updateSlider();
            });
    }

    function updateSlider() {
        slider.update();
    }

    vm.showSliderNext = function() {
        return slider.currentIndex() < (vm.sliderImages.length - 1);
    };

    vm.showSliderPrev = function() {
        return slider.currentIndex() !== 0;
    };

    vm.goNextslider = function() {
        slider.next();
    };

    vm.goPrevSlider = function() {
        slider.previous();
    };

}
