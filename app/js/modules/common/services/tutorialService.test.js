describe('tutorial service', function() {
    var TutorialService,
        $timeout,
        $rootScope,
        $scope,
        sliderData = {
            slider: {
                activeIndex: 4
            }
        };

    beforeEach(module('webapp'));

    beforeEach(inject(function ( _TutorialService_, _$timeout_, _$rootScope_) {
        TutorialService = _TutorialService_;
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        localStorage.removeItem('hasBeenLogged');
    }));

    it('set hasBeenLogged to true after tutorial shown', function() {
        expect(localStorage.getItem('hasBeenLogged')).toEqual(null);
        TutorialService.showTutorial($scope);
        $rootScope.$digest();
        expect(localStorage.getItem('hasBeenLogged')).toBe('true');
    });

    it('activeIndex should set values after tutorial slider change', function() {
        TutorialService.showTutorial($scope);
        $rootScope.$digest();
        $scope.$broadcast('$ionicSlides.slideChangeStart', sliderData);
        $timeout.flush(1000);
        expect($scope.activeIndex).toEqual(5);
    });
});
