angular.module('webapp.offers').directive({
    savingsIndicator: ['$compile', savingsIndicator],
});

function savingsIndicator($compile) {
    return {
        restrict: 'E',
        scope: {
            label: '@',
            value: '='
        },
        link: function($scope, $element) {
            $scope.$watch('value', function(val) {
                if (val || val === 0) {
                    var value = parseInt(val);
                    value = value.toFixed(2);
                    d3.select($element[0]).selectAll('svg').remove();
                    var svg = d3.select($element[0]).append('svg');
                    var viewBox = {
                        width: 102,
                        height: 102
                    };
                    svg.attr('width', '100%')
                        .attr('viewBox', '0 0 ' + viewBox.width + ' ' + viewBox.height)
                        .style('max-width', '120px');
                    var circle = svg.append('circle');
                    circle.attr('cx', 51)
                        .attr('cy', 51)
                        .attr('r', 50)
                        .style('stroke', 'black')
                        .style('fill', 'white')
                        .style('stroke-width', '1px');
                    svg.append('text')
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .attr('x', 51)
                        .attr('y', 28)
                        .style("font-size", 12)
                        .style('fill', 'black')
                        .text($scope.label)
                        .call(wrap, 80);
                    svg.append('text')
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .attr('x', 51)
                        .attr('y', 70)
                        .style("font-size", 20)
                        .style('fill', 'black')
                        .text(value);
                }
                $compile(angular.element($element[0]).contents())($scope);
            });

            function wrap(text, width) {
                text.each(function() {
                    var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        x = text.attr("x"),
                        y = text.attr("y"),
                        dy = parseFloat(text.attr("dy")),
                        tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                    word = words.pop();
                    while (word) {
                        line.push(word);
                        tspan.text(line.join(" "));
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop();
                            tspan.text(line.join(" "));
                            line = [word];
                            tspan = text.append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                .text(word);
                        }
                        word = words.pop();
                    }
                });
            }



        }
    };
}
