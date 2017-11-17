angular.module('look-alike', [])
	.controller('myCtrl', ['$scope', '$http', myCtrl]);

function myCtrl($scope, $http) {
	$scope.never = false;
	$scope.image_url;
	$scope.input_url;
	$scope.lookalike_image;
	$scope.celebrity_url
	$scope.celebrityname
	$scope.getImageBase64= function(img) {
          img.crossOrigin="Anonymous";
	  var canvas = document.createElement("canvas");
	  canvas.width = img.width;
	  canvas.height = img.height;
	  var ctx = canvas.getContext("2d");
	  ctx.drawImage(img, 0, 0);
	  var dataURL = canvas.toDataURL("image/png");
	  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
	  if (this.length === 0) return hash;
	  for (var i = 0; i < this.length; i++) {
	    var chr   = this.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	}
	$scope.search = function() {
		if(!$scope.input_url) return;
		var base64 = $scope.getImageBase64(document.getElementById("preview"));
		var hash = $scope.hash(base64);
		var url = '/search?q=' + hash;
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
		var base64 = $scope.getImageBase64(document.getElementById("databaseImage"));
		var hash = base64.toHash();
		var myObj = {
			name: $scope.celebrityname, 
			imgsrc: $scope.celebrity_url, 
			hash: hash
		};
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
