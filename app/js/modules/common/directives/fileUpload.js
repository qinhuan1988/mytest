angular.module('webapp.common').directive({
    fileUpload: ['$timeout', 'gettextCatalog', '$rootScope',fileUpload]
});

function fileUpload($timeout, gettextCatalog, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            save: '&fileSave',
            options: '=fileOptions',
            errorMsg: '=fileErrorMsg',
            isFileValid: '=fileValid'
        },
        link: function(scope, element) {

            var input = element.find('input');
            var imgBox = element.find('img')[0];

            scope.isPreviewShown = false;

            function updateDefaultContent () {
                scope.isPreviewShown = true;
                scope.$digest();
            }

            // set error message function
            scope.setErrorMsg = function(text) {
                scope.errorMsg = text;
            };

            // uploading file
            input.on('change', function() {
                var file = this.files[0];
                // test file validity
                scope.isFileValid = testValidity(file);
                if (scope.isFileValid) {
                    // invocks method outside link to attribute on-save
                    scope.setErrorMsg('');
                    scope.save({
                        file: file,
                        extension: file.name.split(".").pop().toLowerCase()
                    });

                    // show preview
                    var reader = new FileReader();
                    reader.readAsDataURL(file);


                    reader.onloadend = function(e) {

                        var extension = file.name.split(".").pop().toLowerCase();

                        // shows selected image preview or PDF icon if no image
                        if (extension === 'pdf') {

                            angular.element( imgBox ).addClass('preview--pdf');
                            imgBox.src = $rootScope.imageBaseURL + 'img/upload/pdf.svg';

                        } else {

                            angular.element( imgBox ).removeClass('preview--pdf');
                            imgBox.src = e.target.result;
                        }

                        updateDefaultContent();
                    };
                }
                scope.$apply();
            });




            // check file validity based on options
            function testValidity(file) {
                if (_.isUndefined(file)) {
                    return false;
                } else if (scope.options.maxSize.value !== -1 && file.size >= scope.options.maxSize.value) {
                    scope.setErrorMsg(scope.options.maxSize.errorMsg);
                    return false;
                } else {
                    var extension = file.name.split(".").pop().toLowerCase();
                    if (scope.options.extension.allowedExtensions.indexOf(extension) === -1) {
                        scope.setErrorMsg(scope.options.extension.errorMsg);
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        templateUrl: 'js/modules/common/templates/fileUpload.html'
    };
}
