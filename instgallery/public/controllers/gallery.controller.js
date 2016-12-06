angular.module('instGallery')

.controller('GalleryCtrl',['$scope','instagram', function($scope, instagram){
	
	$scope.images = [];			//array

	instagram.fetchPopular(function(data){
		console.log(data);
		$scope.images = data; 	//make the arry hold the data from the function 
	})
}])