angular.module('webapp.dealers')
.controller('AddDealerPartialCtrl', [
    '$scope',
    'api',
    'aem',
    'aemModalService',
    'gettextCatalog',
    ctrl
]);



/*
 * AddDealerPartialCtrl:
 *
 * Partial used in both:
 *  - registration step 5 ctrl
 *  - add dealer ctrl
 *
 * Uses $scope.partial for accessing parents data (parent set $scope.partial = vm)
 * Otherwise $scope
 */

function ctrl ($scope, api, aem, aemModalService, gettextCatalog) {

    /*
     * on user selection
     *
     */

    $scope.onProvinceChange = function (provinceCode) {
        getCitiesByProvinceCode(provinceCode);
    };


    $scope.onCityChange = function (provinceCode, cityCode) {
        getDealerListByProvinceIdCityId(provinceCode, cityCode);
    };


    $scope.onDealerChange = function () {
        getDealerTC();
    };

    // if dealer changed, agreement checkbox should be reseted
    $scope.$watch('partial.formData.dealer', function (newVal, oldVal) {
        if ( !newVal || ( newVal && newVal != oldVal )) {
            if ($scope.partial.formData) {
                $scope.partial.formData.isAgreed = false;
            }
        }
    });

    $scope.showDealerTC = function() {
        aemModalService.showModal($scope, gettextCatalog.getString('Dealer T&C'), $scope.dealerTCTemplateURL);
    };

    /*
     * Get Data related functions
     *
     */

    function getProvinces () {
        var filterObj = {
            dataFor: 'P',
            regionCode: 'CN'
        };
        api.getProvince(filterObj)
            .then(function(result) {
                $scope.provinceList = result.provinceArray;
            });
    }

    function getCitiesByProvinceCode (provinceCode) {
        var filterObj = {
            provinceCode: provinceCode,
            dataFor: 'P',
            regionCode: 'CN'
        };
        api.getCity(filterObj)
            .then(function(result) {
                $scope.cityList = result.arrayCity;
                getDealerListByProvinceIdCityId(provinceCode, '');
            });
    }

    function getDealerListByProvinceIdCityId (provinceCode, cityCode) {
        var filterObj = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            regionCode: 'CN'
        };

        // parent controller can add extra field
        // check AddDealerCtrl / registration Step5Ctrl
        if ($scope.partial.getDealerListFilterObj) {
            _.extend(filterObj, $scope.partial.getDealerListFilterObj);
        }

        api.getDealers(filterObj)
            .then(function(result) {
                $scope.partial.partnerList = result.partnerArray;
            });
    }

    function getDealerTC () {
        $scope.dealerTCTemplateURL = aem.getTermsAndConditionsTemplateURL('28400');
    }


    /*
     * init
     */

    getProvinces();
    getCitiesByProvinceCode('');
    getDealerListByProvinceIdCityId('', '');

}
