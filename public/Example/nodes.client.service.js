angular.module('example')

    .service('nodeService', ['$http', '$q', function($http, $q){
    
        
        
        this.getNodes = function(){
            var dfd = $q.defer();
            $http.get('/api/nodes')
                .then(function(data){
                    dfd.resolve(data);
                }, function(err){
                    if(err) throw err;
                })
            return dfd.promise;
        }
        
        this.createNode = function(nodeObj){
            var dfd = $q.defer();
            //Need to add _id before I send a new node.
            $http.post('/api/nodes', nodeObj)
                .then(function(res){
                    console.log(res);
                    dfd.resolve(res.data);
                });
            return dfd.promise;
        }
        
    }])