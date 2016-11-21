angular.module("kB")

.controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/articles').success(function(data){
        $scope.articles = data;
    });
}])

.controller('ArticlesCategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get('/articles/category/' + $routeParams.category).success(function(data){
        $scope.cat_articles = data;
        $scope.category = $routeParams.category;
    });
}])

.controller('ArticleDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $http.get('/articles/' + $routeParams.id).success(function(data){
        $scope.article = data;
    });

    $scope.removeArticle = function(){

        $http.delete('/articles/'+$routeParams.id)

            .success(function(data){
                console.log(data);
            });


        // $http.delete('/articles/'+$routeParams.id).success(function(data){
        //     console.log(data);
        // });

        $location.path('/articles');

    };


}]);