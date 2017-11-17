var mongoose = require('mongoose');
var CelebritySchema = new mongoose.Schema({
	name:String,
	imgsrc: String,
	hash: Number
});
mongoose.model('Celebrity', CelebritySchema);
