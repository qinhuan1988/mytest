angular.module('webapp.aem').service({
    AEMData: ['$http', '$q', '$rootScope', 'ENV_SETTING', 'LocaleService', AEMData]
});


function AEMData($http, $q, $rootScope, ENV_SETTING, localeService) {

    // Digital Assets Manager of AEM link
    var DAMPath = ENV_SETTING.aemDomain + ENV_SETTING.aemDam;

    // benefits
    var benefits = [];
    // levels
    var levels = [];
    // brand shops
    var brands = [];
    // offers
    var offers = [];
    // selected brand
    var selectedBrand = {};

    // lang

    var lang = localeService.getLang;

    // service object

    var AEMData = {
        refreshBenefits: refreshBenefits,
        getBenefits: getBenefits,
        refreshLevels: refreshLevels,
        getLevels: getLevels,
        refreshBrands: refreshBrands,
        getBrands: getBrands,
        getBrandSliderAssets: getBrandSliderAssets,
        getBrandItems: getBrandItems,
        selectBrand: selectBrand,
        getSelectedBrand: getSelectedBrand,
        refreshOffersList: refreshOffersList
    };

    return AEMData;

    // Setters & Getters

    // return benefits

    function getBenefits() {
        return benefits;
    }

    // return levels

    function getLevels() {
        return levels;
    }

    // return brands

    function getBrands() {
        return brands;
    }

    // set brand

    function selectBrand(brand) {
        selectedBrand = brand;
    }

    // get brand

    function getSelectedBrand() {
        return selectedBrand;
    }


    // refresh levels

    function refreshLevels() {
        var deferred = $q.defer();
        var url = ENV_SETTING.aemDomain;
        // Content node path
        url += '/content/BMW-Loyalty/' + lang() + '/levels/';
        url += '.6.json';
        $rootScope.loading++;
        $http({
            url: url,
            dataType: 'json',
            method: 'GET'
        }).then(function(result) {
            levels = updateLevelsList(result.data);
            deferred.resolve(levels);
        }).finally(function() {
            $rootScope.loading--;
        });
        return deferred.promise;
    }

    // modeling levels objects

    function updateLevelsList(data) {
        var list = [];
        angular.forEach(data, function(node, index) {
            if (node['jcr:content'] && node['jcr:content']['cq:template'] === '/apps/bmwLP/templates/levels_template') {
                var level = {
                    name: node['jcr:content']['levels_name']['jcr:name'],
                    imageLink: ENV_SETTING.aemDomain + '/content/BMW-Loyalty/' + lang() + '/levels/' + index + '/jcr:content/levels_card_image/image/file',
                    colorCode: returnNodeIfExists(node, 'jcr:content', 'levels_card_image', 'image', 'jcr:description'),
                    desc: node['jcr:content']['levels_desc']['jcr:description'],
                    points: node['jcr:content']['levels_points']['jcr:points'],
                    label: index
                };
                if (!!node['jcr:content']['levels_card_image']['image']['fileReference']) {
                    level.imageLink = ENV_SETTING.aemDomain + node['jcr:content']['levels_card_image']['image']['fileReference'];
                }
                list.push(level);
            }
        });
        return list;
    }

    // refresh benefits

    function refreshBenefits() {
        var deferred = $q.defer();
        var url = ENV_SETTING.aemDomain;
        // Content node path
        url += '/content/BMW-Loyalty/' + lang() + '/benefits/';
        url += '.3.json';
        $rootScope.loading++;
        $http({
            url: url,
            dataType: 'json',
            method: 'GET'
        }).then(function(result) {
            benefits = updateBenefitsList(result.data);
            deferred.resolve(benefits);
        }).finally(function() {
            $rootScope.loading--;
        });
        return deferred.promise;
    }

    // modeling benefits objects

    function updateBenefitsList(data) {
        var list = [];
        angular.forEach(data, function(node) {
            if (node['jcr:content'] && node['jcr:content']['cq:template'] === '/apps/bmwLP/templates/benefits_template') {
                var benefit = {
                    name: node['jcr:content']['benefits_name']['jcr:name'],
                    desc: node['jcr:content']['benefits_desc']['jcr:description'],
                    levels: node['jcr:content']['benefits_levels']['jcr:levels']
                };
                benefit.levels = benefit.levels.split(',');
                list.push(benefit);
            }
        });
        return list;
    }

    // refresh brands

    function refreshBrands() {
        var deferred = $q.defer();
        var url = ENV_SETTING.aemDomain;
        // Content node path
        url += '/content/BMW-Loyalty/' + lang() + '/partners/';
        url += '.-1.json';
        $rootScope.loading++;
        $http({
            url: url,
            dataType: 'json',
            method: 'GET'
        }).then(function(result) {
            brands = updateBrandsList(result.data);
            deferred.resolve(brands);
        }).finally(function() {
            $rootScope.loading--;
        });
        return deferred.promise;
    }

    // modeling brands objects

    function updateBrandsList(data) {
        var list = [];
        angular.forEach(data, function(node, index) {
            addBrandToList(list, node, index);
        });
        list = _.sortBy(list, 'rank');
        return list;
    }

    // model a brand object and add it to a list

    function addBrandToList(list, node, index) {
        if (node['jcr:content'] && node['jcr:content']['cq:template'] === '/apps/bmwLP/templates/partners_template') {
            if (!node['jcr:content']['partner_title'] || !node['jcr:content']['partner_title']['jcr:title'] ||
                !node['jcr:content']['partner_small_desc'] || !node['jcr:content']['partner_small_desc']['jcr:description']) {
                return;
            }
            var brand = {
                pageName: index,
                title: node['jcr:content']['partner_title']['jcr:title'],
                imageLink: ENV_SETTING.aemDomain + '/content/BMW-Loyalty/' + lang() + '/partners/' + index + '/jcr:content/partner_image/image/file',
                smallDesc: node['jcr:content']['partner_small_desc']['jcr:description'],
                rank: !!node['jcr:content']['partner_rank'] ? node['jcr:content']['partner_rank']['jcr:rank'] : "9999",
                nodeData: node
            };
            if (!!node['jcr:content']['partner_image']['image']['fileReference']) {
                brand.imageLink = ENV_SETTING.aemDomain + node['jcr:content']['partner_image']['image']['fileReference'];
            }
            list.push(brand);
        }
    }

    // get brand slider assets

    function getBrandSliderAssets(brand) {
        var title = brand['nodeData']['jcr:content']['jcr:title'];
        var deferred = $q.defer();
        var url = ENV_SETTING.aemDomain;
        // Content node path
        url += '/content/dam/bmw-loyalty/brandshops/' + title + '/slider/';
        url += '.-1.json';
        $rootScope.loading++;
        $http({
            url: url,
            dataType: 'json',
            method: 'GET'
        }).then(function(result) {
            var assetsArray = [];
            angular.forEach(result.data, function(obj, index) {
                if (obj['jcr:primaryType'] && obj['jcr:primaryType'] === "dam:Asset") {
                    var asset = {
                        img: ENV_SETTING.aemDomain + '/content/dam/bmw-loyalty/brandshops/' + title + '/slider/' + index,
                        link: obj['jcr:content']['metadata']['dc:contributor']
                    };
                    assetsArray.push(asset);
                }
            });
            deferred.resolve(assetsArray);
        }).finally(function() {
            $rootScope.loading--;
        });
        return deferred.promise;
    }

    // get brand items

    function getBrandItems(brand) {
        var items = [];
        var nodeData = brand.nodeData;
        var brandName = nodeData['jcr:content']['jcr:title'];
        angular.forEach(nodeData, function(item, index) {
            addBrandItemToList(items, brandName, item, index);
        });
        items = _.sortBy(items, 'rank');
        return items;
    }

    // remodel item object and add it to list of items

    function addBrandItemToList(list, brandName, item, index) {
        if (item['jcr:primaryType'] && item['jcr:primaryType'] === "cq:Page") {
            if (!item['jcr:content'] ||
                !item['jcr:content']['partner_title'] || !item['jcr:content']['partner_title']['jcr:title'] ||
                !item['jcr:content']['partner_small_desc'] || !item['jcr:content']['partner_small_desc']['jcr:description'] ||
                !item['jcr:content']['partner_link'] || !item['jcr:content']['partner_link']['jcr:link']) {
                return;
            }
            var itemInfo = {
                title: item['jcr:content']['partner_title']['jcr:title'],
                smallDesc: item['jcr:content']['partner_small_desc']['jcr:description'],
                imageLink: ENV_SETTING.aemDomain + '/content/BMW-Loyalty/en/partners/' + brandName + '/' + index + '/jcr:content/partner_image/image/file',
                externalLink: item['jcr:content']['partner_link']['jcr:link'],
                rank: !!item['jcr:content']['partner_rank'] ? item['jcr:content']['partner_rank']['jcr:rank'] : "9999"
            };
            if (!!item['jcr:content']['partner_image']['image']['fileReference']) {
                itemInfo.imageLink = ENV_SETTING.aemDomain + item['jcr:content']['partner_image']['image']['fileReference'];
            }
            list.push(itemInfo);
        }
    }

    // refresh the list of the offers

    function refreshOffersList() {
        var deferred = $q.defer();
        var url = ENV_SETTING.aemDomain;
        // content node path
        url += '/content/BMW-Loyalty/' + lang() + '/offers/';
        url += '.-1.json';
        $rootScope.loading++;
        $http({
            url: url,
            dataType: 'json',
            method: 'GET'
        }).then(function(result) {
            offers = updateOffersList(result.data);
            deferred.resolve(offers);
        }).finally(function() {
            $rootScope.loading--;
        });
        return deferred.promise;
    }

    // update offers list

    function updateOffersList(data) {
        // init list
        var list = [];
        // getting content path for offers images according to the language
        var contentPath = getContentPath();
        // remodeling data from AEM
        angular.forEach(data, function(node, index) {
            if (node['jcr:content'] && node['jcr:content']['offer_details']) {
                // getting partner code
                var AEM_partnerCode = returnNodeIfExists(node, 'jcr:content', 'offer_details', 'jcr:partner_code') || 'bmw';
                // offer info
                var offerInfo = {
                    AEM_image: contentPath + '/offers/' + index + '/_jcr_content/image/image.img.png/',
                    AEM_partnerLogo: DAMPath + '/partners/' + AEM_partnerCode.toString().toLowerCase() + '.png',
                    AEM_partnerName: returnNodeIfExists(node, 'jcr:content', 'offer_details', 'jcr:partner_name'),
                    AEM_shortDesc: returnNodeIfExists(node, 'jcr:content', 'offer_details', 'jcr:short_desc'),
                    AEM_desc: returnNodeIfExists(node, 'jcr:content', 'text', 'text'),
                    AEM_name: returnNodeIfExists(node, 'jcr:content', 'offer_details', 'jcr:voucher_name')
                };
                list[index] = offerInfo;
            }
        });
        return list;
    }

    // get content path according to the language

    function getContentPath() {
        var contentPath = ENV_SETTING.aemDomain;
        if (lang() === 'zh') {
            contentPath += ENV_SETTING.aemContentZh;
        } else {
            contentPath += ENV_SETTING.aemContentEn;
        }
        return contentPath;
    }

    // return the node if it exists

    function returnNodeIfExists() {
        // getting number of arguments
        var n = arguments.length;
        if (n === 0) {
            return;
        }
        // getting the node
        var data = arguments[0];
        try {
            if (n === 1) {
                return data;
            } else {
                // looping through the node childs
                for (var i = 1; i < n; i++) {
                    data = data[arguments[i]];
                }
                return data;
            }
        } catch (e) {
            // display the error.....
            console.info(e);
            return '';
        }
    }



}
