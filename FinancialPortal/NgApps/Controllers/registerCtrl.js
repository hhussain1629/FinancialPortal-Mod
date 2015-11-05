'use strict';
//angular.module('app')
app.controller('registerCtrl', ['authSvc', '$timeout', '$state', function (authSvc, $timeout, $state) {

    this.savedSuccessfully = false;
    this.message = "Register a new account";
    this.isError = false;

    this.model = {
        Username: "",
        FirstName: "",
        LastName: "",
        Household: "",
        InviteCode: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        CreateHousehold: true
    };

    this.register = function () {

        var scope = this;

        this.model.Username = "x"; //On successful registration, this will be automatically modified.

        authSvc.register(this.model).then(function (response) {
            scope.savedSuccessfully = true;
            scope.message = "User has been registered successfully.";
            messageDelay(2, redirectCallback);
            alert(scope.message);
        },
            function (response) {
                var errors = [];
                for (var key in response.data.ModelState) {
                    for (var i = 0; i < response.data.ModelState[key].length; i++) {
                        errors.push(response.data.ModelState[key][i]);
                    }
                }
                scope.message = "Registration failure: " + errors.join(' ');
                scope.isError = true;
                messageDelay(2, registerErrorCallback, scope);
                alert(scope.message);
            });
        this.savedSuccessfully = scope.savedSuccessfully;
        
    };

    var messageDelay = function (interval, callBack, scope) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            callBack(scope);
        }, 1000 * interval);
    }

    var registerErrorCallback = function (scope) {
        scope.message = "Register a new account";
        scope.isError = false;
    }

    var redirectCallback = function () {
        $state.go('login');
    }
}])