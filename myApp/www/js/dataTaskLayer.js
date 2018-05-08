//declaration
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//for generate GUID
var uuidv4 = require("uuid/v4");


mongoose.connect('mongodb://localhost/todo', function (err) {
    if(err){
        throw err;
    }else{
        console.log('mongo connected');
    }
});

//declare schema TASK
var TaskSchema = Schema({
    _id:String,
    name:String,
    done:Boolean
});

//declare schema USER
var UserSchema = Schema({
    _id:String,
    identifiant:String,
    identifiant:Boolean
});

//Init Task model
var TaskModel = mongoose.model('tasks', TaskSchema);
var UserModel = mongoose.model('Users', UserSchema);

module.exports = {
    getTaskSet: function(cb){
        TaskModel.find(null, function (err, taskset) {
            if(err){
                throw err;
            }else{
                cb(taskset);
            }
        });
    },

    findTaskById: function(id, cb){
        TaskModel.findById(id,function(err, task){
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
        TaskModel.findByIdAndUpdate(task.id, task, function(err, task){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    addTask: function(task, cb){
        var taskToSave = new TaskModel({
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
        TaskModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    },
    getUserSet: function(cb){
        UserModel.find(null, function (err, userset) {
            if(err){
                throw err;
            }else{
                cb(userset);
            }
        });
    },

    findUserById: function(id, cb){
        UserModel.findById(id,function(err, user){
            if(err){
                throw err;
            }else{
                if(user!=null){
                    cb();
                }
            }
        });
    },

    updateUser: function(user, cb){
        UserModel.findByIdAndUpdate(user.id, user, function(err, user){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    addUser: function(user, cb){
        var userToSave = new TaskModel({
            _id:task.id,
            identifiant:user.identifiant,
            motdepasse:user.motdepasse
        });
        userToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteUserById: function(id, cb){
        UserModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    }
};
