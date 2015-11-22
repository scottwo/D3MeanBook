angular.module('example')

    .directive('drawCircles', ['d3Service', '$window', 'nodeService', function(d3Service, $window, nodeService) {
        
        return {
            restrict: 'EA',
            scope: {},
            link: function(scope, elements, attributes){
                d3Service.d3().then(function(d3){
                    
                function getData(){
                    nodeService.getNodes().then(function(res){
                        var dataArray = res.data;
                    
                
                    
                var documentHeight = $(window).height();
                var documentWidth = $(window).width();


                $(window).resize(function(){
                    documentHeight = $(window).height();
                    documentWidth = $(window).width();
                    drawCircles();
                });

                var canvas = d3.select(elements[0])          //Does not update when window is resized.
                    .append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%");

                var circles = canvas.selectAll("circle")
                     .data(dataArray)
                     .enter()
                     .append("circle");

                var text = canvas.selectAll("text")
                    .data(dataArray)
                    .enter()
                    .append("text");

                var drawCircles = function(){
                    var rotatedPoints = [];
                    for(var i = 0; i < dataArray.length; i++){
                        var topPoint = g.point(documentWidth/2, documentHeight/4);
                        var origin = g.point(documentWidth/2, documentHeight/2);
                        var rotationAngle = (360 - (i * (360 / (dataArray.length)))); 
                        rotatedPoints.push(topPoint.rotate(origin, rotationAngle));
                    }
                    circles.attr("cx", function(d, i) {
                            return rotatedPoints[i].x; //math to find the x-coord based on i and dataArray.length
                        })
                       .attr("cy", function(d, i){
                            return rotatedPoints[i].y; //math to find the y-coord based on i and dataArray.length
                        })
                       .attr("r", 40)
                        .attr("xlink:href", "http://38.media.tumblr.com/avatar_e0593f588ae7_128.png"
//                    function(d){
//                            if(d.imgUrl){
//                                return "url('http://38.media.tumblr.com/avatar_e0593f588ae7_128.png')"
//                            } else {
//                                return "blue";
//                            }
//                        }
                );

                    text.attr("x", function(d, i){return rotatedPoints[i].x - 35})
                        .attr("y", function(d, i){return rotatedPoints[i].y})
                        .text(function(d, i){return d[i].content.text;})
                        .attr("fill", "white");
                }
                drawCircles();
            
//                var renderCircles = function(data) {
//                    // remove all previous items before render
//                    canvas.selectAll('*').remove();
//
//                    // If we don't pass any data, return out of the element
//                    if (!data) return;
//
//                    // setup variables
//                    var documentHeight = angular.element($window)[0].innerHeight;
//                    var documentWidth = angular.element($window)[0].innerWidth;
//
//                    // set the height based on the calculations above
//                    canvas.attr('width', documentWidth)
//                        .attr('height', documentHeight);
//                    
//                    //Calculate the points for the center of each circle
//                    var rotatedPoints = [];
//                    for(var i = 0; i < data.length; i++){
//                        var topPoint = g.point(documentWidth/2, documentHeight/4);
//                        var origin = g.point(documentWidth/2, documentHeight/2);
//                        var rotationAngle = (360 - (i * (360 / (data.length)))); 
//                        rotatedPoints.push(topPoint.rotate(origin, rotationAngle));
//                    }
//                    //create the circles
//                    canvas.selectAll("circle")
//                     .data(data)
//                     .enter()
//                     .append("circle")
//                     .attr("cx", function(d, i) {
//                            return rotatedPoints[i].x; //math to find the x-coord based on i and dataArray.length
//                        })
//                     .attr("cy", function(d, i){
//                            return rotatedPoints[i].y; //math to find the y-coord based on i and dataArray.length
//                        })
//                     .attr("r", 40)
//                     .style("background-color", "blue");
//
//                    //create the text
//                    
//                    canvas.selectAll("text")
//                    .data(data)
//                    .enter()
//                    .append("text")
//                    .attr("x", function(d, i){return rotatedPoints[i].x - 35})
//                    .attr("y", function(d, i){return rotatedPoints[i].y})
//                    .text(function(d){return d.text;})
//                    .attr("fill", "white");;
//            }
                });}}
                                   )
            }
        }
        }
    
    ])