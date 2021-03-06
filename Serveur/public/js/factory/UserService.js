app.factory('UserService',['$http',function($http){
    var server = {};

    server.register = function(login,password,cb){
            var req = {
                identifiant: login,
                motdepasse: password
            };

            $http.post(config.serverip+"/api/users/register",req)
                 .then(function(resp){
                     cb(resp);
                 })
                 .catch(function(err){
                     alert(err.data.erreur);
                 })
    };

    server.login = function(login,password,cb){
        var req = {
            identifiant: login,
            motdepasse: password
        };

        $http.post(config.serverip+"/api/users/login",req)
             .then(function(resp){
                 cb(resp);
             })
             .catch(function(err){
                 alert(err.data.erreur);
             })
};

    return server;
}]);