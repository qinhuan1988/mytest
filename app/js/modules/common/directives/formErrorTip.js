angular.module('webapp.common').directive({
    formErrorTip: formErrorTip
});

function formErrorTip() {
    return {
        scope: {
            errorMsg: '='
        },
        template: '<div class="row row-no-padding" ng-if="errorMsg">' +
            '<div class="assertive errorMsg-inline">' +
            '<p class="title"><i class="fail-alert-icon"></i><span class="description">{{errorMsg}}</span></p>' +
            '</div></div>'
    };
}