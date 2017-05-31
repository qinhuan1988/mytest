'use strict';

window.$ = require("jquery");
window._ = require('lodash');

require('ionic');
require('restangular');
require('angular-gettext');
require('angular-dynamic-locale');

window.qrcode = require('qrcode-generator');
require('angular-qrcode');

require('d3');

// aes
window.CryptoJS = require("crypto-js");
require('./libs/aes/enc-u8array');



window.SockJS = require('./libs/ws/sockjs.min');

require('./libs/ws/stomp');

require('./translations/po/zh');
require('./translations/po/en');

require('./template');
require('./app');
require('./config');
require('./env');

require('./modules/common/module');
require('./modules/common/config/logConfig');
require('./modules/common/IframeContainerCtrl');
require('./modules/common/services/dialogService');
require('./modules/common/services/localeService');
require('./modules/common/services/fileUploadService');
require('./modules/common/services/externalLinksService');
require('./modules/common/services/AccessoryBarService');
require('./modules/common/services/backButtonAndroid');
require('./modules/common/services/tutorialService');
require('./modules/common/services/AndroidLocationPermissions.service');
require('./modules/common/directives/animatedIcons');
require('./modules/common/directives/countDown');
require('./modules/common/directives/equals');
require('./modules/common/directives/fallbackSrc');
require('./modules/common/directives/fileUpload');
require('./modules/common/directives/formError');
require('./modules/common/directives/formErrorTip');
require('./modules/common/directives/imageLoaded');
require('./modules/common/directives/myCaptcha');
require('./modules/common/directives/repeatPassword');
require('./modules/common/directives/stepsNavigation');
require('./modules/common/directives/tabsMenuItem');
require('./modules/common/directives/tabPowerPress');
require('./modules/common/directives/validateEmail');
require('./modules/common/directives/validateFirstName');
require('./modules/common/directives/validateIdNumber');
require('./modules/common/directives/validateLastName');
require('./modules/common/directives/validateMembershipId');
require('./modules/common/directives/validatePassportNumber');
require('./modules/common/directives/validatePassword');
require('./modules/common/directives/validatePhoneNumber');
require('./modules/common/directives/validatePinNumber');
require('./modules/common/directives/validateLength');
require('./modules/common/directives/validatePostCode');
require('./modules/common/directives/validator');
require('./modules/common/directives/slidesDynamicHeight');

require('./modules/api/api');
require('./modules/api/run/apiSettingsRun');

require('./modules/aem/aem');
require('./modules/aem/aemDataService');
require('./modules/aem/externalLinks');
require('./modules/aem/aemModalService');
require('./modules/auth/MemberInfoService');

require('./modules/home/HomeCtrl');
require('./modules/login/LoginCtrl');

require('./modules/dash/DashCtrl');
require('./modules/dash/directives/centralCardLayer');
require('./modules/dash/directives/dashRadialGauge');
require('./modules/dash/directives/dynamicHeight');
require('./modules/dash/directives/iconItem');
require('./modules/dash/directives/memberDashboard');
require('./modules/dash/directives/logoHorizontal');

require('./modules/overview/OverviewCtrl');

require('./modules/chats/ChatCtrl');
require('./modules/chats/services/AESService');
require('./modules/chats/services/ChatService');
require('./modules/chats/services/WebSocketService');
require('./modules/chats/directives/chatDialogImg');
require('./modules/chats/directives/chatDialogNews');
require('./modules/chats/directives/chatDialogText');
require('./modules/chats/directives/iosKeyboardAttach');

require('./modules/benefits/benefits');
require('./modules/benefits/controllers/PointsCtrl');
require('./modules/benefits/controllers/BenefitsCtrl');
require('./modules/benefits/controllers/LevelsCtrl');
require('./modules/benefits/controllers/ProgrammeCtrl');

require('./modules/customerServices/RoadAssistanceCtrl');

require('./modules/mobilityServices/MobilityServicesCtrl');

require('./modules/registration/RegistrationCtrl');
require('./modules/registration/RegistrationService');
require('./modules/registration/controllers/Step1Ctrl');
require('./modules/registration/controllers/Step2Ctrl');
require('./modules/registration/controllers/Step3Ctrl');
require('./modules/registration/controllers/Step4Ctrl');
require('./modules/registration/controllers/Step5Ctrl');
require('./modules/registration/controllers/CarListCtrl');
require('./modules/registration/controllers/CongratulationMsgCtrl');

require('./modules/requestOTP/RequestOTPCtrl');

require('./modules/forgetPassword/forgetPassword');
require('./modules/forgetPassword/step1.controller');
require('./modules/forgetPassword/step2.controller');

require('./modules/changePassword/ChangePasswordCtrl');

require('./modules/faq/faqCtrl');
require('./modules/faq/faqItem');

require('./modules/myProfile/MyProfileCtrl');

require('./modules/settings/SettingsCtrl');

require('./modules/giftCards/AddCardCtrl');
require('./modules/giftCards/AddCreditCardCtrl');

require('./modules/about/AboutCtrl');

require('./modules/myWallet/MyWalletCtrl');
require('./modules/myWallet/TransactionHistoryCtrl');
require('./modules/myWallet/TransHistoryInfoCtrl');
require('./modules/myWallet/changePaymentMethodCtrl');
require('./modules/myWallet/MyWalletService');
require('./modules/myWallet/QuickPaymentPasswordCtrl');
require('./modules/myWallet/directives/pcLogo');

/////////////////////////////////
//my bank card feature
/////////////////////////////////
require('./modules/myBankCard/PaymentMethodCtrl');
require('./modules/myBankCard/BankCardCtrl');
require('./modules/myBankCard/BankCardService');
require('./modules/myBankCard/directive');

require('./modules/giftCards/GiftCardCtrl');
require('./modules/giftCards/GiftCardService');


/////////////////////////////////
// Dealers module
/////////////////////////////////
require('./modules/dealers/dealers');
require('./modules/dealers/controllers/DealersCtrl');
require('./modules/dealers/controllers/DealerInfoCtrl');
require('./modules/dealers/controllers/AddDealerCtrl');
require('./modules/dealers/controllers/AddDealerPartialCtrl');
require('./modules/dealers/controllers/ChangePinCtrl');
require('./modules/dealers/controllers/ReplaceCardCtrl');
require('./modules/dealers/controllers/ForgotPinCtrl');
require('./modules/dealers/controllers/DealerGroupInfoCtrl');
require('./modules/dealers/directives/membershipCard');
require('./modules/dealers/services/dealersService');
require('./modules/dealers/filters/dealersFilter');


// Vehicles mmodule
require('./modules/vehicles/vehicles');
// controllers
require('./modules/vehicles/controllers/VehiclesCtrl');
require('./modules/vehicles/controllers/AddVehicleCtrl');
require('./modules/vehicles/controllers/AddVehicleProofCtrl');
// services
require('./modules/vehicles/services/VehiclesService');
// --- End - Vehicles module


/////////////////////////////////
// Offers module
/////////////////////////////////
require('./modules/offers/offers');
// controllers
require('./modules/offers/controllers/CouponInfoCtrl');
require('./modules/offers/controllers/CouponsCtrl');
require('./modules/offers/controllers/FavoritesCtrl');
require('./modules/offers/controllers/OfferInfoCtrl');
require('./modules/offers/controllers/OffersCtrl');
// directives
require('./modules/offers/directives/powerPress');
require('./modules/offers/directives/offerItem');
require('./modules/offers/directives/savingsIndicator');
// services
require('./modules/offers/services/OffersService');
require('./modules/offers/services/CouponsService');
// filters
require('./modules/offers/filters/offersFilter');
// --- End - Offers module


/////////////////////////////////
// brand shops module
/////////////////////////////////
require('./modules/brandShops/BrandShops');
require('./modules/brandShops/controllers/BrandShopInfoCtrl');
require('./modules/brandShops/services/brandShopsService');
// --- End - brand shops module

/////////////////////////////////
// Sections modules
/////////////////////////////////
require('./modules/landingPages/landingPages');
// controllers
require('./modules/landingPages/controllers/ContactCtrl');
// --- End - sections module



require('./modules/activity/ActivityCtrl');
require('./modules/activity/ClaimPointsCtrl');

require('./modules/partners/PartnersCtrl');

require('./modules/sideMenu/sideMenuItem.directive');
require('./modules/sideMenu/sideMenuService');

require('./modules/tracking/PiwikTracking.service');
require('./modules/tracking/PiwikStartTracking.run');
require('./modules/tracking/PiwikVersionTracking.run');
require('./modules/tracking/PiwikPageTracking.run');
