angular.module('webapp.aem')
.factory('aemModalService', ['$ionicModal', 'gettextCatalog', aemModalService]);

/*
 * aemModalService
 *
 * usage: use when displaying aem content into a modal
 *
 * args: 
 *   - scope
 *   - title: title to be displayed in dialog
 *   - aemContentURL: url template inserted into dialog
 *   - modalTepmlateURL (optional): dialog modal template to wrap aem content
 */
function aemModalService ($ionicModal) {

    var defaultTemplate = 'js/modules/aem/aemModalTemplate.html';

    return {
        showModal: function (scope, title, aemContentURL, modalTepmlateURL) {
            modalTepmlateURL = modalTepmlateURL || defaultTemplate;

            if (title) {
                scope.title = title;
            }

            $ionicModal.fromTemplateUrl(modalTepmlateURL, function ($ionicModal) {
                scope.modal = $ionicModal;
            }, {
                scope: scope,
                animation: 'slide-in-up'
            })
            .then(function () {
                scope.contentURL = aemContentURL;
                scope.modal.show();
            });
        }
    };
}

