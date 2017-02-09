// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'HomeController'
    }).when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'ForecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "London";
    
});

// CONTROLLERS
weatherApp.controller('HomeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city; 
    });
       
}]);

weatherApp.controller('ForecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource("http://api.apixu.com/v1/forecast.json?key=01d2c236a3e84ccb94f145158170901", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, days: 2 });
    $scope.weatherResult.then(function(response){
        console.log(response);
    }).catch(function(err){
        console.log(err);
    })
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);