var devListApp = angular.module('devListApp', ['ngRoute', 'ngResource']);

devListApp.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'page/devlist.htm'
    })
});


devListApp.controller('mainController', ['$scope', '$resource', function($scope, $resource) {
        $scope.devListResult = [];
    
        $scope.selectedIndex = null;


        $scope.viewDetail = function(index) {
            $scope.selectedIndex = index;
        }

    List().get({location:'lagos'}).then(function(response) {
        $scope.devListResult = response.items;
    }, function(error) {
        alert("Network error occurred");
    });
    
    function List() {
        var $req = $resource("https://api.github.com/search/users?q=location::location&page=:page", { }, {get: {method: "GET", isArray:false, params: {location:'@location'}}});
        return {
            get: function(params) { return $req.get(params).$promise;}
        }
    }
}])