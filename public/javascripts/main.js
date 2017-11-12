angular.module('look-alike', [])
	.controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	$scope.image_url;
	$scope.similar_image;
	$scope.search = function() {
		var hash = 234127348172834791873498;
		var url = '/search?q=' + hash;
		console.log(url);
		$http.get(url)
			.then(function onSuccess(response) {
				console.log(response);
				var data = response.data;
			}, function onError(response) {
				console.log("error!");
			});	
	}	
}
