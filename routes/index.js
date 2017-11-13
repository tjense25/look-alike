var express = require('express');
var imageHash = require('image-hash');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect('mongodb://localhost/celebrityDB', {useMongoClient: true});
var celebritySchema = mongoose.Schema({
	name:String,
	imgsrc: String,
	hash: String
});

var Celebrity = mongoose.model('Celebrity', celebritySchema);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){ console.log("coneccted to the Database");});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/search', function(req,res,next) {
  console.log("in Search!");
  image_url = req.query.q;
  imageHash(image_url, 16, true, (error, data) => { 
	if(error) console.log("error!")
	else { 
		findClosest(data);	
	}
   });
   var findClosest = function(data) {
	Celebrity.find(function(err, celebrityList) {
		if(err) return console.error(err);
		var hash = parseInt("0x" + data)
		var min = Math.abs(parseInt("0x" + celebrityList[0].hash) - hash)
		var min_pos = 0;
		for(i = 0; i < celebrityList.length; i++) {
			var value = Math.abs(parseInt("0x" + celebrityList[i].hash) - hash)
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
	imageHash(req.body.imgsrc, 16, true, (error, data) => {
		if(error) console.log("image could not be hashed")
		else {
			var celebrityObj = {name:req.body.name, imgsrc:req.body.imgsrc, hash:data};
			console.log(celebrityObj);
			var newcelebrity = new Celebrity(celebrityObj);
			newcelebrity.save(function(err,post) {
				if(err) return console.error(err);
				console.log(post);
				res.sendStatus(200);
			});
		}
	});

});

module.exports = router;
