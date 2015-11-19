angular.module('example')

    .service('nodeService', ['$http', '$q', function($http, $q){
    
        var dfd = $q.defer();
        
        this.getNodes = function(){
            $http.get('/api/nodes')
                .then(function(err){
                    if(err) throw err;
                }, function(data){
                    console.log(data);
                })
        
        }
        
        this.createNode = function(nodeObj){
            
            $http.post('/api/nodes', nodeObj)
                .then()
        }
        
    }])