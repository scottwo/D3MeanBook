angular.module('example')
    
    .controller('ExampleController', ['$scope', 'Authentication', 'nodeService', function($scope, Authentication, nodeService){
    
        $scope.name = Authentication.user ? Authentication.user.fullName : 'Mean Application';
        
        $scope.getNodesData = function(){
            nodeService.getNodes().then(function(res){
                
                $scope.nodesData = res.data;
                canvas = d3.select(".canvas")          //Does not update when window is resized.
                        .append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%");
                    circles = canvas.selectAll("circle")
                         .data($scope.nodesData)
                         .enter()
                         .append("circle")
                         .attr("cx", documentWidth/2)
                         .attr("cy", documentHeight/2);
                    text = canvas.selectAll("text")
                        .data($scope.nodesData)
                        .enter()
                        .append("text")
                        .attr("x", documentWidth/2)
                        .attr("y", documentHeight/2);
                drawCircles($scope.nodesData);
                drawText($scope.nodesData);
            },function(err){
                if(err) throw err;
            })
        }
        
        $scope.getNodesData();
        var canvas, circles, text;
        $scope.addNode = function(){
            if($scope.nodesData.length === 0){
                $scope.nodeObj._id = 1;
            } else {
                $scope.nodeObj._id = $scope.nodesData[$scope.nodesData.length - 1]._id + 1;
            }
            nodeService.createNode($scope.nodeObj).then(function(res){
                $scope.nodesData = res;
//                d3.selectAll("svg").remove();
//                canvas = d3.select(".canvas")          //Does not update when window is resized.
//                        .append("svg")
//                        .attr("width", "100%")
//                        .attr("height", "100%");
                    circles
                        .data($scope.nodesData)
                         .enter()
                         .append("circle");
                    text
                        .data($scope.nodesData)
                        .enter()
                        .append("text");

                drawCircles($scope.nodesData);
                drawText($scope.nodesData);
            });
        };
        
    
                var documentHeight = $(window).height();
                var documentWidth = $(window).width();


                $(window).resize(function(){
                    documentHeight = $(window).height();
                    documentWidth = $(window).width();
                    drawCircles($scope.nodesData);
                    drawText($scope.nodesData);
                });

                var calculatePointsOnCircle = function(dataArray) {
                    var rotatedPoints = [];
                    for(var i = 0; i < dataArray.length; i++){
                        var topPoint = g.point(documentWidth/2, documentHeight/4);
                        var origin = g.point(documentWidth/2, documentHeight/2);
                        var rotationAngle = (360 - (i * (360 / (dataArray.length)))); 
                        rotatedPoints.push(topPoint.rotate(origin, rotationAngle));
                    }
                    return rotatedPoints;
                }
                var drawCanvas = function(dataArray){
                    var canvas = d3.select(".canvas")          //Does not update when window is resized.
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
                }
                var drawCircles = function(dataArray){
                        var rotatedPoints = calculatePointsOnCircle(dataArray);
                    
                    circles
//                        .attr("cx", documentWidth/2)
//                        .attr("cy", documentHeight/2)
                        .transition()
                        .duration(1500)
                        .ease('elastic')
                        .attr("cx", function(d, i) {
                            return rotatedPoints[i].x; //math to find the x-coord based on i and dataArray.length
                        })
                       .attr("cy", function(d, i){
                            return rotatedPoints[i].y; //math to find the y-coord based on i and dataArray.length
                        })
                       .attr("r", 40)
                        .style("fill","blue");
                        
                    
                    circles.on("mouseover",function(){
                            d3.select(this).transition()
                                .ease("linear")
                                .attr("r", 50)
                                .style("fill", "yellow");
                        })
                        .on("mouseout", function(){
                            d3.select(this).transition()
                                .ease("linear")
                                .attr("r", 40)
                                .style("fill", "blue");
                        });
                    

                }
                
                var drawText = function(dataArray) {
                    var rotatedPoints = calculatePointsOnCircle(dataArray);


                    text
//                        .attr("x", documentWidth/2)
//                        .attr("y", documentHeight/2)
                        .style("font-size","1.5em")
                        .transition()
                        .duration(1000)
                        .ease('elastic')
                        .attr("x", function(d, i){return rotatedPoints[i].x - 25})
                        .attr("y", function(d, i){return rotatedPoints[i].y + 5})
                        .text(function(d){ return d.content.text;})
                        .attr("fill", "white")
                        
                        .style("stroke","black")
                        .style("stroke-width",".5px")
//                        .style("text-anchor", "right");
                }
                
                
        }
    ]);