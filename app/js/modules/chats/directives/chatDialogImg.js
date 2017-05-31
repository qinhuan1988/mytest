angular.module('webapp.chat').directive({
    chatDialogImg: ['$compile', chatDialogImg]
});

function chatDialogImg($compile) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            attrs.$observe( 'content', function ( myContent ) {

                var content = '<img class="offer-image" src="' + myContent + '">';
                content = $compile( '<div class="user-select" ng-click="chat.showImage(\'' + myContent + '\')">' + content + '</div>' )( scope );
                element.html('');
                element.append(content);
            });
        }
    };
}
