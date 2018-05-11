var mongoose = require("mongoose");

var todoModel = require("../models/todoModel");
var userModel = require("../models/userModel");

var uuidv4 = require("uuid/v4");

var jwtUtils = require("../utils/jwt.utils.js");

module.exports = {
    addTask: function(req, res) {
        //var headerAuth = req.header['authorization'];
        var token = req.body.token;
        var identifiant = jwtUtils.getUserId(token);
        console.log("token : " + token);    // affD

        var name = req.body.todoname;


        // On vérifie que le nom et le token ne sont pas vides
        if(name == null) {
            return res.status(400).json({ 'error': 'nom de tâche vide' });
        }
        if(identifiant < 0) {
            return res.status(401).json({ 'error': 'vous devez vous connecter, votre token a expiré' });
        }

        userModel.UserModel.findOne(
            { '_id': identifiant },
            {motdepasse: 0}
        )
            .then(function(userFound) {
                if(userFound) {
                    var newTask = new todoModel.TodoModel({
                        _id: uuidv4(),
                        identifiant: identifiant,
                        name: name,
                        done: false});

                    newTask.save()
                        .then(function() {
                        console.log('tache ajoutée pour le user ' + userFound.nomUti);
                        return res.status(201).json({ '_id': newTask._id });
                    });
                }
                else {
                    res.status(404).json({ 'error': 'utilisateur non trouvé' });
                }
            });
    },

    getTaskSet: function(req, res) {
        var token = req.body.token;
        var identifiant = jwtUtils.getUserId(token);

        console.log("identifiant: "+identifiant);

        if(identifiant < 0){
            return res.status(401).json({ 'error': 'vous devez vous connecter, votre token a expiré' });
        }
        // On recupere les taches de l'utilisateur
        todoModel.TodoModel.find(
            {'identifiant': identifiant}
        )
            .then(function (tasks) {
                return res.status(200).json(tasks);
            });

    },

    updateTask: function(req, res) {
        var token = req.body.token;
        var _id = req.body.task._id;
        // On a déjà l'id de l'utilisateur dans la tache, mais ici on regarde le token
        var identifiant = jwtUtils.getUserId(token);

        var task = req.body.task;
        if(identifiant < 0){
            return res.status(401).json({ 'error': 'vous devez vous connecter, votre token a expiré' });
        }

        todoModel.TodoModel.updateOne(
            {_id: _id, identifiant: identifiant},
            task
        )
            .then(function () {
                console.log("tâche modifiée");      // affD
                return res.status(200).json({'id': task._id});
            });
    },

    deleteTask: function(req, res) {
        var token = req.body.token;
        var _id = req.body._id;
        // On a déjà l'id de l'utilisateur dans la tache, mais ici on regarde le token
        var identifiant = jwtUtils.getUserId(token);

        if(identifiant < 0){
            return res.status(401).json({ 'error': 'vous devez vous connecter, votre token a expiré' });
        }

        todoModel.TodoModel.remove(
            {_id: _id, identifiant: identifiant}
        )
            .then(function () {
                console.log("tâche supprimée"); //affD
                return res.status(200).json({'success': true});
            });

    }
}
