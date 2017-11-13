angular.module('look-alike', [])
	.controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	$scope.image_url;
	$scope.input_url;
	$scope.lookalike_image;
	$scope.celebrity_url
	$scope.celebrityname
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
				$scope.lookalike_image  = response.data;
			}, function onError(response) {
				console.log("Could not hash photo!");
				$lookalike_image = null;
			});	
	}	
	$scope.addCelebrity = function() {
		console.log("in addCelebrity");
		var myObj = {name: $scope.celebrityname, imgsrc: $scope.celebrity_url, hash: ""};
		jobj = JSON.stringify(myObj);
		var url = "/celebrity";
		$http.post(url, jobj)
		     .then(function onSuccess(response) {
			console.log(response);
			$scope.result = $scope.celebrityname + " successfully added to the database!";
		});
		$scope.celebrity_url = "";
		$scope.celebrityname = "";
	}
}
