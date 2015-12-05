angular.module('example')
    
    .controller('ExampleController', ['$scope', 'Authentication', 'nodeService', function($scope, Authentication, nodeService){
    
        $scope.name = Authentication.user ? Authentication.user.fullName : 'Mean Application';
        $scope.nodeObj = {
            content: {
                text: ""
            }
        };
        
        $scope.getNodesData = function(){
            nodeService.getNodes().then(function(res){
                
                $scope.nodesData = res.data;
                drawCircles($scope.nodesData);
                drawText($scope.nodesData);
                calculatePointsOnCircle($scope.nodesData);
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
            $scope.nodeObj.parentNode = [1];
            $scope.nodeObj.parentXY = {x: ($(window).width()) / 2, y: ($(window).height()) / 2}
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

        var calculatePointsOnCircle = function(dataArray) {       //calculating all the points on all the circles, so I'll have to do a rotatedPoints array for each axle/parentNode
            
            var sortedDataArray = [],
                sortedGroups = 0,
                rotatedPoints = [];
            
            for (var i = 0; i < dataArray.length; i++) {        //group nodes in array based on parent array
                if (i === 0){
                    sortedDataArray[0] = [];
                    sortedDataArray[0].push(dataArray[0]);
                }
                for (var j = 0; j <= sortedDataArray.length; j++) {
                    if (dataArray[i].parentNode[0] == sortedDataArray[j][0].parentNode[0]) {
                        sortedDataArray[j].push(dataArray[i]);
                        break;
                    } else {
                        sortedGroups++;
                        sortedDataArray[sortedGroups] = [];
                        sortedDataArray[sortedGroups].push(dataArray[i]);
                        break;
                    }
                }
            }
//            console.log(sortedDataArray); 
            //Loop through each group and calculate their xys.
            for(var i = 0; i < sortedDataArray.length; i++) {
                for(var j = 0; j < sortedDataArray[i].length; j++) {
                    var topPoint = g.point(sortedDataArray[i][j].parentXY.x, sortedDataArray[i][j].parentXY.y - 40);
                    var origin = g.point(sortedDataArray[i][j].parentXY.x, sortedDataArray[i][j].parentXY.y);
                    var rotationAngle = (360 - (i * (360 / (sortedDataArray[j].length)))); 
                    dataArray[i].nodeXY = topPoint.rotate(origin, rotationAngle);
//                    dataArray[i].nodeXY.x = rotatedPoint.x;
//                    dataArray[i].nodeXY.y = rotatedPoint.y;
                }
            }   
        }
        
        var makeFocus = function(nodeId) {
            //find the node? have it passed in?
            //change the node's xy to the middle of the screen
            //recalculate the xy's for all nodes with the new middle point
            //return the new $scope.nodesData
        }
        
        var canvas = d3.select(".canvas")          //Does not update when window is resized.
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("background", "white");

        var centralNode = d3.select("svg")
            .append("rect")
            .attr({
                x: documentWidth / 2 - 20,
                y: documentHeight / 2 - 20,
                width: 40,
                height: 40,
                rx: 20,
                ry: 20,
                fill: "#6b4423",
                focus: true
            })
        
        centralNode.on("click", function(){
            $scope.nodeObj.content.text = "Scott";
            $scope.addNode();
        })

        var drawCircles = function(dataArray){
            calculatePointsOnCircle(dataArray);

            circles = d3.select("svg")
                .selectAll("circle")
                .data(dataArray, function(d){return d._id});

            circles
                .enter()
                .append("circle")
                .attr("cx", function(d) { return d.parentXY.x })
                .attr("cy", function(d) { return d.parentXY.y })
                .attr("r", 40)
                .style("fill","blue")
                .transition()
                .duration(1500)
                .ease('elastic')
                .attr("cx", function(d, i) { return dataArray[i].nodeXY.x })
                .attr("cy", function(d, i) { return dataArray[i].nodeXY.y });


            circles
                .transition()
                .duration(1500)
                .ease('elastic')
                .attr("cx", function(d, i) { return dataArray[i].nodeXY.x })
                .attr("cy", function(d, i) { return dataArray[i].nodeXY.y });

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
                })
                .on("click", function(e){
                    var el = e.target;
                    if(!el.getAttribute("focus")){
                                        //Set the el as the focus and transition everything around it. (probably a function)
                    }
                });
        }

        var drawText = function(dataArray) {
            calculatePointsOnCircle(dataArray);
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
                .attr("x", function(d, i){return dataArray[i].nodeXY.x - 25})
                .attr("y", function(d, i){return dataArray[i].nodeXY.y + 5})
                .text(function(d){ return d.content.text;})
                .attr("fill", "white")
                .style("stroke","black")
                .style("stroke-width",".5px")

            text
                .transition()
                .duration(1000)
                .ease('elastic')
                .attr("x", function(d, i){return dataArray[i].nodeXY.x - 25})
                .attr("y", function(d, i){return dataArray[i].nodeXY.y + 5})
                .text(function(d){ return d.content.text;})
                .attr("fill", "white")
                .style("stroke","black")
                .style("stroke-width",".5px");

        }

        }
    ]);