var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');//連接到mongoDB

var voteSchema = new mongoose.Schema({
    account: String,
    name: String, 
    title: String,
    option : Array,
    postdate:Date
},{versionKey:false})
voteSchema.set('collection', 'vote');
var model = mongoose.model('vote', voteSchema);

module.exports = model;