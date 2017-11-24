angular.module('look-alike', [])
	.controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	$scope.image_url;
	$scope.input_url;
	$scope.lookalike_image;
	$scope.celebrity_url
	$scope.celebrityname
	$scope.show_button = true;
	$scope.getImageBase64= function(celebrity, hashFunc, callback) {
		var url = '/base64?q=' + celebrity.imgsrc;
		$http.get(url)
			.then(function onSuccess(response) {
				celebrity.hash = hashFunc(response.data.base64);
				callback(celebrity);
			});
	}
	$scope.readURL = function(input) {
		console.log('in readURL');
		$scope.image_url = "";
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
	$scope.hash = function(base64) {
	  var hash = 0
	  if (base64.length === 0) return hash;
	  for (var i = 0; i < base64.length; i++) {
	    var chr   = base64.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; 
	  }
	  return hash;
	}
	$scope.search = function() {
		if(!$scope.input_url) return;
		var base64;
		if($scope.image_url == "") {
			base64 = $scope.input_url.replace(/^data:image\/(png|jpg);base64,/, "");
			var hash = $scope.hash(base64);
			var url = '/search?q=' + hash;
			$http.get(url)
			   .then(function onSuccess(response) {
				console.log(response);
				$scope.lookalike_image  = response.data;
			}, function onError(response) {
				console.log("Could not hash photo!!!");
				$lookalike_image = null;
			});	
		}
		else {
			var myObj = {
				name: "",
				imgsrc: $scope.image_url,
				hash: 0
			}
			$scope.getImageBase64(myObj, $scope.hash, function(data){
				console.log(data);
				var url = '/search?q=' + data.hash;
				$http.get(url)
					.then(function onSuccess(response) {
						console.log(response);
						$scope.lookalike_image = response.data;
				}, function onError(response) {
					console.log("Could not hash photo!!!");
					$lookalike_image = null;
				});
			});
		}
	}
	$scope.addCelebrity = function() {
		console.log("in addCelebrity");
		var myObj = {
			name: $scope.celebrityname,
			imgsrc: $scope.celebrity_url,
			hash: 0
		}
		$scope.getImageBase64(myObj, $scope.hash, function(data) {
			console.log(data);
			jobj = JSON.stringify(data);
			console.log(jobj);
			var url = "/celebrity";
			console.log("about to post!");
			$http.post(url, jobj)
			     .then(function onSuccess(response) {
				console.log(" successfully added to the database!");
			});
		
		});
		$scope.celebrity_url = "";
		$scope.celebrityname = "";
	}
	$scope.showExplanation = function(){
		$scope.show_button = false;
	}
}
