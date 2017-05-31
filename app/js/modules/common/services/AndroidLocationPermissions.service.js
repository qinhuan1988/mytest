angular.module('webapp.common')
    .service('AndroidLocationPermissionsService', [ '$q', service ]);


/*
 * Android Geolocation Service
 *
 * wrapper around https://github.com/dpa99c/cordova-diagnostic-plugin
 *
 * @context:
 *  - android version inferior to 6: permissions are asked during installation
 *  - android version 6 and +: permission should be asked on runtime
 *
 * see: https://developer.android.com/guide/topics/permissions/requesting.html
 *
 * @usage:
 *  - checkAndRequest: if permission is off, request user permission
 */


function service( $q ) {


    function requestGeolocation () {
        var deferred = $q.defer();

        cordova.plugins.diagnostic.requestLocationAuthorization(
            deferred.resolve,
            deferred.reject
        );

        return deferred.promise;
    }

    function checkGeolocation () {
        var deferred = $q.defer();

        cordova.plugins.diagnostic.isLocationAuthorized(
            deferred.resolve,
            deferred.reject
        );

        return deferred.promise;
    }

    function checkAndRequest () {
        var deferred = $q.defer();

        checkGeolocation()
        .then(function (status) {
            if (!status) {
                    requestGeolocation()
                    .then(deferred.resolve)
                    .catch(deferred.reject);
            } else {
                deferred.resolve(); // already granted
            }
        })
        .catch(deferred.reject);

        return deferred.promise;
    }



    this.checkAndRequest = checkAndRequest;

}
