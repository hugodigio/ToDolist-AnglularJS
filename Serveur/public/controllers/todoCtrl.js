app.controller('TodoCtrl',["$scope", "$http", 'TodoService', function($scope, $http, TodoService){
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
        // Ajout dans la liste

        TodoService.addTask($scope.taskInputName, function(res){
            if(res){
                console.log(res);
                console.log("task added");
                $scope.load();
            }
        });
        $scope.taskInputName = "";
    };

    $scope.update = function(task){

        TodoService.updateTask(task, function(res){
            console.log(res);
            $scope.load();
        });
    }

    $scope.delete = function(task){
        var index = $scope.taskList.indexOf(task);
        $scope.taskList.splice(index,1);

        TodoService.deleteTask(task._id, function(res){
            console.log(todo);
            $scope.load();
        });
    };

    $scope.store = function(){
        localStorage.setItem("taskList", JSON.stringify($scope.taskList));
    };

    $scope.load = function(){
        TodoService.getTasks(function(res){
            $scope.taskList = res;
        });
    };

    $scope.load();


}]);