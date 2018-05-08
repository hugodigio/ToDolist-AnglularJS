// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



var app = angular.module('starter', ['ionic'])
var ip  = "http://localhost:8095" 

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller("testCtrl",["$scope",function($scope){
  console.log("in");
  $scope.name = "Hugo";
}]);

app.controller("todoListCtrl",["$scope", "$http", 'todoService', function($scope, $http, todoService){

  $scope.taskList = [];

  $scope.howManyDone = function(){
      count = 0;
      $scope.taskList.forEach(element => {
          if(element.done){
              count++
          }
      });
      return count;
  };

  $scope.howManyNotDone = function(){
      return $scope.taskList.length
          -$scope.howManyDone();
  };

  $scope.addTask = function(){
      todoService.addTask($scope.taskInputName, function(res){
          if(res){
              console.log(res);
              console.log("task added");
              $scope.load();
          }
      });
      $scope.taskInputName = "";
  };

  $scope.update = function(task){

      todoService.updateTask(task, function(res){
          console.log(res);
          $scope.load();
      });
  }

  $scope.delete = function(task){
      var index = $scope.taskList.indexOf(task);
      $scope.taskList.splice(index,1);

      todoService.deleteTask(task._id, function(res){
          $scope.load();
      });
  };

  $scope.store = function(){
      localStorage.setItem("taskList", JSON.stringify($scope.taskList));
  };

  $scope.load = function(){
      todoService.getTaskSet(function(res){
          $scope.taskList = res;
      });
  };

  $scope.load();


}]);

app.factory('todoService',['$http',function($http){
  var server = {};

  server.addTask = function (name, cb) {
      var req = {
          name:name
      };
      console.log(req);
      $http.post(ip+'/addTask', req)
          .then(function (res) {
              cb(res);
          });
  };

  server.deleteTask = function(id, cb){
      var req = {id: id};
      $http.post(ip+'/deleteTask', req)
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
      $http.post(ip+'/updateTask', req)
          .then(function(res){
              cb(res);
          });
  };

  server.getTaskSet = function (cb) {
      $http.post(ip+'/getTaskSet')
          .then(function (resp) {
              console.log(resp);
              cb(resp.data.taskSet);
          });
  };

  return server;
}]);

app.controller("UsersListCtrl",["$scope", "$http", 'todoService', function($scope, $http, todoService){

    $scope.taskList = [];

}]);

app.factory('userService',['$http',function($http){
    var server = {};
  
    server.addUser = function (identifiant, motdepasse, cb) {
        var req = {
            identifiant:identifiant,
            motdepasse:motdepasse
        };
        console.log(req);
        $http.post(ip+'/addUser', req)
            .then(function (res) {
                cb(res);
            });
    };
  
    server.deleteUser = function(id, cb){
        var req = {id: id};
        $http.post(ip+'/deleteUser', req)
            .then(function(res){
                cb(res);
            });
    };
  
    server.updateUser = function(user, cb){
        var req = {
            id:user._id,
            identifiant:user.identifiant,
            password:user.password
        };
        $http.post(ip+'/updateUser', req)
            .then(function(res){
                cb(res);
            });
    };
  
    server.getUserSet = function (cb) {
        $http.post(ip+'/getUserSet')
            .then(function (resp) {
                console.log(resp);
                cb(resp.data.userSet);
            });
    };
  
    return server;
  }]);