angular.module('example')
    
    .controller('ExampleController', ['$scope', 'Authentication', 'nodeService', function($scope, Authentication, nodeService){
    
        $scope.name = Authentication.user ? Authentication.user.fullName : 'Mean Application';
        
        $scope.addNode = function(){
            nodeService.createNode($scope.nodeObj);
        };
    
    }])