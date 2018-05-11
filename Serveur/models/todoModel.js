var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = Schema({
    _id:String,
    name:String,
    identifiant:String,
    done:Boolean
})

var TodoModel = mongoose.model("tasks",TodoSchema);

exports.TodoModel = TodoModel;