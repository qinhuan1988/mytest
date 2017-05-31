angular.module('webapp.dealers')
    .directive({
        membershipCard: ['$compile', '$rootScope', membershipCard]
    });

function membershipCard($compile, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            cardInfo: '='
        },
        link: function($scope, $element) {
            $scope.imageBaseURL = $rootScope.imageBaseURL;
            $scope.$watch('cardInfo', function(val) {
                if (val) {
                    var cardImg = $scope.imageBaseURL + val.imgLink;
                    //remove child node before adding a card to avoid duplicate appends
                    d3.select($element[0]).html(''); 
                    
                    var svg = d3.select($element[0])
                        .append('svg')
                        .attr('viewBox', '0 0 300 192')
                        .attr('width', '100%')
                        .style('max-width', '400px');

                    var documentFragment = document.createDocumentFragment();
                    var svgfrag =  d3.select(documentFragment).append("svg");
                    svgfrag.append("image")
                        .attr("xlink:href", cardImg)
                        .attr('width', '100%')
                        .attr('height', '100%');

                    svgfrag.append("text")
                      .attr("dy", ".35em")
                      .attr("x", 20)
                      .attr("y", 30)
                      .style("font-size", "15dy")
                      .style("text-transform", "capitalize")
                      .style('fill', 'white')
                      .text(val.partnerName);
                    svgfrag.append("text")
                        .attr("dy", ".35em")
                        .attr("x", 20)
                        .attr("y", 130)
                        .style("font-size", "15dy")
                        .style("text-transform", "capitalize")
                        .style('fill', 'white')
                        .text(val.status);
                    svgfrag.append("text")
                        .attr("dy", ".35em")
                        .attr("x", 20)
                        .attr("y", 150)
                        .style("font-size", "15dy")
                        .style("text-transform", "capitalize")
                        .style('fill', 'white')
                        .text(val.memberName);
                    svgfrag.append("text")
                        .attr("dy", ".35em")
                        .attr("x", 20)
                        .attr("y", 170)
                        .style("font-size", "15dy")
                        .style("text-transform", "capitalize")
                        .style('fill', 'white')
                        .text(val.cardNo);
                    svg.node().appendChild(documentFragment);
                }
            });
        },
        template: "<div class='dealer-card-img'></div>"
    };
}
