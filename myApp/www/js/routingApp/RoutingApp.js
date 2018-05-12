var app = angular.module('starter', ["ui.router"]);

app.config(function($stateProvider){

    var loginState = {
        name: "login",
        url:  "/login",
        templateUrl: "ui-views/login.html",
        controller: "UserCtrl"
    }

    var signupState = {
        name: "signup",
        url:  "/signup",
        templateUrl: "ui-views/signup.html",
        controller: "UserCtrl"
    }

    var todoState = {
        name: "todo",
        url:  "/todo",
        templateUrl: "ui-views/list.html",
        controller: "TodoCtrl"
    }
    $stateProvider.state(loginState);
    $stateProvider.state(signupState);
    $stateProvider.state(todoState);
});