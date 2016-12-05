var app = angular.module('instGallery',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/gallery', {
			templateUrl: 'views/gallery.view.html',
			controller: 'GalleryCtrl'
		})
		.otherwise({redirectTo: '/gallery'});
}]);