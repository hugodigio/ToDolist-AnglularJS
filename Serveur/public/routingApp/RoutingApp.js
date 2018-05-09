var app = angular.module('app', ["ui.router"]);

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

function setCookie(cName, cValue, dureeHeure) {
    var d = new Date();
    d.setTime(d.getTime() + (dureeHeure *60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}

function getCookie(cName) {
    var name = cName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; ++i) {
        var c = ca[i];
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cName) {
    var t = getCookie(cName);
    return t != "";
}