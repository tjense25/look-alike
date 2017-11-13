var express = require('express');
var imageHash = require('image-hash');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect('mongodb://localhost/celebrityDB', {useMongoClient: true});
var celebritySchema = mongoose.Schema({
	Name:String,
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
  image_url = req.query.q
  var hash = "";
  imageHash(image_url, 16, true, (error, data) => { 
	if(error) console.log("error!")
	else { 
		console.log(data);
		hash = data;
	}
   });
});
router.post('/celebrity', function(req,res,next) {
	console.log("celebrity post");
	var celebrityObj = req.body;
	var hash = "";
	imageHash(celebrityObj.image_url, 16, true, (error, data) => {
		if(error) console.log("error!")
		else {
			console.log(data);
			hash = data;
		}
	});
	celebrityObj.hash = hash;
	var newcelebrity = new Celebrity(celebrityObj);
	newcelebrity.save(function(err,post) {
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});

module.exports = router;
