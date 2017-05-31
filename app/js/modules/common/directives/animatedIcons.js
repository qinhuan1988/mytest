angular.module('webapp.common').directive({
    animatedIcons: [animatedIcons]
});

/*
 * animatedIcons
 *
 * purpose: builds one animated icons based on 3 parts:
 *  1) main icon
 *  2) part icon that disappears
 *  3) part icon that appears on disappearing part icon 
 */

function animatedIcons() {

    return {
        restrict: 'C',
        scope: {
        	mainIcon: '=',
        	animatedPartStart: '=',
        	animatedPartEnd: '=',
            label: '='
        },
        templateUrl: 'js/modules/common/templates/animated-icons.html'
    };
    
}
