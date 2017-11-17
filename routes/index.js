var express = require('express');
var imageHash = require('image-hash');
var mongoose = require('mongoose');
var Celebrity = mongoose.model('Celebrity');
var i2b = require("imageurl-base64");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/search', function(req,res,next) {
  console.log("in Search!");
  hash_string  = req.query.q;
  console.log(hash_string);
  console.log("in findClosest");
	Celebrity.find(function(err, celebrityList) {
		console.log("in Celebrity.find");
		if(err) return console.error(err);
		var min = celebrityList[0].hash;
		var min_pos = 0;
		var hash = parseInt(hash_string);
		for(i = 0; i < celebrityList.length; i++) {
			var value = Math.abs(celebrityList[i].hash - hash);
			if(value < min) {
				min = value;
				min_pos = i;
			}
		}
		console.log(celebrityList[min_pos]);
		res.json(celebrityList[min_pos]);
	});
});
router.post('/celebrity', function(req,res,next) {
	console.log("in celebrity");
	var celebrityObj = req.body;
	console.log(celebrityObj);
	var newcelebrity = new Celebrity(celebrityObj);
	newcelebrity.save(function(err,post) {
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});
router.get('/base64', function(req, res, next) {
	console.log("in base64");
	image = req.query.q;
	i2b(image, function(err, data) {
		if(err) res.sendStatus(500);
		else {
			var myObj = {base64: data.base64};
			res.json(myObj);
		}
	});
});
		
module.exports = router;
