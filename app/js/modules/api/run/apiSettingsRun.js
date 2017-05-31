angular.module('webapp.api')
    .run([
        '$rootScope',
        'Restangular',
        'ENV_SETTING',
        'DEFAULT_SETTING',
        'DialogService',
        'gettextCatalog',
        '$state',
        apiSettings
    ]);

/*
 * apiSettings
 */

function apiSettings(
    $rootScope,
    Restangular,
    ENV_SETTING,
    DEFAULT_SETTING,
    DialogService,
    gettextCatalog,
    $state
) {

    Restangular.setBaseUrl(ENV_SETTING.baseApiUrl);

    Restangular.setDefaultHeaders({
        access_token: ENV_SETTING.accessToken
    });

    Restangular.setDefaultHttpFields({
        timeout: DEFAULT_SETTING.timeout
    });


    /*
     * Request
     */

    Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        $rootScope.loading++;
        return {
            headers: headers,
            params: _.extend(params, {
                _: new Date().getTime()
            }),
            element: element
        };
    });


    /*
     * Response: successfull and error
     */

    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        $rootScope.loading--;
        return data;
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {

        // session token error status code keeps changing
        if ( response.data && isExpiredSessionTokenError( response ) ) {
            if ( canDisplayExpiredSessionTokenError() ) {
                logout();
            }
        }
        // handles other errors per status code
        else {
            switch ( response.status ) {
                case -1:
                    DialogService.alertMsg(gettextCatalog.getString('Please check the internet connection'));
                    break;
                case 0:
                    DialogService.alertMsg(gettextCatalog.getString('Application error, please try again later'));
                    break;
                case 400:
                    if (( response.config.method === 'POST' && _.isUndefined( response.config.data.disablePopupError )) ||
                        ( response.config.method === 'GET' && _.isUndefined( response.config.params.disablePopupError ))) {

                        DialogService.alertMsg(gettextCatalog.getString(response.data.errorMessage));
                    }
                    break;
                case 401:
                    logout();
                    break;
                case 500:
                    DialogService.alertMsg(response.data.errorMessage);
                    break;
                case 503:
                    DialogService.alertMsg(gettextCatalog.getString('Service unavailable'));
            }
        }

        $rootScope.loading--;
        $rootScope.qrCodeRefreshing = 0;
        $rootScope.isLoadAEM = 0;

        return response;
    });

    function isExpiredSessionTokenError ( response ) {
        if ( response.data.errorCode === '-1225' ||
             response.data.errorCode === '-1227' ) {

            return true;
        } else {
            return false;
        }
    }

    function canDisplayExpiredSessionTokenError () {
        return $state.current.url !== '/';
    }

    function logout() {
        $rootScope.$emit('app:logout');
        DialogService.alertWithRedirect(gettextCatalog.getString('Session timeout, please login again.'), 'login');
    }
}
