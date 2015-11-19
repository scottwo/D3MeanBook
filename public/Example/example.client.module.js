angular.module('example', ['ui.router', 'example'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvder){
    
        $locationProvder.hashPrefix('!');
    
        $urlRouterProvider.otherwise('/')
        
        $stateProvider
            .state('example', {
                url: '/',
                templateUrl: 'example/views/example.client.view.html'
            })
    }])