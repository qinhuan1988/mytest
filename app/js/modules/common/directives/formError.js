angular.module('webapp.common').directive({
    formError: formError
});

function formError() {
    return {
        scope: {
            errorMsg: '='
        },
        template: '<div class="row row-no-padding" ng-if="errorMsg">' +
            '<div class="assertive errorMsg-inline">' +
            '<p class="title"><i class="ion-android-alert"></i> <span>{{"Error" | translate}}</span></p>' +
            '<p class="description">{{errorMsg}}</p></div>'
    };
}
