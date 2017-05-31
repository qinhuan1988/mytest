angular.module('webapp.faq').directive({
    faqItem: faqItem
});

// faq accordion list
function faqItem() {
    return {
        restrict: 'A',
        templateUrl: 'js/modules/faq/FaqItemTemplate.html',
        scope: {
            question: '@',
            answer: '@',
            active: '='
        },
        link: function($scope) {
            $scope.active = false;
            $scope.itemId = new Date().getTime() + Math.random(0, 1);
            $scope.toggle = function() {
                if ($scope.active === $scope.itemId)
                    $scope.active = false;
                else
                $scope.active = $scope.itemId;
            };
        }
    };
}
