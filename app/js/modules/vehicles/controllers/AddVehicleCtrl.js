angular.module('webapp.vehicles').controller({
    AddVehicleCtrl: [
        '$scope',
        '$rootScope',
        'VehiclesService',
        'FileUploadService',
        'aem',
        'aemModalService',
        'gettextCatalog',
        'DialogService',
        '$state',
        ctrl
    ]
});

function ctrl(
    $scope,
    $rootScope,
    vehiclesService,
    fileUploadService,
    aem,
    aemModalService,
    gettextCatalog,
    dialogService,
    $state
) {

    var vm = this;
    vm.vinNo = '';
    vm.isVinValid = false; // become true only after server confirmed validity
    vm.defaultVinErrorMsg = gettextCatalog.getString('VIN number should be extaclty 17 characters');

    vm.checkVinValidity = function(){
          var postData = {
              vin : vm.vinNo,
              disablePopupError: true
          };
          vehiclesService.addVehicle(postData)
          .then(function(result){
              //make green button and show file upload container

          }, function(result){
              // -1825: vin correct, but no proof uploaded
            if(result.data.errorCode == '-1825'){
                  vm.isVinValid = true ;
                  $state.go('dash.addVehicleProof',{vin: vm.vinNo });
              }else {
                  vm.isVinValid = false ;
                  vm.vinError = result.data.errorMessage ;
              }
          });
    };

    vm.showVINInfo = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Find your VIN'), aem.getVINInfoTemplateURL());
    };

    vm.showAgreement = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('add vehicle title-terms and conditions'), aem.getTermsAndConditionsTemplateURL('addvehicleagreement'));
    };

    vm.showDocumentDescription = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('add vehicle title-explanation for uploading of multiple documents'), aem.getOwershipInfoTemplateURL());

    };
}
