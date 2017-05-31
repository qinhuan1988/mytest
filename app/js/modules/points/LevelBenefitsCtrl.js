angular.module('webapp.levelBenefits', [

	]).controller({
	    LevelBenefitsCtrl: ['$scope','$state', 'aem', ctrl]
	});

	function ctrl($scope, $state, aem) {

		var vm = this;

		vm.levelsBenefitsTemplateURL = aem.getLevelsBenefitsTemplateURL();

	}
