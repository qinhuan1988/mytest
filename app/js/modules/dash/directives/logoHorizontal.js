angular.module('webapp.dash')
    .directive('logoHorizontal', ['$rootScope', '$compile', 'LocaleService', logoHorizontal]);

function logoHorizontal($rootScope, $compile, LocaleService) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {

            scope.lang = LocaleService.getLang();
            var logo = $compile( '<img ng-src="{{imageBaseURL}}img/logohorizontal_{{lang}}.png" class="logo small-logo" />' )( scope );
            element.html('');
            element.append(logo);

            $rootScope.$on('reload:logo', function(event, args) {
                scope.lang = args.lang;
                element.html('');
                element.append(logo);
            });
        }
    };
}
