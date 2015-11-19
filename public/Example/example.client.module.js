angular.module('example', ['ui.router', 'example', 'users', 'd3'])

    .config(['$locationProvider', function($locationProvder){
    
        $locationProvder.hashPrefix('!');
    
        if (window.location.hash === '#_=_') window.location.hash = '#!';
    }])