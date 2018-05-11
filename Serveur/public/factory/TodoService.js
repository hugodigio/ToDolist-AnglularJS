app.factory('TodoService',['$http',function($http){
    var server = {};
    
    server.addTask = function (todoname, cb) {
        var req = {
            token:getCookie("token"),
            todoname:todoname
        };
        console.log(req);
        $http.post('/api/todo/addTask', req)
            .then(function (res) {
                cb(res);
            });
    };

    server.deleteTask = function(id, cb){
        var req = {
            _id: id,
            token: getCookie("token")
        };
        $http.post('/api/todo/deleteTask', req)
            .then(function(res){
                cb(res);
            });
    };

    server.updateTask = function(task, cb){
        var req = {
            _id:task._id,
            task:task,
            token: getCookie("token")
        };
        $http.post('/api/todo/updateTask', req)
            .then(function(res){
                cb(res);
            });
    };

    server.getTaskSet = function (cb) {
        var req = {
            token: getCookie("token")
        }
        $http.post('/api/todo/getTaskSet', req)
            .then(function (res) {
                console.log(res);
                cb(res);
            });
    };


    return server;
}]);