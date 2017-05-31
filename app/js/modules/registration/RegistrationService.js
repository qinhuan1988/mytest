angular.module('webapp.registration').service({
    RegistrationService: registrationService
});
function registrationService() {
	 
    var registration = {};


    var getRegistrationInfo = function() {
        return registration;
    };
    var setRegistrationInfo = function(registrationData) {
        registration = registrationData;
    };

    return {
        getRegistrationInfo: getRegistrationInfo,
        setRegistrationInfo: setRegistrationInfo
    };
}
