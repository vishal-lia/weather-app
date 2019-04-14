// MODULE
let weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// CONFIG
weatherApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController' 
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });
});

// CUSTOM SERVICES
weatherApp.service('cityService', function() {
    this.city = 'Bengaluru';
});

// CUSTOM DERECTIVES
weatherApp.directive('panel', function() {
    return {
        templateUrl: 'directives/panel.html',
        replace: true,
        scope: {
            weatherReport: '=',
            convertDate: '&',
            dateFormat: '@'
        }
    }
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$log', 'cityService', function($scope, $log, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', '$routeParams', 'cityService', 
    function($scope, $log, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource('https://api.openweathermap.org/data/2.5/forecast');

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        units: 'metric',
        cnt: $scope.days,
        APPID: '8e29690c7b634c884826bc4e3fa20145'
    });

    $scope.convertDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);
