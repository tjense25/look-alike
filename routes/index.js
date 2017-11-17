var express = require('express');
var imageHash = require('image-hash');
var mongoose = require('mongoose');
var Celebrity = mongoose.model('Celebrity');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/search', function(req,res,next) {
  console.log("in Search!");
  hash  = req.query.q;
  findClosest(hash);
  var findClosest = function(data) {
	Celebrity.find(function(err, celebrityList) {
		if(err) return console.error(err);
		var min = celebrityList[0].hash;
		var min_pos = 0;
		for(i = 0; i < celebrityList.length; i++) {
			var value = Math.abs(celebrityList[i].hash - data);
			if(value < min) {
				min = value;
				min_pos = i;
			}
		}
		console.log(celebrityList[min_pos]);
		res.json(celebrityList[min_pos]);
	});
    };
});
router.post('/celebrity', function(req,res,next) {
	console.log("in celebrity post");
	var hash;
	var celebrityObj = {name:req.body.name, imgsrc:req.body.imgsrc, hash:data};
	console.log(celebrityObj);
	var newcelebrity = new Celebrity(celebrityObj);
	newcelebrity.save(function(err,post) {
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});


module.exports = router;
