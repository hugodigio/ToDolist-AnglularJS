var mongoose = require("mongoose");

var TodoModel = require("../models/todoModel");
var uuidv4 = require("uuid/v4");

var jwUtils = require("../utils/jwt.utils.js");

module.exports = {
    getTasks: function(cb){
        TodoModel.find(null, function (err, taskset) {
            if(err){
                throw err;
            }else{
                cb(taskset);
            }
        });
    },

    findTaskById: function(id, cb){
        TodoModel.findById(id,function(err, task){
            if(err){
                throw err;
            }else{
                if(task!=null){
                    cb();
                }
            }
        });
    },

    updateTask: function(task, cb){
        TodoModel.findByIdAndUpdate(task.id, task, function(err, task){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    addTask: function(task, cb){
        var taskToSave = new TodoModel({
            _id:task.id,
            name:task.name,
            done:task.done
        });
        taskToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteTaskById: function(id, cb){
        TodoModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    }
}
