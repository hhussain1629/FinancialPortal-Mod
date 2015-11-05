app.controller('FinAccountController', ['$scope', 'FPortalSvc', function ($scope, FPortalSvc) {

    $scope.household = "x";  //Later, de-hardcode the household par.
    $scope.getFinAccounts = function () {
        FPortalSvc.getfinaccounts($scope.household).then(function (data) { $scope.finAccounts = data });
    }
    $scope.getFinAccounts();


}]);
