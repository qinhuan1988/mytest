angular.module('webapp.myWallet').directive({
    pcLogo: [pcLogo],
});
function pcLogo() {
    return {
        restrict: 'E',
        replace: true,
        template: '<ion-nav-buttons side="secondary">' + 
                      '<button class="button icon-payment" data-tap-disabled="true">' +
                   '</button></ion-nav-buttons>',
        
    };
}