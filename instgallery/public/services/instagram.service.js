angular.module('instGallery')

.factory('instagram', function($resource){
	return {
		fetchPopular: function(callback){
			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK', {
				client_id: '	47be008ee87e47b7a7b03ab87deacd08'
			},{
				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){
				callback(response.data);
			});
		}
	}
})