describe('AEM Data service', function () {

    var $q,
        $rootScope,
        AEMDataService,
        mockENV_SETTING = {
            aemDomain: 'https://cmscn-int.bmwgroup.com',
            aemDam: ''
        },
        mockLocaleService = {
            getLang: function() {
                return 'zh';
            }
        },
        mocklevelsData = [
            {
                'jcr:content': {
                    'cq:template': '/apps/bmwLP/templates/levels_template',
                    'levels_name': {
                        'jcr:name': 'silver'
                    },
                    'levels_desc': {
                        'jcr:description': 'silver card'
                    },
                    'levels_points': {
                        'jcr:points': '1000'
                    },
                    'levels_card_image': {
                        'image': {
                            'fileReference': ''
                        }
                    }
                }
            }
        ];

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('LocaleService', mockLocaleService);
            $provide.value('ENV_SETTING', mockENV_SETTING);
        });
	});
    beforeEach(module('webapp.aem'));

    beforeEach(inject(function ( _AEMData_, _$q_, _$rootScope_) {

        AEMDataService = _AEMData_;
        $q = _$q_;
        $rootScope = _$rootScope_;

    }));

    it('level image should use current language', inject(function($httpBackend) {

        AEMDataService.refreshLevels();

        $httpBackend
            .when('GET', 'https://cmscn-int.bmwgroup.com/content/BMW-Loyalty/zh/levels/.6.json')
            .respond(200, mocklevelsData);
        $httpBackend.flush();

        expect(AEMDataService.getLevels()[0].imageLink)
            .toEqual('https://cmscn-int.bmwgroup.com/content/BMW-Loyalty/zh/levels/0/jcr:content/levels_card_image/image/file');

    }));

});
