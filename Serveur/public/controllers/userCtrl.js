app.controller('UserCtrl',["$scope", "$http", 'UserService', function($scope, $http, UserService){
    $scope.register = function(){
        if($scope.loginR && $scope.passwordR ){
            UserService.register($scope.loginR, $scope.passwordR, function(resp){
                console.log(resp);
                alert("enregistré");
            });
        }
    };
    $scope.login = function(){
        if($scope.loginL && $scope.passwordL ){
            UserService.login($scope.loginL, $scope.passwordL, function(resp){
                console.log(resp);
                alert("connecté");
            });
        }
    };
}]);