describe('My Profile Controller', function () {


    var vm,
        scope,
        mockMemberInfoService,
        DEFAULT_SETTING;

    mockMemberInfoService = {
        getMemberInfo: angular.noop,
        getmemberName: angular.noop
    };

    DEFAULT_SETTING = {
        communicationTypes: [
            {
                id: 'Z',
                name: 'Z communication type'
            }
        ]
    };





    beforeEach(module('webapp.myProfile'));

    beforeEach(inject(function ( $rootScope ) {
        scope = $rootScope.$new();

        vm = $controller('MyProfileCtrl', {
            $scope: scope,
            $rootScope: $rootScope,
            memberInfoService: mockMemberInfoService,
            DEFAULT_SETTING: DEFAULT_SETTING
        });
    }));






    it('should return available communication type', function () {
        var type = vm.getCommunicationType( null );
        expect( type ).toBe( '' );

        type = vm.getCommunicationType( 'X' );
        expect( type ).toBe( '' );

        type = vm.getCommunicationType( 'Z' );
        expect( type ).toBe( 'Z communication type' );
    });

});
