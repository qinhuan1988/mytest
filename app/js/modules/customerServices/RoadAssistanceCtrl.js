angular.module('webapp.roadAssistance', [

]).controller({
    RoadAssistanceCtrl: ['$state', 'aem', ctrl]
});

function ctrl($state, aem) {

    var vm = this;
    vm.roadSideAssistanceTemplateURL = aem.getRoadSideAssistanceTemplateURL();
}
