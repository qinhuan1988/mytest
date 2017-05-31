angular.module('webapp.chat').directive({
    chatDialogNews: ['$compile', 'ENV_SETTING', chatDialogNews]
});

function chatDialogNews ($compile, ENV_SETTING) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            attrs.$observe( 'content', function ( myContent ) {
                var article = JSON.parse(myContent).news.articles[0];
                var content = '<h5>' + article.title + '</h5>',
                    imgDomain = ENV_SETTING.chatDomain,
                    imgURL = article.picurl;

                if(!/http/.test(article.picurl)) {
                    imgURL = imgDomain + imgURL;
                }

                if(article.description) {
                    content += '<p>' + article.description + '</p>';
                }

                if(article.picurl) {
                    content += '<p><img class="offer-image" src="' + imgURL + '" ></p>';
                }
                content = $compile( '<div class="user-select" ng-click="chat.openDialogLink(\'' + article.url + '\')">' + content + '</div>' )( scope );
                element.html('');
                element.append(content);
            });
        }
    };
}
