angular.module('example')
    
    .controller('ExampleController', ['$scope', 'Authentication', 'nodeService', function($scope, Authentication, nodeService){
    
        $scope.name = Authentication.user ? Authentication.user.fullName : 'Mean Application';
        $scope.nodeObj = {};
        
        
        $scope.getNodesData = function(){
            nodeService.getNodes().then(function(res){
                
                $scope.nodesData = res.data;
                drawCircles($scope.nodesData);
                drawText($scope.nodesData);
            },function(err){
                if(err) throw err;
            })
        }
        
        $scope.getNodesData();
        var circles, text;
        $scope.addNode = function(){
            if($scope.nodesData.length === 0){
                $scope.nodeObj._id = 1;
            } else {
                $scope.nodeObj._id = $scope.nodesData[$scope.nodesData.length - 1]._id + 1;
            }
            nodeService.createNode($scope.nodeObj).then(function(res){
                $scope.nodesData = res;
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

                var canvas = d3.select(".canvas")          //Does not update when window is resized.
                    .append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%");

                var centralNode = d3.select("svg")
                    .append("rect")
                    .attr({
                        x: documentWidth / 2,
                        y: documentHeight / 2,
                        width: 40,
                        height: 40,
                        fill: "brown"
                    })
        
//                centralNode.on("click", function(){
//                    $scope.nodeObj.text = prompt("Please make a new node");
//                    $scope.addNode();
//                })
                
                var drawCircles = function(dataArray){
                    var rotatedPoints = calculatePointsOnCircle(dataArray);
                    
                    circles = d3.select("svg")
                        .selectAll("circle")
                        .data(dataArray, function(d){return d._id});
                    
                    circles
                        .enter()
                        .append("circle")
                        .attr("cx", documentWidth/2)
                        .attr("cy", documentHeight/2)
                        .attr("r", 40)
                        .style("fill","blue")
                        .transition()
                        .duration(1500)
                        .ease('elastic')
                        .attr("cx", function(d, i) {
                            return rotatedPoints[i].x; //math to find the x-coord based on i and dataArray.length
                        })
                        .attr("cy", function(d, i){
                            return rotatedPoints[i].y; //math to find the y-coord based on i and dataArray.length
                        });
                        
                    
                    circles
                        .transition()
                        .duration(1500)
                        .ease('elastic')
                        .attr("cx", function(d, i) {
                            return rotatedPoints[i].x; //math to find the x-coord based on i and dataArray.length
                        })
                       .attr("cy", function(d, i){
                            return rotatedPoints[i].y; //math to find the y-coord based on i and dataArray.length
                        });

                        
                    
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
                    text =  d3.select("svg").selectAll("text")
                        .data(dataArray, function(d){return d._id});



                    text
                        .enter()
                        .append("text")
                        .attr("x", documentWidth/2)
                        .attr("y", documentHeight/2)
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
                        
                    text
                        .transition()
                        .duration(1000)
                        .ease('elastic')
                        .attr("x", function(d, i){return rotatedPoints[i].x - 25})
                        .attr("y", function(d, i){return rotatedPoints[i].y + 5})
                        .text(function(d){ return d.content.text;})
                        .attr("fill", "white")
                        .style("stroke","black")
                        .style("stroke-width",".5px");

                }
   
        }
    ]);