angular.module('look-alike', [])
	.controller('Ctrl', ['$scope', '$http', Ctrl]);

function Ctrl($scope, $http) {
	$scope.image-url = null;
	$scope.similar-image;
	$scope.search = function() {
		var hash = 234127348172834791873498;
		var url = '/search?q=' + hash;
		cosole.log(url);
		$http.get(url)
			.then(function onSuccess(response) {
				console.log(response);
				var data = response.data;
			}, function onError(response) {
				console.log("error!");
			});	
	}	
}
