app.factory('UserService',['$http',function($http){
    var server = {};

    server.register = function(login,password,cb){
            var req = {
                identifiant: login,
                motdepasse: password
            };

            $http.post("/api/users/register",req)
                 .then(function(resp){
                     cb(resp);
                 })
                 .catch(function(err){
                     alert(err.data.error);
                 })
    };

    return server;
}]);