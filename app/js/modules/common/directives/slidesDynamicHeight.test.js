describe('slides dynamic height test', function() {
    var $compile, $scope, $timeout, directiveElem;


    beforeEach(module('webapp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $timeout = _$timeout_;
        directiveElem = getCompiledElement();
    }));

    function getCompiledElement(){
        var element = angular.element('<div slides-dynamic-height><div class="swiper-slide-active"></div></div>');
        var compiledElement = $compile(element)($scope);
        $scope.$digest();
        $timeout.flush(1000);
        return compiledElement;
    }

    it('slides container should set active slide\'s height', function(){
        $scope.$digest();
        expect(directiveElem[0].offsetHeight).toEqual(0);
    });

});
