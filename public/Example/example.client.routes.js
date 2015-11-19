angular.module('example')

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/')
        
        $stateProvider
            .state('example', {
                url: '/',
                templateUrl: 'example/views/example.client.view.html'
            })
            
    }])