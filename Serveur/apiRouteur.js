var express = require("express");
var usersCtrl = require("./routes/userLayer");
var todoCtrl  = require("./routes/todoLayer");

exports.router = (function(){
    var apiRouteur = express.Router();

    apiRouteur.route("/users/register/").post(usersCtrl.register);
    apiRouteur.route("/users/login/").post(usersCtrl.login);
    apiRouteur.route("/users/getUser/").get(usersCtrl.getUserProfile);

    apiRouteur.route("/todo/getTaskSet").post(todoCtrl.getTaskSet);
    apiRouteur.route("/todo/deleteTask").post(todoCtrl.deleteTask);
    apiRouteur.route("/todo/updateTask").post(todoCtrl.updateTask);
    apiRouteur.route("/todo/addTask").post(todoCtrl.addTask);

    return apiRouteur;
})();