var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserShema = Schema({
    _id:String,
    identifiant:String,
    motdepasse:String
})

var UserModel = mongoose.model("users",UserShema);

exports.UserModel = UserModel;