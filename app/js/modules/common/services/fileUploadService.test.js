describe('file upload service function test', function() {

    var deferred,
        $rootScope,
        FileUploadService,
        mockFile = new Blob([0,30], {type: 'image/jpeg'});

    beforeEach(module('webapp.common'));

    beforeEach(inject(function ( _FileUploadService_, _$q_, _$rootScope_) {
        FileUploadService = _FileUploadService_;
        deferred = _$q_.defer();
        $rootScope = _$rootScope_;
    }));

    it('resizeImage should return a promise', function() {
        expect(FileUploadService.resizeImage(mockFile).then).toBeDefined();
    });

});
