var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');//連接到mongoDB

var articleSchema = new mongoose.Schema({
    account:String,
    name:String,
    type: String,
    title: String,
    content: String,
    like:Array,
    comment:Array,
    postdate:Date
},{versionKey:false})
articleSchema.set('collection', 'article');
var model = mongoose.model('article', articleSchema);

module.exports = model;

// comment:[{id:Number,account:String,message:String,like:Array,date:Date}]