angular.module('webapp.common').directive({
    validateLength: ['$log', 'gettextCatalog', validateLength]
});


/*
 * validate-length
 *
 * @usage: validate length of ngModel of an input
 *
 * @attributes:
 *    - ngModel: for validating input
 *    - inputName: for updating form's validity
 *    - errorMessage: for overriding errorMessage in parent's template
 */

function validateLength ($log, gettextCatalog) {
    return {
        require: '^ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            inputName: '@',
            error: '=',
            errorMessage: '='
        },

        link: function(scope, element, attrs, ngModelCtrl) {

            // init

            var expectedLength = parseInt(attrs.validateLength);
            var defaultMessage = gettextCatalog.getString('Lenght should be ') + expectedLength;
            var errorMessage = scope.errorMessage || defaultMessage;

            if (!expectedLength) {
                $log.error('validate-length directive: no length was set');
            }

            // on update

            scope.$watch('ngModel', function (newVal, oldVal) {
                if (!!newVal && (newVal != oldVal)) {
                    if (newVal.length != expectedLength) {
                        setError();
                    } else {
                        unsetError();
                    }
                }
            });

            // helpers functions

            function setError () {
                scope.error = errorMessage;
                ngModelCtrl.$setValidity(scope.inputName, false);
            }

            function unsetError () {
                scope.error = '';
                ngModelCtrl.$setValidity(scope.inputName, true);
            }

        }
    };
}
