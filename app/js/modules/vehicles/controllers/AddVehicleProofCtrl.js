angular.module('webapp.vehicles').controller({
    AddVehicleProofCtrl: [
        '$scope',
        '$rootScope',
        'VehiclesService',
        'FileUploadService',
        'aem',
        'aemModalService',
        'gettextCatalog',
        'DialogService',
        '$stateParams',
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
    $stateParams
) {

    var vm = this;
    vm.file = {};
    vm.extension = '';
    vm.vinNo = '';
    vm.isFileValid = false;
    vm.isVinValid = true; 
    vm.defaultVinErrorMsg = gettextCatalog.getString('VIN number should be extaclty 17 characters');

   vm.vinNo = $stateParams.vin;

    // upload file options, extension maximum size..... to be passed to the directive

    vm.uploadOptions = {
        iconLink: $rootScope.imageBaseURL + 'img/upload/picture.svg',
        extension: {
            allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png'],
            errorMsg: gettextCatalog.getString('upload file only support jpg,jpeg,pdf,png')
        },
        maxSize: {
            value: 3000000,
            errorMsg: gettextCatalog.getString('Please select a file less than 3 mb in size to upload.')
        }
    };


    // getting uploaded File information

    vm.saveFile = function(file, extension) {
        vm.file = file;
        vm.extension = extension;
    };


    // submit vehicle information: VIN No and image file

    vm.submit = function() {
        fileUploadService.fileToBase64(vm.file)
            .then(function(result) {
                var imageData = fileUploadService.HTMLencode(result.split('base64,')[1]);
                var postData = {
                    vin: vm.vinNo,
                    fileExtension: vm.extension,
                    fileBytesArray: imageData,
                    disablePopupError: true
                };
                vehiclesService.addVehicle(postData)
                    .then(function() {
                        dialogService.successWithRedirect(gettextCatalog.getString('Vehicle sucessfully added, waiting for approval.'), 'dash.vehicles');
                    })
                    .catch(function(result) {
                        vm.errorMsg = result.data.errorMessage;
                    });
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
