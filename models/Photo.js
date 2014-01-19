/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午6:23
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');
var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);
