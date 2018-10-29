var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
},{versionKey:false})
memberSchema.set('collection', 'member');
var model = mongoose.model('member', memberSchema);

module.exports = model;