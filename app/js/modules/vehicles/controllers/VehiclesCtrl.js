angular.module('webapp.vehicles').controller({
    VehiclesCtrl: [
        '$scope',
        '$state',
        'VehiclesService',
        'DialogService',
        'gettextCatalog',
        '$rootScope',
        ctrl
    ]
});

function ctrl(
    $scope,
    $state,
    vehiclesService,
    dialogService,
    gettextCatalog,
    $rootScope
) {

    var vm = this;

    vm.slider = {
        options: {
            pagination: false,
            loop: false,
            speed: 200
        },
        delegate: null,
        activeIndex: 0
    };






    vm.hasVehicles = function() {
        return !!vm.vehicleList && vm.vehicleList.length > 0;
    };

    vm.init = function () {
        $rootScope.pullToRefresh = 1;
        vehiclesService.refreshVehiclesList()
            .then(function () {
                vm.vehicleList = vehiclesService.getVehiclesList();
                vehicleListPrep();
                $scope.dash.memberInfo.carsDetails = vm.vehicleList;
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                $rootScope.pullToRefresh = 0;
            });
    };
    
    function vehicleListPrep(){
         //API cicStatus: has four states A: Approved E :Escalated P :Pending R: rejected
        _.each(vm.vehicleList, function(item) {
             if(item.cicStatus === 'A'){
                 item.approved = true;
             }else if(item.cicStatus === 'R'){
                 item.rejected = true;
             }else {
                 item.pending = true;
             }
        } );
       
      
    }

    $scope.$on("$ionicView.afterEnter", vm.init);


    //
    // slider
    //

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        vm.slider.next = data.slider._slideNext;
        vm.slider.prev = data.slider._slidePrev;
    });


    $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
        vm.slider.activeIndex = data.slider.activeIndex;
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
        refreshSlider(data);
    });

    function refreshSlider(data) {
        vm.slider.activeIndex = data.slider.activeIndex;
        $scope.$apply();
    }


    //
    // remove vehicle
    //

    vm.removeVehicle = function() {
        var removeVehPopup = {
            msg: gettextCatalog.getString('Do you want to remove this vehicle?'),
            confirmText: gettextCatalog.getString('YES'),
            cancelText: gettextCatalog.getString('NO'),
            confirmOnTap: function() {
                var postData = {
                    vin: vm.vehicleList[vm.slider.activeIndex].vin,
                    purchaseDate: vm.vehicleList[vm.slider.activeIndex].purchaseDate,
                    model: vm.vehicleList[vm.slider.activeIndex].model
                };
                vehiclesService.removeVehicle(postData).then(function() {
                    vehiclesService.refreshVehiclesList()
                        .then(function() {
                            vm.vehicleList = vehiclesService.getVehiclesList();
                            $scope.dash.memberInfo.carsDetails = vm.vehicleList;
                        });
                });
            },
            cancelOnTap: function() {}
        };
        dialogService.confirmWithRedirect(removeVehPopup);
    };

}
