angular.module('webapp.addCreditCard', [

]).controller({
    AddCreditCardCtrl: ['$state', '$scope', 'api', 'UserFormDataService', ctrl],
    MyNameCtrl: ['$state', '$scope', 'UserFormDataService', nameCtrl],
    MyNamePinyinCtrl: ['$state', '$scope', 'UserFormDataService', namePinyinCtrl],
    MyGenderCtrl: ['$state', '$scope', 'UserFormDataService', 'DEFAULT_SETTING', genderCtrl],
    MyIDtypeCtrl: ['$state', '$scope', 'UserFormDataService', 'DEFAULT_SETTING', MyIDtypeCtrl],
    MyIDnumberCtrl: ['$state', '$scope', 'UserFormDataService', MyIDnumberCtrl],
    MyPassportnumberCtrl: ['$state', '$scope', 'UserFormDataService', MyPassportnumberCtrl],
    MyIDValidityCtrl: ['$state', '$scope', 'UserFormDataService', 'DEFAULT_SETTING', MyIdValidityCtrl],
    MyPhoneCtrl: ['$state', '$scope', 'UserFormDataService', phoneCtrl],
    MyDOBCtrl: ['$state', '$scope', 'UserFormDataService', dobCtrl],
    MyIDDateCtrl: ['$state', '$scope', 'UserFormDataService', 'DialogService', 'gettextCatalog', idDateCtrl],
    MyRegionCtrl: ['$state', '$scope', 'UserFormDataService', 'api', regionCtrl],
    MyCardTypeCtrl: ['$state', '$scope', 'UserFormDataService', 'api', cardTypeCtrl]
}).service({
    UserFormDataService: ['MemberInfoService', 'gettextCatalog', 'api', 'moment', userFormDataService]
});

function ctrl($state, $scope, api, userFormDataService) {

    var vm = this;

    vm.formIsValid = false;

    vm.formData = userFormDataService.getRequestObj();
    vm.region = userFormDataService.getTempObj('region');
    vm.cardType = userFormDataService.getTempObj('cardtype');


    if (vm.formData.cardtype === '' || vm.formData.authorg === '' || vm.formData.name === '' || vm.formData.spellname === '' ||
        vm.formData.idtype === '' || vm.formData.id === '' ||
        (vm.formData.unlimit_flag === '') || (vm.formData.unlimit_flag === '0' && vm.formData.id_valid_date === '') || vm.formData.sex === '' || vm.formData.birth === '' ||
        vm.formData.mobile === '') {
        vm.formIsValid = false;
    } else {
        vm.formIsValid = true;
    }


    vm.submit = function() {
        api.ccbEnrollment(vm.formData).then(function(result) {
            window.open(result.ccburl, '_system', 'location=no');
            $state.go('dash.addCard');
        });
    };
}

function nameCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('name');
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('name', vm.value);
        $state.go('dash.creditCard');
    };
}


function namePinyinCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('spellname');
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('spellname', vm.value);
        $state.go('dash.creditCard');
    };
}


function MyIDtypeCtrl($state, $scope, userFormDataService, DEFAULT_SETTING) {
    var vm = this;
    initModificationCtrl($scope);
    vm.IDTypes = DEFAULT_SETTING.IDTypes;
    vm.value = userFormDataService.getParam('idtype');
    vm.setIDType = function(value) {
        vm.value = value;
    };
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('idtype', vm.value);
        $state.go('dash.creditCard');
    };
}

function MyIDnumberCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('id');
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('id', vm.value);
        $state.go('dash.creditCard');
    };
}


function MyPassportnumberCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('id');
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('id', vm.value);
        $state.go('dash.creditCard');
    };
}

function dobCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    var ValueObj = userFormDataService.getTempObj('birth');
    if (ValueObj) {
        vm.value = ValueObj;
    }
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setTempObj('birth', vm.value);
        var newDate = vm.value.getFullYear() + '' + ('0' + (vm.value.getMonth() + 1)).slice(-2) + '' + ('0' + vm.value.getDate()).slice(-2);
        userFormDataService.setParam('birth', newDate);
        userFormDataService.setParam('unlimit_flag', '');
        $state.go('dash.creditCard');
    };
}

function MyIdValidityCtrl($state, $scope, userFormDataService) {
    var vm = this;
    vm.canSelectLongTerm = userFormDataService.canSelectLongTerm();
    initModificationCtrl($scope);
    if (!vm.canSelectLongTerm) {
        vm.value = 0;
    }
    userFormDataService.setParam('unlimit_flag', vm.value);
    vm.setType = function(value) {
        vm.value = value;
    };
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('unlimit_flag', vm.value);
        $state.go('dash.creditCard');
    };
}


function phoneCtrl($state, $scope, userFormDataService) {
    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('mobile');
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('mobile', vm.value);
        $state.go('dash.creditCard');
    };
}


function idDateCtrl($state, $scope, userFormDataService, DialogService, gettextCatalog) {
    var vm = this;
    initModificationCtrl($scope);
    var ValueObj = userFormDataService.getTempObj('id_valid_date');
    if (ValueObj) {
        vm.value = ValueObj;
    }
    $scope.dash.onRightBtnClick = function() {
        var validTillYear = vm.value.getFullYear();
        var current = new Date();
        currentyear = current.getFullYear();
        var diff = validTillYear - currentyear;
        if (diff > 20) {
            vm.value = "";
            DialogService.alertMsg(gettextCatalog.getString('The valid period must be less than 21 years'));
        } else {
            userFormDataService.setTempObj('id_valid_date', vm.value);
            var newDate = vm.value.getFullYear() + '' + ('0' + (vm.value.getMonth() + 1)).slice(-2) + '' + ('0' + vm.value.getDate()).slice(-2);
            userFormDataService.setParam('id_valid_date', newDate);
            $state.go('dash.creditCard');
        }
    };
}


function genderCtrl($state, $scope, userFormDataService) {
    var vm = this;
    vm.canSelectLongTerm = userFormDataService.canSelectLongTerm();
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('sex', vm.value);
    vm.setSex = function(value) {
        vm.value = value;
    };
    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('sex', vm.value);
        $state.go('dash.creditCard');
    };
}

// CCB Card type

function cardTypeCtrl($state, $scope, userFormDataService, api) {

    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('cardtype');

    api.getCCBCardType().then(function(result) {
        vm.list = result.cCBCardTypeList;
    });

    vm.setCardType = function(cardType) {
        vm.value = cardType.cardTypeCode;
        userFormDataService.setTempObj('cardtype', cardType.cardType);
    };

    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('cardtype', vm.value);
        $state.go('dash.creditCard');
    };
}

function regionCtrl($state, $scope, userFormDataService, api) {

    var vm = this;
    initModificationCtrl($scope);
    vm.value = userFormDataService.getParam('authorg');
    api.getCCBissuer().then(function(result) {
        vm.list = result.cCBCardIssuerList;
    });

    vm.setRegion = function(region) {
        vm.value = region.agencyCode;
        userFormDataService.setTempObj('region', region.areaName);
    };

    $scope.dash.onRightBtnClick = function() {
        userFormDataService.setParam('authorg', vm.value);
        var salnbr = vm.value.substring(0, 3) + '999999';
        userFormDataService.setParam('salnbr', salnbr);
        $state.go('dash.creditCard');
    };
}


function userFormDataService(memberInfoService, gettextCatalog, api, moment) {

    var memberInfo = memberInfoService.getMemberInfo();

    var requestParams = {
        clientCode: 'bmw', //bmw
        countryCulture: countryCulture(), // local
        pgtype: '2',
        // 994” +5 Date Counts, such as 15001 is for Jan 1, 2015, and +5 serial numbers // 13car
        appid: appid(),
        txflow: 'LPTEST00000000000000000000000001',
        authorg: '', // getCCBIssuer by user selection
        salnbr: '', // authorg[1...3] + 999999
        cardtype: '',
        accept_recommend_flag: '1',
        name: memberInfo.firstName + ' ' + memberInfo.lastName, // Firstname+lastname
        spellname: '', // input field
        idtype: memberInfo.udf27, // user select 1 2
        id: memberInfo.udf28, // 18-digit
        unlimit_flag: '', // 1 long term, 0: not long term // Long term option ONLY appear if current year - birth year MUST bigger than 46, otherwise, only show short term select value
        id_valid_date: '', // work together with unlimit_flag, if user select short term term, user can input the date, YYYYMMDD(do not take the placeholder text from design) if user select long term, dont show this field.
        sex: '', // male,0, female,1
        birth: '', // YYYYMMDD
        mobile: memberInfo.mobileNo, // prefill with mobile number, but user can change
        relcorpcredit: memberInfo.membershipId, // membership id
        recommend_org_code: 'D999000003',
        timestamp: '', //$filter('date')(new Date(), "yyyyMMddHHmmss"), // current time YYYYMMDDHHMMSS
        outputType: 'json'
    };


    function countryCulture() {
        var currentLanguage = gettextCatalog.getCurrentLanguage();
        return currentLanguage === 'en' ? 'en-us' : 'zh-cn';
    }

    function appid() {
        var result, serialNumber;
        serialNumber = Math.floor(10000 + Math.random() * 90000);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var yearCode = currentYear.toString().substring(2, 4);
        var dayOfYear = moment().dayOfYear();
        result = "994" + yearCode + dayOfYear + serialNumber;
        return result;
    }

    var temp = {};

    var canSelectLongTerm = function() {
        if (temp.birth) {
            var birthYear = temp.birth.getFullYear();
            var current = new Date();
            var currentyear = current.getFullYear();
            var age = currentyear - birthYear;
            return (age > 46);
        } else {
            return true;
        }
    };

    var setTempObj = function(index, value) {
        temp[index] = value;
    };

    var getTempObj = function(index) {
        return temp[index];
    };


    var setParam = function(index, value) {
        requestParams[index] = value;
    };

    var getParam = function(index) {
        return requestParams[index];
    };

    var getRequestObj = function() {
        return requestParams;
    };

    return {
        setParam: setParam,
        getParam: getParam,
        getRequestObj: getRequestObj,
        setTempObj: setTempObj,
        getTempObj: getTempObj,
        canSelectLongTerm: canSelectLongTerm
    };
}

function initModificationCtrl($scope) {
    $scope.dash.rightBtnDisabled = false;
    $scope.dash.hideRightBtn = false;
    $scope.$on('$destroy', function() {
        $scope.dash.hideRightBtn = true;
    });
}
