var express = require("express");
var usersCtrl = require("./routes/UserLayer");
/*var todoCtrl  = require("./routes/TodoLayer");*/

exports.router = (function(){
    var apiRouteur = express.Router();

    apiRouteur.route("/users/register/").post(usersCtrl.register);
    apiRouteur.route("/users/login/").post(usersCtrl.login);

    return apiRouteur;
})();