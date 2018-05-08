var mongoose = require("mongoose");

var userModel = require("../models/userModel");
var uuidv4 = require("uuid/v4");

/*var bcrypt = require("bcrypt");
var jwUtils = require("./../utils/jwt.utils.js");*/

mongoose.connect("mongodb://localhost/todo",function(err){
    if(err) {
        throw err;
    } else{
        console.log('mongo connected');
    }
});

module.exports = {
    register: function(req, res){
        var identifiant = req.body.identifiant;
        var motdepasse  = req.body.motdepasse;

        if(identifiant == null || motdepasse == null){
            return res.status(400).json({"error":"entrez un mot de passe et un identifiant"});
        }

        userModel.UserModel.findOne(
            {identifiant: identifiant},
            {motdepasse: 0}
        )
            .then(function(userFound){
                console.log(userFound);
                if(!userFound){
                    var newUser = new userModel.UserModel({
                        _id: uuidv4(),
                        identifiant: identifiant,
                        motdepasse: motdepasse
                    });
                    newUser.save()
                        .then(function() {
                            console.log("utilisateur ajouté");
                            return res.status(201).json({ "_id": newUser._id});    
                        });
                } else {
                    return res.status(409).json({"erreur": "utilisateur existe deja"});
                }
            })
    }
};