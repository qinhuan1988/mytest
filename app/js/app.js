try {
    angular.module('webapp.template');
} catch (e) {
    angular.module('webapp.template', []);
}

angular.module('webapp', [
        'restangular',
        'ionic',
        'gettext',
        'tmh.dynamicLocale',
        'monospaced.qrcode',
        'webapp.template',
        'webapp.config',
        'webapp.envConfig',
        'webapp.common',
        'webapp.api',
        'webapp.aem',
        'webapp.externalLinks',
        'webapp.memberInfo',
        'webapp.home',
        'webapp.login',
        'webapp.dash',
        'webapp.offers',
        'webapp.dealers',
        'webapp.brandShops',
        'webapp.vehicles',
        'webapp.landingPages',
        'webapp.overview',
        'webapp.chat',
        'webapp.activity',
        'webapp.claimPoints',
        'webapp.partners',
        'webapp.benefits',
        'webapp.roadAssistance',
        'webapp.myWallet',
        'webapp.transactionHistory',
        'webapp.transHistoryInfo',
        'webapp.changePaymentMethod',
        'webapp.quickPaymentPassword',
        'webapp.paymentMethod',
        'webapp.bankcard',
        'webapp.giftcard',
        'webapp.myProfile',
        'webapp.addCreditCard',
        'webapp.settings',
        'webapp.addCard',
        'webapp.about',
        'webapp.registration',
        'webapp.registration.step1',
        'webapp.registration.step2',
        'webapp.registration.step3',
        'webapp.registration.step4',
        'webapp.registration.step5',
        'webapp.registration.carlist',
        'webapp.registration.congratulationMsg',
        'webapp.requestOTP',
        'webapp.forgetPassword',
        'webapp.changePassword',
        'webapp.faq'
    ])
    .config(['$compileProvider', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$sceDelegateProvider', 'ENV_SETTING',
        function($compileProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider, ENV_SETTING) {

            $ionicConfigProvider.views.swipeBackEnabled(true);
            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.tabs.style('standard');
            $ionicConfigProvider.navBar.alignTitle('center');

            if ( !ENV_SETTING.DEBUG ) {
                $compileProvider.debugInfoEnabled(false);
            }

            $urlRouterProvider.otherwise('/');
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                ENV_SETTING.aemDomain + '/**',
                'https://ichatplatform.bmw.com.cn/**',
                'https://h5vco.bmw.com.cn/**',
                'http://tool.ccb.com/**',
                'http://origin-cmscn-int.bmwgroup.com/**',
                'http://cmscn-int.bmwgroup.com/**',
                'http://bmwcn-loyaltyaem-publish-01-dev.bmw.mcon.net/**',
                'https://pchatplatform.bmw.com.cn/**',
                'http://www.bmw.com.cn/**',
                'http://bmwusedcar.bmw.com.cn/**',
                'http://emall.bmw.com.cn/portal/bmwnc/index.html',
                'http://www.minichina.com.cn/**',
                'http://m.bmw-motorrad.com.cn/**',
                'http://emall.minichina.com.cn/**',
                'http://usedcar.minichina.com.cn/**'
            ]);


            $stateProvider

                .state('home', {
                url: '/',
                templateUrl: 'js/modules/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })

            // enrollment

            .state('registration', {
                url: '',
                abstract: true,
                controller: 'RegistrationCtrl',
                controllerAs: 'registration',
                templateUrl: 'js/modules/registration/registration.html',
            })

            .state('registration.step1', {
                    url: '/step1',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/step1.html',
                            controller: 'Step1Ctrl',
                            controllerAs: 'registrationStep1'
                        }
                    }
                })
                .state('registration.step2', {
                    url: '/step2',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/step2.html',
                            controller: 'Step2Ctrl',
                            controllerAs: 'registrationStep2'
                        }
                    }
                })
                .state('registration.step3', {
                    url: '/step3',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/step3.html',
                            controller: 'Step3Ctrl',
                            controllerAs: 'registrationStep3'
                        }
                    }
                })
                .state('registration.step4', {
                    url: '/step4',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/step4.html',
                            controller: 'Step4Ctrl',
                            controllerAs: 'registrationStep4'
                        }
                    }
                })
                .state('registration.step5', {
                    url: '/step5',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/step5.html',
                            controller: 'Step5Ctrl',
                            controllerAs: 'registrationStep5'
                        }
                    }
                })
                .state('registration.carlist', {
                    url: '/carlist',
                    views: {
                        'registration': {
                            templateUrl: 'js/modules/registration/templates/BMWOwnerCarList.html',
                            controller: 'CarListCtrl',
                            controllerAs: 'registrationCarList'
                        }
                    }
                })
                .state('registration.addNewCar', {

                    url: '/addNewCar',
                    views: {
                        'registration': {
	                            templateUrl: 'js/modules/registration/templates/addCar.html',
                            controller: 'AddVehicleCtrl',
                            controllerAs: 'addVehicle'
                        }
                    }
                })
                .state('forgetPasswordStep1', {
                    url: '/fpStep1',
                    controller: 'ForgetPasswordStep1Ctrl',
                    controllerAs: 'forgetPassword',
                    templateUrl: 'js/modules/forgetPassword/step1.html'
                })
                .state('forgetPasswordStep2', {
                    url: '/fpStep2',
                    cache: false,
                    controller: 'ForgetPasswordStep2Ctrl',
                    controllerAs: 'newpasswordCreation',
                    templateUrl: 'js/modules/forgetPassword/step2.html'
                })

            // requestOTP
            .state('requestOTP', {
                url: '/requestOTP',
                cache: false,
                controller: 'RequestOTPCtrl',
                controllerAs: 'requestOTP',
                templateUrl: 'js/modules/requestOTP/requestOTP.html'
            })


            .state('login', {
                url: '/login',
                cache: false,
                controller: 'LoginCtrl',
                controllerAs: 'login',
                templateUrl: 'js/modules/login/login.html'
            })


            // dashboard
            .state('dash', {
                url: '/dash',
                abstract: true,
                cache: false,
                controller: 'DashCtrl',
                controllerAs: 'dash',
                templateUrl: 'js/modules/dash/dash.html'
            })

            .state('dash.mobilityServices', {
                url: '/mobilityServices',
                cache: false,
                views: {
                    'dash': {
                        controller: 'MobilityServicesCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'js/modules/mobilityServices/mobility-services.html'
                    }
                }
            })

            .state('dash.faq', {
                url: '/faq',
                cache: false,
                views: {
                    'dash': {
                        controller: 'FaqCtrl',
                        controllerAs: 'faq',
                        templateUrl: 'js/modules/faq/faq.html'
                    }
                }
            })

            .state('dash.overview', {
                url: '/overview',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/overview/overview.html',
                        controller: 'OverviewCtrl',
                        controllerAs: 'overview'
                    }
                }
            })

            .state('dash.chat', {
                url: '/chat/:isNewUser/:openKeyboard',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/chats/templates/chat.html',
                        controller: 'ChatCtrl',
                        controllerAs: 'chat'
                    }
                }
            })

            .state('dash.myProfile', {
                    url: '/myProfile',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/myProfile.html',
                            controller: 'MyProfileCtrl',
                            controllerAs: 'myProfile'
                        }
                    }
                })
                .state('dash.myAddress', {
                    url: '/address',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/address.html',
                            controller: 'MyAddressCtrl',
                            controllerAs: 'myAddress'
                        }
                    }
                })
                .state('dash.myProvince', {
                    url: '/province',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/province.html',
                            controller: 'MyProvinceCtrl',
                            controllerAs: 'myProvince'
                        }
                    }
                })
                .state('dash.myCity', {
                    url: '/city',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/city.html',
                            controller: 'MyCityCtrl',
                            controllerAs: 'myCity'
                        }
                    }
                })
                .state('dash.myPostCode', {
                    url: '/postcode',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/postcode.html',
                            controller: 'MyPostCodeCtrl',
                            controllerAs: 'myPostCode'
                        }
                    }
                })
                .state('dash.myPreferredContact', {
                    url: '/preferredContact',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/preferredContact.html',
                            controller: 'MyPreferredModeCtrl',
                            controllerAs: 'myPreferredContact'
                        }
                    }
                })
                .state('dash.myEmail', {
                    url: '/email',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/email.html',
                            controller: 'EmailCtrl',
                            controllerAs: 'email'
                        }
                    }
                })
                .state('dash.myIDType', {
                    url: '/IDType',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/IDType.html',
                            controller: 'MyIDTypeCtrl',
                            controllerAs: 'myIDType'
                        }
                    }
                })
                .state('dash.myIDNumber', {
                    url: '/IDNumber',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/IDNumber.html',
                            controller: 'MyIDNumberCtrl',
                            controllerAs: 'myIdNumber'
                        }
                    }
                })
                .state('dash.myPassport', {
                    url: '/myPassport',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myProfile/passportNumber.html',
                            controller: 'MyPassportNumberCtrl',
                            controllerAs: 'myPassportNumber'
                        }
                    }
                })

            .state('dash.creditCard', {
                    url: '/creditCard',
                    cache: false,
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/addCreditCard.html',
                            controller: 'AddCreditCardCtrl',
                            controllerAs: 'creditCard'
                        }
                    }
                })
                .state('dash.myAppid', {
                    url: '/appid',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/appid.html',
                            controller: 'AppIdCtrl',
                            controllerAs: 'appid'
                        }
                    }
                })
                .state('dash.myName', {
                    url: '/name',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/name.html',
                            controller: 'MyNameCtrl',
                            controllerAs: 'name'
                        }
                    }
                })
                .state('dash.myNamePinyin', {
                    url: '/namePinyin',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/namePinyin.html',
                            controller: 'MyNamePinyinCtrl',
                            controllerAs: 'namePinyin'
                        }
                    }
                })

            .state('dash.myIDtype', {
                    url: '/IDtype',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/IDtype.html',
                            controller: 'MyIDtypeCtrl',
                            controllerAs: 'myIDtype'
                        }
                    }
                })
                .state('dash.myIDnumber', {
                    url: '/IDNumber',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/IDnumber.html',
                            controller: 'MyIDnumberCtrl',
                            controllerAs: 'myIdnumber'
                        }
                    }
                })
                .state('dash.myPassportNo', {
                    url: '/myPassportNo',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/passportNumber.html',
                            controller: 'MyPassportnumberCtrl',
                            controllerAs: 'myPassportnumber'
                        }
                    }
                })
                .state('dash.myIDvalidity', {
                    url: '/myIDvalidity',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/IDvalidity.html',
                            controller: 'MyIDValidityCtrl',
                            controllerAs: 'myIDvalidity'
                        }
                    }
                })
                .state('dash.myIdDate', {
                    url: '/myIdDate',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/myIdDate.html',
                            controller: 'MyIDDateCtrl',
                            controllerAs: 'myIdDate'
                        }
                    }
                })
                .state('dash.myGender', {
                    url: '/gender',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/gender.html',
                            controller: 'MyGenderCtrl',
                            controllerAs: 'genderInfo'
                        }
                    }
                })
                .state('dash.myPhone', {
                    url: '/phone',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/phone.html',
                            controller: 'MyPhoneCtrl',
                            controllerAs: 'phone'
                        }
                    }
                })
                .state('dash.myDOB', {
                    url: '/mydob',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/giftCards/templates/dateofbirth.html',
                            controller: 'MyDOBCtrl',
                            controllerAs: 'mydob'
                        }
                    }
                })

            .state('dash.myRegion', {
                url: '/region',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/templates/region.html',
                        controller: 'MyRegionCtrl',
                        controllerAs: 'myRegion'
                    }
                }
            })

            .state('dash.cardType', {
                url: '/cardType',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/templates/cardType.html',
                        controller: 'MyCardTypeCtrl',
                        controllerAs: 'cardType'
                    }
                }
            })

            .state('dash.changePassword', {
                url: '/changePassword',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/changePassword/changePassword.html',
                        controller: 'ChangePasswordCtrl',
                        controllerAs: 'changePassword'
                    }
                }

            })


            .state('dash.dealers', {
                url: '/dealers',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/dealers.html',
                        controller: 'DealersCtrl',
                        controllerAs: 'dealers'
                    }
                }
            })

            .state('dash.vehicles', {
                url: '/vehicles',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/vehicles/templates/vehicles.html',
                        controller: 'VehiclesCtrl',
                        controllerAs: 'vehicles'
                    }
                }
            })

            .state('dash.addVehicle', {
                url: '/addVehicle',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/vehicles/templates/addVehicle.html',
                        controller: 'AddVehicleCtrl',
                        controllerAs: 'addVehicle'
                    }
                }
            })
            .state('dash.addVehicleProof', {
                url: '/addVehicleProof/{vin}',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/vehicles/templates/addVehicleProof.html',
                        controller: 'AddVehicleProofCtrl',
                        controllerAs: 'addVehicleProof'
                    }
                }
            })

            .state('dash.offers', {
                url: '/offers',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/offers/templates/offers.html',
                        controller: 'OffersCtrl',
                        controllerAs: 'offers'
                    }
                }
            })

            .state('dash.offerInfo', {
                url: '/offerInfo/{offerId}/:isFavorite',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/offers/templates/offerInfo.html',
                        controller: 'OfferInfoCtrl',
                        controllerAs: 'offerInfo'
                    }
                }
            })

            .state('dash.coupons', {
                url: '/coupons',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/offers/templates/coupons.html',
                        controller: 'CouponsCtrl',
                        controllerAs: 'coupons'
                    }
                }
            })

            .state('dash.couponInfo', {
                url: '/couponInfo/{voucherId}',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/offers/templates/couponInfo.html',
                        controller: 'CouponInfoCtrl',
                        controllerAs: 'couponInfo'
                    }
                }
            })


            .state('dash.favorites', {
                url: '/favorites',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/offers/templates/favorites.html',
                        controller: 'FavoritesCtrl',
                        controllerAs: 'favorites'
                    }
                }
            })

            .state('dash.activity', {
                url: '/activity',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/activity/activity.html',
                        controller: 'ActivityCtrl',
                        controllerAs: 'activity'
                    }
                }
            })

            .state('dash.claimPoints', {
                url: '/claimPoints',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/activity/claimPoints.html',
                        controller: 'ClaimPointsCtrl',
                        controllerAs: 'claimPoints'
                    }
                }
            })

            .state('dash.partners', {
                url: '/partners',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/partners/partners.html',
                        controller: 'PartnersCtrl',
                        controllerAs: 'partners'
                    }
                }
            })


            .state('dash.dealerInfo', {
                url: '/dealerInfo',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/dealerInfo.html',
                        controller: 'DealerInfoCtrl',
                        controllerAs: 'dealerInfo'
                    }
                }
            })

            .state('dash.addCard', {
                url: '/addCard',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/addCard.html',
                        controller: 'AddCardCtrl',
                        controllerAs: 'addCard'
                    }
                }
            })

            .state('dash.about', {
                url: '/about',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/about/about.html',
                        controller: 'AboutCtrl',
                        controllerAs: 'about'
                    }
                }
            })

            .state('dash.addDealer', {
                url: '/addDealer',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/addDealer.html',
                        controller: 'AddDealerCtrl',
                        controllerAs: 'addDealer'
                    }
                }
            })

            .state('dash.dealerPointsDetails', {
                url: '/dealerPointsDetails',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/dealerPointsDetails.html'
                    }
                }
            })


            .state('dash.dealerGroupInfo', {
                url: '/dealerGroupInfo',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/dealerGroupInfo.html',
                        controller: 'DealerGroupInfoCtrl',
                        controllerAs: 'dealerGroupInfo'
                    }
                }
            })


            //Change PIN

            .state('dash.changePinStep1', {
                url: '/changePinStep1',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/changePinStep1.html',
                        controller: 'ChangePinStep1Ctrl',
                        controllerAs: 'changePinStep1'
                    }
                }
            })

            .state('dash.changePinStep2', {
                url: '/changePinStep2',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/changePinStep2.html',
                        controller: 'ChangePinStep2Ctrl',
                        controllerAs: 'changePinStep2'
                    }
                }
            })

            .state('dash.changePinStep3', {
                url: '/changePinStep3',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/changePinStep3.html',
                        controller: 'ChangePinStep3Ctrl',
                        controllerAs: 'changePinStep3'
                    }
                }
            })

            .state('dash.changePinStep4', {
                url: '/changePinStep4',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/changePinStep4.html',
                        controller: 'ChangePinStep4Ctrl',
                        controllerAs: 'changePinStep4'
                    }
                }
            })

            //Replace card

            .state('dash.replaceCardStep1', {
                url: '/replaceCardStep1',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/replaceCardStep1.html',
                        controller: 'ReplaceCardStep1Ctrl',
                        controllerAs: 'replaceCardStep1'
                    }
                }
            })

            //Forgot Pin

            .state('dash.forgotPinStep1', {
                url: '/forgotPinStep1',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/forgotPinStep1.html',
                        controller: 'ForgotPinStep1Ctrl',
                        controllerAs: 'forgotPinStep1'
                    }
                }
            })


            .state('dash.forgotPinStep2', {
                url: '/forgotPinStep2',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/forgotPinStep2.html',
                        controller: 'ForgotPinStep2Ctrl',
                        controllerAs: 'forgotPinStep2'
                    }
                }
            })

            .state('dash.forgotPinStep3', {
                url: '/forgotPinStep3',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/dealers/templates/forgotPinStep3.html',
                        controller: 'ForgotPinStep3Ctrl',
                        controllerAs: 'forgotPinStep3'
                    }

                }
            })

            // My wallet

            .state('dash.myWallet', {
                url: '/myWallet/{from}/',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myWallet/myWallet.html',
                        controller: 'MyWalletCtrl',
                        controllerAs: 'myWallet'
                    }
                }
            })

            .state('dash.transactionHistory', {
                url: '/transactionHistory',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myWallet/transactionHistory.html',
                        controller: 'TransactionHistoryCtrl',
                        controllerAs: 'transactionHistory'
                    }
                }
            })

            .state('dash.transHistoryInfo', {
                url: '/transHistoryInfo',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myWallet/transHistoryInfo.html',
                        controller: 'TransHistoryInfoCtrl',
                        controllerAs: 'transHistoryInfo'
                    }
                }
            })

            .state('dash.changePaymentMethod', {
                url: '/changePaymentMethod',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myWallet/changePaymentMethod.html',
                        controller: 'ChangePaymentMethodCtrl',
                        controllerAs: 'changePaymentMethod'
                    }
                }
            })

            .state('dash.paymentMethod', {
                url: '/paymentMethod',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myBankCard/template/paymentMethod.html',
                        controller: 'PaymentMethodCtrl',
                        controllerAs: 'paymentMethod'
                    }
                }
            })

            .state('dash.quickPaymentPassword', {
                url: '/quickPaymentPassword',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myWallet/quickPaymentPassword.html',
                        controller: 'QuickPaymentPasswordCtrl',
                        controllerAs: 'quickPaymentPassword'
                    }
                }
            })

            .state('dash.bankCardStep1', {
                    url: '/bankCardStep1',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardStep1.html',
                            controller: 'BankCardStep1Ctrl',
                            controllerAs: 'bcStep1'
                        }
                    }
                })
                .state('dash.bankCardStep2', {
                    url: '/bankCardStep2',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardStep2.html',
                            controller: 'BankCardStep2Ctrl',
                            controllerAs: 'bcStep2'
                        }
                    }
                })
                .state('dash.bankCardStep3', {
                    url: '/bankCardStep3',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardStep3.html',
                            controller: 'BankCardStep3Ctrl',
                            controllerAs: 'bcStep3'
                        }
                    }
                })
                .state('dash.bankCardStep4', {
                    url: '/bankCardStep4',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardStep4.html',
                            controller: 'BankCardStep4Ctrl',
                            controllerAs: 'bcStep4'
                        }
                    }
                })

            .state('dash.bankCardStep5', {
                url: '/bankCardStep5',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myBankCard/template/bankCardStep5.html',
                        controller: 'BankCardStep5Ctrl',
                        controllerAs: 'bcStep5'
                    }
                }
            })

            .state('dash.paymentPassword', {
                url: '/paymentPassword',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myBankCard/template/paymentPassword.html',
                        controller: 'PaymentPasswordCtrl',
                        controllerAs: 'paymentPassword'
                    }
                }
            })


            .state('dash.bankCardMultiStep1', {
                    url: '/bankCardMultiStep1',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardMultiStep1.html',
                            controller: 'BankCardMultiStep1Ctrl',
                            controllerAs: 'bcMultiStep1'
                        }
                    }
                })
                .state('dash.bankCardMultiStep2', {
                    url: '/bankCardMultiStep2',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardMultiStep2.html',
                            controller: 'BankCardMultiStep2Ctrl',
                            controllerAs: 'bcMultiStep2'
                        }
                    }
                })
                .state('dash.bankCardMultiStep3', {
                    url: '/bankCardMultiStep3',
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/myBankCard/template/bankCardMultiStep3.html',
                            controller: 'BankCardMultiStep3Ctrl',
                            controllerAs: 'bcMultiStep3'
                        }
                    }
                })


            .state('dash.passwordUnlinkBankCard', {
                url: '/passwordUnlinkBankCard',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/myBankCard/template/paymentPasswordForUnlinkCard.html',
                        controller: 'PasswordUnlinkBankCard',
                        controllerAs: 'passwordUnlinkBankCard'
                    }
                }
            })


            //gift Card
            .state('dash.giftCardStep1', {
                url: '/giftCardStep1',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/giftCardStep1.html',
                        controller: 'GiftCardStep1Ctrl',
                        controllerAs: 'gfStep1'
                    }
                }
            })

            .state('dash.giftCardStep2', {
                url: '/giftCardStep2',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/giftCardStep2.html',
                        controller: 'GiftCardStep2Ctrl',
                        controllerAs: 'gfStep2'
                    }
                }
            })


            .state('dash.passwordUnlinkGiftCard', {
                url: '/passwordUnlinkGiftCard/{number}',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/giftCards/paymentPasswordForUnlinkCard.html',
                        controller: 'PasswordUnlinkGiftCard',
                        controllerAs: 'passwordUnlinkGiftCard'
                    }
                }
            })

            .state('dash.settings', {
                url: '/settings',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/settings.html',
                        controller: 'SettingsCtrl',
                        controllerAs: 'settings'
                    }
                }
            })

            .state('dash.languages', {
                url: '/languages',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/languages.html',
                        controller: 'LanguagesCtrl',
                        controllerAs: 'languages'
                    }
                }
            })

            .state('dash.changePaymentPasswordStep1', {
                    url: '/changePaymentPasswordStep1',
                    cache: false,
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/settings/changePaymentPassword/step1.html',
                            controller: 'ChangePaymentPasswordStep1',
                            controllerAs: 'changePaymentPasswordStep1'
                        }
                    }
                })
                .state('dash.changePaymentPasswordStep2', {
                    url: '/changePaymentPasswordStep2',
                    cache: false,
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/settings/changePaymentPassword/step2.html',
                            controller: 'ChangePaymentPasswordStep2',
                            controllerAs: 'changePaymentPasswordStep2'
                        }
                    }
                })
                .state('dash.changePaymentPasswordStep3', {
                    url: '/changePaymentPasswordStep3',
                    cache: false,
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/settings/changePaymentPassword/step3.html',
                            controller: 'ChangePaymentPasswordStep3',
                            controllerAs: 'changePaymentPasswordStep3'
                        }
                    }
                })
                .state('dash.changePaymentPasswordStep4', {
                    url: '/changePaymentPasswordStep4',
                    cache: false,
                    views: {
                        'dash': {
                            templateUrl: 'js/modules/settings/changePaymentPassword/step4.html',
                            controller: 'ChangePaymentPasswordStep4',
                            controllerAs: 'changePaymentPasswordStep4'
                        }
                    }
                })

            .state('dash.forgetPaymentPasswordStep1', {
                url: '/forgetPaymentPasswordStep1',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step1.html',
                        controller: 'ForgetPaymentPasswordStep1',
                        controllerAs: 'forgetPaymentPasswordStep1'
                    }
                }
            })

            .state('dash.forgetPaymentPasswordStep2', {
                url: '/forgetPaymentPasswordStep2',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step2.html',
                        controller: 'ForgetPaymentPasswordStep2',
                        controllerAs: 'forgetPaymentPasswordStep2'
                    }
                }
            })

            .state('dash.forgetPaymentPasswordStep3', {
                url: '/forgetPaymentPasswordStep3',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step3.html',
                        controller: 'ForgetPaymentPasswordStep3',
                        controllerAs: 'forgetPaymentPasswordStep3'
                    }
                }
            })

            .state('dash.forgetPaymentPasswordStep4', {
                url: '/forgetPaymentPasswordStep4',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step4.html',
                        controller: 'ForgetPaymentPasswordStep4',
                        controllerAs: 'forgetPaymentPasswordStep4'
                    }
                }
            })

            .state('dash.forgetPaymentPasswordStep5', {
                url: '/forgetPaymentPasswordStep5',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step5.html',
                        controller: 'ForgetPaymentPasswordStep5',
                        controllerAs: 'forgetPaymentPasswordStep5'
                    }
                }
            })

            .state('dash.forgetPaymentPasswordStep6', {
                url: '/forgetPaymentPasswordStep6',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/settings/forgetPaymentPassword/step6.html',
                        controller: 'ForgetPaymentPasswordStep6',
                        controllerAs: 'forgetPaymentPasswordStep6'
                    }
                }
            })

            .state('dash.benefits', {
                url: '/benefits',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/benefits/templates/benefits.html',
                        controller: 'BenefitsCtrl',
                        controllerAs: 'benefits'
                    }
                }
            })

            .state('dash.levels', {
                url: '/levels',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/benefits/templates/levels.html',
                        controller: 'LevelsCtrl',
                        controllerAs: 'levels'
                    }
                }
            })

            .state('dash.points', {
                url: '/points',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/benefits/templates/points.html',
                        controller: 'PointsCtrl',
                        controllerAs: 'points'
                    }
                }
            })

            .state('dash.programme', {
                url: '/benefits',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/benefits/templates/programme.html',
                        controller: 'ProgrammeCtrl',
                        controllerAs: 'programme'
                    }
                }
            })

            .state('dash.contact', {
                url: '/contact',
                views: {
                    'dash': {
                        templateUrl: 'js/modules/landingPages/templates/contact.html',
                        controller: 'ContactCtrl',
                        controllerAs: 'contact'
                    }
                }
            })

            .state('dash.roadAssistance', {
                url: '/roadAssistance',
                cache: false,
                views: {
                    'dash': {
                        templateUrl: 'js/modules/customerServices/roadAssistance.html',
                        controller: 'RoadAssistanceCtrl',
                        controllerAs: 'roadAssistance'
                    }
                }
            })

            .state('dash.iFrameContainer', {
                url: '/iFrameContainer',
                cache: false,
                views: {
                    'dash': {
                        controller: 'IFrameContainer',
                        controllerAs: 'iFrameContainer',
                        templateUrl: 'js/modules/common/IFrameContainer.html'
                    }
                }
            })

            .state('dash.comingSoon', {
                url: '/comingSoon',
                views: {
                    'dash': {
                        controller: 'DashCtrl',
                        controllerAs: 'dash',
                        templateUrl: 'js/modules/common/templates/comingSoon.html'
                    }
                }
            })

            .state('dash.brandShopInfo', {
                url: '/brandShopInfo/:name',
                views: {
                    'dash': {
                        controller: 'BrandShopInfoCtrl',
                        controllerAs: 'brandShopInfo',
                        templateUrl: 'js/modules/brandShops/templates/brandShopInfo.html'
                    }
                }
            })


             .state('registration.congratulationMsg', {
                url: '/congratulationMsg',
                views: {
                    'registration': {
                        templateUrl: 'js/modules/registration/templates/congratulationMsg.html',
                        controller: 'CongratulationMsgCtrl',
                        controllerAs: 'congratulationMsg'
                    }
                }

            });
        }
    ])



.config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('./js/i18n/angular-locale_{{locale}}.js');
}])

.run(['LocaleService', function(LocaleService) {
    LocaleService.setAppLangEnv();
}])

.run(['$rootScope', '$state', 'gettextCatalog', 'ENV_SETTING', '$ionicHistory', 'BackButtonAndroid',
    function($rootScope, $state, gettextCatalog, ENV_SETTING, $ionicHistory, backButtonAndroid) {

        $rootScope.aemDomain = ENV_SETTING.aemDomain;

        $rootScope.loading = 0;
        $rootScope.pullToRefresh = 0;
        $rootScope.qrCodeRefreshing = 0;
        $rootScope.isLoadAEM = 0;

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            if (typeof cordova !== 'undefined') {
                if (ionic.Platform.isIOS()) {
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (ionic.Platform.isAndroid()) {
                    backButtonAndroid.doubleClickToClose('dash.chat');
                }
            }
        }

        $rootScope.imageBaseURL = ENV_SETTING.imageBaseURL;

        $rootScope.$on('$includeContentRequested', function() {
            $rootScope.isLoadAEM = 1;
        });

        $rootScope.$on('$includeContentLoaded', function() {
            $rootScope.isLoadAEM = 0;
        });

        $rootScope.$on('$includeContentError', function() {
            $rootScope.isLoadAEM = 0;
        });

        $rootScope.$on('app:logout', function() {
            $rootScope.$broadcast('member:logout');
            $rootScope.$broadcast('chat:logout');
            $ionicHistory.clearCache();
            localStorage.removeItem("rememberMe");
        });
    }
]);

angular.element().ready(function() {
    angular.bootstrap(document, ['webapp']);
});
