'use strict';
//angular.module('app')
app.controller('accountCtrl', ['authSvc', '$timeout', '$state', function (authSvc, $timeout, $state) {

    this.savedSuccessfully = false;
    this.message = "Change password";
    this.isError = false;

    this.model = {
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
    };

    this.updatePassword = function () {

        var scope = this;

        if (authSvc.authentication.isAuth) {

            authSvc.changePassword(this.model).then(function (response) {
                scope.savedSuccessfully = true;
                scope.message = "Your password has been changed. Please log in again.";
                messageDelay(2, redirectCallback);
                alert(scope.message);
                authSvc.logout();
                $state.go('login');
            },
                function (response) {
                    var errors = [];
                    for (var key in response.data.ModelState) {
                        for (var i = 0; i < response.data.ModelState[key].length; i++) {
                            errors.push(response.data.ModelState[key][i]);
                        }
                    }
                    scope.message = "Failure to change password: " + errors.join(' ');
                    scope.isError = true;
                    messageDelay(2, accountErrorCallback, scope);
                    alert(scope.message);
                });
            this.savedSuccessfully = scope.savedSuccessfully;

        }

    }

    var messageDelay = function (interval, callBack, scope) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            callBack(scope);
        }, 1000 * interval);
    }

    var accountErrorCallback = function (scope) {
        scope.message = "Change password";
        scope.isError = false;
    }

    var redirectCallback = function () {
        $state.go('login');
    }
}])