angular.module('webapp.brandShops')
    .service({
        BrandShopsService: ['AEMData', '$q', brandShopsService]
    });

/*
 * brandShopsService
 *
 * @description: returns brands shops data from AEM
 *
 * @usage:
 *  - getData: promise returns brands list
 *  - getBrand: promise returns one brand in brands list
 *  - getBrandItems: function return a brand details
 */

function brandShopsService(AEMData, $q) {

    function getData () {
        return AEMData.refreshBrands();
    }

    function getBrandSliderAssets (brand) {
        return AEMData.getBrandSliderAssets(brand);
    }

    function getBrand (name) {
        var deferred = $q.defer();

        getData()
            .then(function(data) {
                deferred.resolve(filterBrands(name, data));
            })
            .catch(deferred.reject);

        return deferred.promise;
    }

    function getBrandItems (brand) {
        return AEMData.getBrandItems(brand);
    }

    function filterBrands (name, list) {
        return _.find(list, {
            pageName: name
        });
    }

    return {
        getBrand: getBrand,
        getBrandSliderAssets: getBrandSliderAssets,
        getBrandItems: getBrandItems
    };

}
