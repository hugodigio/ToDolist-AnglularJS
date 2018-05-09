app.factory('TodoService',['$http',function($http){
    var server = {};
    
    server.addTask = function (name, cb) {
        var req = {
            name:name
        };
        console.log(req);
        $http.post('/api/todo/addTask', req)
            .then(function (res) {
                cb(res);
            });
    };

    server.deleteTask = function(id, cb){
        var req = {id: id};
        $http.post('/api/todo/deleteTask', req)
            .then(function(res){
                cb(res);
            });
    };

    server.updateTask = function(task, cb){
        var req = {
            id:task._id,
            name:task.name,
            done:task.done
        };
        $http.post('/api/todo/updateTask', req)
            .then(function(res){
                cb(res);
            });
    };

    server.getTasks = function (cb) {
        $http.post('/api/todo/getTasks')
            .then(function (resp) {
                console.log(resp);
                cb(resp.data.taskSet);
            });
    };


    return server;
}]);