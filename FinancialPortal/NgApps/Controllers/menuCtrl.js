//angular.module('app')
// Path: /
app.controller('menuCtrl', ['$scope', '$state', '$stateParams', 'authSvc', function ($scope, $state, $stateParams, authSvc) {

    $scope.authentication = authSvc.authentication;
    $scope.logout = authSvc.logout;

    $scope.isMe = function () {
        if (authentication.username !== "hhussain1629@gmail.com") {
            return false;
        }
        return true;
    }

}])