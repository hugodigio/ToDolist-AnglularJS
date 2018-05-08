app.controller('UserCtrl',["$scope", "$http", 'UserService', function($scope, $http, UserService){
    $scope.register = function(){
        if($scope.loginR && $scope.passwordR ){
            UserService.register($scope.loginR, $scope.passwordR, function(resp){
                console.log(resp);
                alert("enregistré");
            });
        }
    };
}]);