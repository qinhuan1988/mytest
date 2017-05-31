angular.module('webapp.vehicles').service({
    VehiclesService: ['api', '$q', vehiclesService]
});

function vehiclesService(api, $q) {

    // init

    var vehiclesList = [];

    // vehicles service return object

    return {
        setVehiclesList: setVehiclesList,
        getVehiclesList: getVehiclesList,
        refreshVehiclesList: refreshVehiclesList,
        addVehicle: addVehicle,
        removeVehicle: removeVehicle
    };

    //  set list of vehicles

    function setVehiclesList(list) {
        vehiclesList = list;
    }

    // get the list of vehicles

    function getVehiclesList() {
        return vehiclesList;
    }

    // refresh the list of vehicles

    function refreshVehiclesList() {
        var deferred = $q.defer();
        api.getMemberVehicle()
            .then(function(result) {
                vehiclesList = result.vehicleArray ? result.vehicleArray : [];
                deferred.resolve(result);
            })
            .catch(deferred.reject);
        return deferred.promise;
    }

    // add vehicle

    function addVehicle(postData) {
        return api.addVehicle(postData);
    }

    // remove vehicle

    function removeVehicle(postData) {
        return api.removeVehicle(postData);
    }

}
