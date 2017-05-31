angular.module('webapp.common').factory(
    'TutorialService', ['$ionicModal', '$timeout', 'LocaleService', TutorialService]
);

function TutorialService($ionicModal, $timeout, localeService) {

    var slideAssets = [
        '01.jpg',
        '02.jpg',
        '03.jpg',
        '04.jpg',
        '05.jpg',
        '06.jpg',
        '07.jpg'
    ];

    var slider = {
        options: {
            loop: false,
            speed: 200
        },
        delegate: null,
        activeIndex: 0
    };

    var templateURL = 'js/modules/common/templates/tutorial.html';


    function getAssetsPath () {
        return "img/tutorial/" + localeService.gettextLang() + "/";
    }

    function showTutorial (scope) {
        $ionicModal.fromTemplateUrl(templateURL, function($ionicModal) {
            scope.tutorialModal = $ionicModal;
            scope.tutorialModal.slideAssets = slideAssets;
            scope.tutorialModal.assetsFolderPath = getAssetsPath();
            scope.tutorialModal.slider = slider;
            scope.$on("$ionicSlides.slideChangeStart", function(event, data){
                $timeout(function () {
                    scope.activeIndex = data.slider.activeIndex + 1;
                });
            });
            scope.$on("$ionicSlides.sliderInitialized", function(event, data){
                scope.activeIndex = 1;
            });
        }, {
            scope: scope,
            animation: 'slide-in-up'
        })
        .then(function() {
            scope.tutorialModal.show();
            localStorage.setItem('hasBeenLogged', true);
        });
    }

    return {
        showTutorial: showTutorial,
        slideAssets: slideAssets
    };
}
