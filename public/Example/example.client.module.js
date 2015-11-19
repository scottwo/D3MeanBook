angular.module('example', ['ui.router', 'example', 'users'])

    .config(['$locationProvider', function($locationProvder){
    
        $locationProvder.hashPrefix('!');
    
        if (window.location.hash === '#_=_') window.location.hash = '#!';
    }])