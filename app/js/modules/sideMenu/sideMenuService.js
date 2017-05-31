angular.module('webapp.dash').service({
    SideMenuService: ['$ionicConfig', '$ionicClickBlock', '$ionicScrollDelegate', '$timeout', SideMenuService]
});

function SideMenuService($ionicConfig, $ionicClickBlock, $ionicScrollDelegate, $timeout) {

    var currentMenu = 'Overview';
    var menus = [{
            parent: '',
            menu: 'Overview'
        }, {
            parent: 'Overview',
            menu: 'LP'
        }, {
            parent: 'Overview',
            menu: 'BMW'
        },{
            parent: 'Overview',
            menu: 'BMW'
        },{
            parent: 'BMW',
            menu: 'BMW1'
        },{
            parent: 'BMW',
            menu: 'BMW2'
        },{
            parent: 'BMW',
            menu: 'BMW3'
        },{
            parent: 'BMW',
            menu: 'BMW4'
        },{
            parent: 'BMW',
            menu: 'BMW5'
        },{
            parent: 'BMW',
            menu: 'BMW6'
        },{
            parent: 'BMW',
            menu: 'BMW7'
        },{
            parent: 'BMW',
            menu: 'BMW8'
        },{
            parent: 'Overview',
            menu: 'Mobi'
        },{
            parent: 'Mobi',
            menu: 'Reachnow'
        },{
            parent: 'Mobi',
            menu: 'Changenow'
        },{
            parent: 'Overview',
            menu: 'Financial'
        },{
            parent: 'Overview',
            menu: 'OffersNews'
        },{
            parent: 'Overview',
            menu: 'Me'
        }];

    var getMenus = function() {
        return menus;
    };

    var menuTransition = function(direction, menu) {
        var enteringEle = angular.element(document.querySelector('.menuActive' + menu));
        var leavingEle = angular.element(document.querySelector('.menuActive' + currentMenu));
        var platform = ionic.Platform.isAndroid()? 'android': 'ios';
        var viewTransition = $ionicConfig.transitions.views[platform](enteringEle, leavingEle, direction, true);
        $ionicClickBlock.show(500);

        viewTransition.run(0);
        enteringEle[0].style.display = 'block';
        $timeout(function() {
            viewTransition.run(1);
            $ionicScrollDelegate.$getByHandle('sideMenuScroll').resize();
            $ionicScrollDelegate.$getByHandle('sideMenuScroll').scrollTo(0, 0, true);
            currentMenu = menu;
        }, 10);
    };

    return {
        getMenus: getMenus,
        menuTransition: menuTransition
    };
}
