angular.module('webapp.offers').service({
    OffersService: ['aem', 'api', '$q', '$state', 'MemberInfoService', 'gettextCatalog', 'ExternalLinksService', 'DialogService', 'AEMData', '$rootScope', offersService]
});

function offersService(aem, api, $q, $state, memberInfoService, gettextCatalog, externalLinksService, dialogService, AEMData, $rootScope) {

    // offers list array

    var allOffersList = [];
    var favoritesList = [];
    var dateAscList = [];
    var promotionsList = [];

    // single offer info

    var singleOfferInfo = {};

    // total communicated Value

    var totalCommunicatedValue = {
        'allOffers': 0,
        'favorites': 0,
        'dateAsc': 0
    };

    // offers Filters

    var offersFilterObj = {
        'allOffers': {
            sortField: 'benefitPublishDate',
            sortDirection: 'desc'
        },
        'favorites': {
            voucherCategory: 'F',
            sortField: 'benefitPublishDate',
            sortDirection: 'desc'
        },
        'dateAsc': {
            sortField: 'expiryDate',
            sortDirection: 'asc'
        },
        'promotions': {
            sortField: 'benefitTypeCode'
        }
    };

    // member ship ID

    var membershipId = memberInfoService.getMemberInfo().membershipId;

    var offersService = {
        refreshAllOffers: refreshAllOffers,
        refreshFavorites: refreshFavorites,
        refreshDateAsc: refreshDateAsc,
        getTotalCommunicatedValue: getTotalCommunicatedValue,
        setCurrentOfferInfo: setCurrentOfferInfo,
        getOfferById: getOfferById,
        getCurrentOfferInfo: getCurrentOfferInfo,
        restructureOffers: restructureOffers,
        deleteOfferFromList: deleteOfferFromList,
        updateOfferFromList: updateOfferFromList,
        canOfferBeGrabbed: canOfferBeGrabbed,
        getVoucherOptions: getVoucherOptions,
        extendOfferInfo: extendOfferInfo
    };

    return offersService;

    function extendOfferInfo(offer) {
        var deferred = $q.defer();
        aem.getOfferDetails(offer.itemId)
            .then(function(result) {
                offer.partnerCode = result.data['jcr:partner_code'];
                offer.partnerName = result.data['jcr:partner_name'];
                offer.shortDesc = result.data['jcr:short_desc'];
                offer.partnerImgUrl = aem.getPartnerImgUrl(offer.partnerCode);
                if (result.data['jcr:voucher_name'] && result.data['jcr:voucher_name'] !== '') {
                    offer.itemName = result.data['jcr:voucher_name'];
                }
                offer.imgUrl = aem.getOfferImgUrl(offer.itemId);
                deferred.resolve(offer);
            })
            .catch(deferred.reject);
        return deferred.promise;
    }
    // return list of offers

    function getAllOffers() {
        return allOffersList;
    }

    function getFavorites() {
        return favoritesList;
    }

    function getDateAsc() {
        return dateAscList;
    }

    function getPromotions() {
        return promotionsList;
    }

    // set current offer info

    function setCurrentOfferInfo(info) {
        singleOfferInfo = info;
    }

    // get current offer info

    function getCurrentOfferInfo() {
        return singleOfferInfo;
    }

    // return total communicated value

    function getTotalCommunicatedValue() {
        return totalCommunicatedValue;
    }


    //////////////////////////////////////////////////////////
    // remodeling offers according to the offer category /////
    //////////////////////////////////////////////////////////


    function restructureOffers(list) {
        angular.forEach(list, function(offer) {
            switch (offer.benefitTypeCode) {
                case 'B_1001': // Benefit Voucher
                    offer.itemId = offer.voucherId;
                    offer.itemName = offer.voucherName;
                    break;
                case 'B_1002': // Event
                    offer.itemId = offer.eventId;
                    offer.itemName = offer.benefitName;
                    break;
                case 'V_1003': // Independent Voucher / Redemption voucher
                    offer.itemId = offer.voucherId;
                    offer.itemName = offer.voucherName;
                    break;
                case 'V_1006': // Item linked - Promotion voucher
                    offer.itemId = offer.voucherId;
                    offer.itemName = offer.voucherName;
                    break;
                case 'V_1007': // Partner Voucher / Promotion voucher
                    offer.itemId = offer.voucherId;
                    offer.itemName = offer.voucherName;
                    break;
                default:
                    break;
            }
        });
        return list;
    }



    //////////////////////////////////////////
    //////// Refresh the list of all offers //
    //////////////////////////////////////////


    function refreshAllOffers() {
        var deferred = $q.defer();
        resetOffersFilterObj();
        api.getAllBenefits(offersFilterObj.allOffers).then(function(result) {
            var benefitsELS = restructureOffers(result.benefitDetails);
            // set total communicated value
            totalCommunicatedValue.allOffers = result.totalCommunicatedValue;
            // getting assets from AEM
            AEMData.refreshOffersList().then(function(benefitsAEM) {
                var list = extendBenefitsData(benefitsELS, benefitsAEM);
                deferred.resolve(list);
            });
        });
        return deferred.promise;
    }


    //////////////////////////////////////////
    // refresh the list of favorites /////////
    //////////////////////////////////////////


    function refreshFavorites() {
        var deferred = $q.defer();
        resetOffersFilterObj();
        api.getAllBenefits(offersFilterObj.favorites).then(function(result) {
            var benefitsELS = restructureOffers(result.benefitDetails);
            // set total communicated value
            totalCommunicatedValue.allOffers = result.totalCommunicatedValue;
            // getting assets from AEM
            AEMData.refreshOffersList().then(function(benefitsAEM) {
                var list = extendBenefitsData(benefitsELS, benefitsAEM);
                deferred.resolve(list);
            });
        });
        return deferred.promise;
    }

    //////////////////////////////////////////
    // refresh the list of offers date asc ///
    //////////////////////////////////////////

    function refreshDateAsc() {
        var deferred = $q.defer();
        resetOffersFilterObj();
        api.getAllBenefits(offersFilterObj.dateAsc).then(function(result) {
            var benefitsELS = restructureOffers(result.benefitDetails);
            // set total communicated value
            totalCommunicatedValue.allOffers = result.totalCommunicatedValue;
            // getting assets from AEM
            AEMData.refreshOffersList().then(function(benefitsAEM) {
                var list = extendBenefitsData(benefitsELS, benefitsAEM);
                deferred.resolve(list);
            });
        });
        return deferred.promise;
    }

    //////////////////////////////////////////
    // extend benefits info with AEM assets //
    //////////////////////////////////////////


    function extendBenefitsData(benefitsELS, benefitsAEM) {
        var list = [];
        angular.forEach(benefitsELS, function(benefit) {
            if (benefitsAEM[benefit.itemId]) {
                var newBenefit = _.defaults(benefit, benefitsAEM[benefit.itemId]);
                // attaching options to the voucher
                newBenefit.options = getVoucherOptions(newBenefit);
                list.push(newBenefit);
            }
        });
        return list;
    }

    //////////////////////////////////////////
    // get one offer by voucher id ///////////
    //////////////////////////////////////////

    function getOfferById(voucherId) {
        return api.getAllBenefits({
            voucherId: voucherId
        });
    }


    ///////////////////////////////////////////////////////
    /// Delete offer from list ////////////////////////////
    ///////////////////////////////////////////////////////


    function deleteOfferFromList(offer, list) {
        var index = list.indexOf(offer);
        list.splice(index, 1);
    }


    ///////////////////////////////////////////////////////
    /// Reset filter objects //////////////////////////////
    ///////////////////////////////////////////////////////


    function resetOffersFilterObj() {
        offersFilterObj = {
            'allOffers': {
                sortField: 'benefitPublishDate',
                sortDirection: 'desc'
            },
            'favorites': {
                voucherCategory: 'F',
                sortField: 'benefitPublishDate',
                sortDirection: 'desc'
            },
            'dateAsc': {
                sortField: 'expiryDate',
                sortDirection: 'asc'
            },
            'promotion': {
                sortField: 'benefitTypeCode'
            }
        };
    }

    function updateOfferFromList(offer, list) {
        var offerIndex = _.indexOf(list, offer);
        if (offerIndex > -1) {
            list[offerIndex] = offer;
        }
    }

    ///////////////////////////////////////////////////////
    /// Check if voucher can be grabbed
    /// right now B_1001 & V_1007 can be grabbed
    /// But going forward and in Sprint 10, even V_1003 will also be grabbed
    ///////////////////////////////////////////////////////

    function canOfferBeGrabbed(offer) {
        var canBeGrabbedArray = ['B_1001', 'V_1007', 'V_1003'];
        if ( _.includes(canBeGrabbedArray, offer.benefitTypeCode) &&
            offer.limitLeft > 0) {
            return true;
        } else {
            return false;
        }
    }

    ///////////////////////////////////////////////////////
    /// Get voucher options for power press menu //////////
    ///////////////////////////////////////////////////////


    function getVoucherOptions(voucher) {

        var options = [];

        // use/grab offer option

        if (canOfferBeGrabbed(voucher)) {
            options.push({
                action: function() {
                    var postObj = {
                        action: 'UB',
                        voucherId: voucher.voucherId,
                        eventId: voucher.eventId,
                        membershipId: membershipId
                    };
                    api.getStatusBenefit(postObj).then(function(result) {
                        // update voucher with latest status from API response
                        if (result.benefitDetails[0]) {
                            Object.assign(voucher, result.benefitDetails[0]);
                            $rootScope.$broadcast('voucher:updated');
                        }
                    });
                },

                info: {
                    action: 'UB',
                    successNotification: gettextCatalog.getString('Successfully added to My Coupons'),
                    errorNotification: '',
                    name: gettextCatalog.getString('grab voucher')
                },

                cssClass: 'powerpress__grab',
                pos: null
            });
        }

        // add to favorite option

        if (voucher.isFavorite === 'N') {
            options.push({
                action: function() {
                    var postObj = {
                        action: 'FB',
                        voucherId: voucher.voucherId,
                        eventId: voucher.eventId,
                        membershipId: membershipId
                    };
                    api.getStatusBenefit(postObj).then(function(result) {
                        // update voucher with latest status from API response
                        if (result.benefitDetails[0]) {
                            Object.assign(voucher, result.benefitDetails[0]);
                            $rootScope.$broadcast('voucher:updated');
                        }
                    });
                },
                info: {
                    action: 'FB',
                    successNotification: gettextCatalog.getString('Successfully added to My Favourites'),
                    errorNotification: '',
                    name: gettextCatalog.getString('favorite voucher')
                },
                cssClass: 'powerpress__fav',
                pos: null
            });

            // delete from favorites option

        } else if (voucher.isFavorite === 'Y') {
            options.push({
                action: function() {
                    var postObj = {
                        action: 'UFB',
                        voucherId: voucher.voucherId,
                        eventId: voucher.eventId,
                        membershipId: membershipId
                    };
                    api.getStatusBenefit(postObj).then(function(result) {
                        // update voucher with latest status from API response
                        if (result.benefitDetails[0]) {
                            Object.assign(voucher, result.benefitDetails[0]);
                            $rootScope.$broadcast('voucher:updated');
                        }
                    });
                },
                info: {
                    action: 'UFB',
                    successNotification: gettextCatalog.getString('Successfully deleted for My Favourites'),
                    errorNotification: '',
                    name: gettextCatalog.getString('unfavorite voucher')
                },
                cssClass: 'powerpress__unfav',
                pos: null
            });
        }

        // call option

        if (voucher.mobileNo !== '') {
            options.push({
                action: function() {
                    var msg = gettextCatalog.getString('Please dial our 7x24 customer service hotline:') + voucher.mobileNo;
                    var sucessCallback = function() {
                        externalLinksService.callPhone(voucher.mobileNo);
                    };
                    dialogService.confirmCallPopup(msg, sucessCallback);
                },
                info: {
                    action: 'call',
                    successNotification: '',
                    errorNotification: '',
                    name: gettextCatalog.getString('call customer service')
                },
                cssClass: 'powerpress__call',
                pos: ''
            });
        }

        return options;

    }


}
