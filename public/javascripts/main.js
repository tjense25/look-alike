angular.module('look-alike', [])
	.controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	$scope.image_url;
	$scope.input_url;
	$scope.similar_image;
	$scope.readURL = function(input) {
		console.log('in readURL');
		if(input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				console.log(e);
				$scope.input_url = e.target.result
				$scope.$apply()
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
	$scope.preview = function() {
		$scope.input_url = $scope.image_url;
	}
	$scope.search = function() {
		var url = '/search?q=' + $scope.input_url;
		$http.get(url)
			.then(function onSuccess(response) {
				console.log(response);
				var data = response.data;
			}, function onError(response) {
				console.log("error!");
			});	
	}	
}
