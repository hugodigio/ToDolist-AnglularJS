var mongoose = require("mongoose");

var userModel = require("../models/userModel");
var uuidv4 = require("uuid/v4");

var bcrypt = require("bcrypt");
var jwUtils = require("../utils/jwt.utils.js");

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
    },

    login: function(req, res){
        var identifiant = req.body.identifiant;
        var motdepasse  = req.body.motdepasse;

        if(identifiant == null || motdepasse == null){
            return res.status(400).json({"erreur":"entrez un mot de passe et un identifiant"});
        }
        userModel.UserModel.findOne(
            {identifiant: identifiant},
            {motdepasse: motdepasse}
        )
            .then(function(userFound) {
                if(userFound){
                    return res.status(200).json({
                        "_id": userFound._id,
                        "token": jwUtils.generateTokenForUser(userFound)
                    });
                } else {
                    return res.status(403).json({"erreur":"identifiant ou mot de passe incorrect"});
                }
            })
    },

    getUserProfile: function(req, res){
        var headerAuth = req.headers["authorization"];
        var userId     = jwUtils.getUserProfile(headerAuth);

        if (userId < 0){
            return res.status(400).json({"error": "wrong token"});
        }

        userModel.UserModel.findOne({
            attributes: ["_id","identifiant"],
            where: {_id: userId}
        }).then(function(user){
            if(user){
                res.status(201).json(user);
            }else{
                res.status(404).json({"erreur":"user not found"});
            }
        }).catch(function(err){
            res.status(500).json({"erreur":"cannot fetch user"});
        })
    }
};