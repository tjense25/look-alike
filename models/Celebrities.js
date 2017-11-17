var mongoose = require('mongoose');
var CelebritySchema = new mongoose.Schema({
	title:String,
	imgsrc: String,
	hash: Number
});
mongoose.model('Celebrity', CelebritySchema);
