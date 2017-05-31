angular.module('webapp.memberInfo', [

]).factory('MemberInfoService', ['api', 'gettextCatalog', '$state', '$rootScope', function(api, gettextCatalog, $state, $rootScope) {

    var getMemberInfo = function() {
        var memberInfo = JSON.parse(sessionStorage.getItem('memberInfo'));
        if (memberInfo === null) {
            $state.go('home');
            window.location.reload();
        } else {
            return memberInfo;
        }
    };

    var cleanLoginCache = function() {
        loginCache = {};
    };

    var updateMemberInfoCards = function(memberInfo) {
        var newMemberInfo = memberInfo;
        var partnerDetails = newMemberInfo.partnerDetails;
        var memberCards = newMemberInfo.memberCards;
        _.each(partnerDetails, function(item, index) {
            item.memberCards = getDealerMemberCards(item.partnerCode, memberCards);
        });
        newMemberInfo.partnerDetails = partnerDetails;
        return newMemberInfo;
    };

    var setMemberInfo = function(memberInfo) {
        cleanLoginCache();
        var newMemberInfo = updateMemberInfoCards(memberInfo);
        sessionStorage.setItem('memberInfo', JSON.stringify(newMemberInfo));
    };

    var getDealerMemberCards = function(partnerCode, memberCards) {
        var tab = [];
        for (var index in memberCards) {
            if (memberCards[index].partnerCode === partnerCode) {
                tab.push(memberCards[index]);
            }
        }
        return tab;
    };

    var getmemberName = function() {
        var memberInfo = getMemberInfo();
        if (gettextCatalog.getCurrentLanguage() === 'zh') {
            return (memberInfo.lastName + " " + memberInfo.firstName);
        } else {
            return (memberInfo.firstName + " " + memberInfo.lastName);
        }
    };

    var updateMemberInfo = function(memberNewInfo) {
        return api.enrollment(memberNewInfo);
    };

    var getMemberInfoFromServer = function(memberId) {
        return api.getMemberInfo(memberId)
                .then(function(result) {
                    setMemberInfo(result.plain());
                });
    };

    var deleteMemberInfo = function() {
        sessionStorage.removeItem('memberInfo');
    };

    var setSessionToken = function(sessionToken) {
        sessionStorage.setItem('sessionToken', JSON.stringify(sessionToken));
    };

    var getSessionToken = function() {
        return JSON.parse(sessionStorage.getItem('sessionToken'));
    };

    var deleteSessionToken = function() {
        sessionStorage.removeItem('sessionToken');
    };

    var setRememberMe = function(rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    };

    var getRememberMe = function() {
        return JSON.parse(localStorage.getItem('rememberMe'));
    };

    var loginCache = {};

    var setLoginCache = function(data) {
        loginCache = _.defaults(data, loginCache);
    };

    var getLoginCache = function() {
        return loginCache;
    };

    $rootScope.$on('member:logout', function () {
        deleteMemberInfo();
        deleteSessionToken();
    });

    return {
        getMemberInfo: getMemberInfo,
        setMemberInfo: setMemberInfo,
        updateMemberInfo: updateMemberInfo,
        deleteMemberInfo: deleteMemberInfo,
        setSessionToken: setSessionToken,
        getSessionToken: getSessionToken,
        deleteSessionToken: deleteSessionToken,
        getMemberInfoFromServer: getMemberInfoFromServer,
        setLoginCache: setLoginCache,
        getLoginCache: getLoginCache,
        cleanLoginCache: cleanLoginCache,
        getmemberName: getmemberName,
        setRememberMe: setRememberMe,
        getRememberMe: getRememberMe
    };

}]);
