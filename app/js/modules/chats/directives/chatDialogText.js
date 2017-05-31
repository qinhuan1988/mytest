angular.module('webapp.chat').directive({
    chatDialogText: ['$compile', chatDialogText]
});

function linkify(content) {
    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return content
        .replace(urlPattern, '<span  class="chat-link" ng-click="chat.openDialogLink(\'$&\')">$&</span>')
        .replace(pseudoUrlPattern, '$1<span class="chat-link" ng-click="chat.openDialogLink(\'http://$2\')">$2</span>')
        .replace(emailAddressPattern, '<a class="chat-link" href="mailto:$&">$&</a>');

}

function chatDialogText ($compile) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            attrs.$observe( 'content', function ( myContent ) {
                var content = myContent.replace(/<a href='#' x-action='leave-message'>/, '<a ng-click="chat.openLeaveMsgLink()">');

                // cut generalCampaigns flag
                content = content.replace(/#.+#/, '');

                // cut useless msg from BE responseData when message have not receive in chat system
                content = content.replace(/.+ the message is: /, '');
                content = content.replace(/.+消息内容： /, '');

                content = linkify(content);

                content = $compile( '<div class="user-select">' + content + '</div>' )( scope );
                element.html('');
                element.append(content);
            });

        }
    };
}
