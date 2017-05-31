angular.module('webapp.common')
    .config(['$logProvider', 'ENV_SETTING', logConfig]);

/*
 * logConfig
 *
 * @description: disabled logs based on environment
 * http://dist.sonarsource.com/plugins/csharp/rulesdoc/0.9.0-RC/S2228.html
 *
 */
function logConfig ($logProvider, ENV_SETTING) {

    $logProvider.debugEnabled(ENV_SETTING.DEBUG);

}
