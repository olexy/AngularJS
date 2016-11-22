var  app = angular.module('kB', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/categories', {
            templateUrl: 'views/categories.view.html',
            controller: 'CategoriesCtrl'
        }).
        when('/categories/details/:id', {
            templateUrl: 'views/categories_details.view.html',
            controller: 'CategoryDetailsCtrl'
        }).
        when('/categories/add', {
            templateUrl: 'views/add_category.view.html',
            controller: 'CategoryCreateCtrl'
        }).
        when('/categories/edit/:id', {
            templateUrl: 'views/edit_category.view.html',
            controller: 'CategoryEditCtrl'
        }).
        when('/articles', {
            templateUrl: 'views/articles.view.html',
            controller: 'ArticlesCtrl'
        }).
        when('/articles/details/:id', {
            templateUrl: 'views/articles_details.view.html',
            controller: 'ArticleDetailsCtrl'
        }).
        when('/articles/category/:category', {
            templateUrl: 'views/cat_articles.view.html',
            controller: 'ArticlesCategoryCtrl'
        }).
        when('/articles/add', {
            templateUrl: 'views/add_article.view.html',
            controller: 'ArticleCreateCtrl'
        }).
        when('/articles/edit/:id', {
            templateUrl: 'views/edit_article.view.html',
            controller: 'ArticleEditCtrl'
        }).
        otherwise({
            redirectTo: '/categories'
        });
}]);