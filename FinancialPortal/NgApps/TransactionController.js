app.controller('TransactionController', ['$scope', 'FPortalSvc', function ($scope, FPortalSvc) {

    $scope.household = "x";  //Later, de-hardcode the household par.
    $scope.getTransactions = function () {
        FPortalSvc.gettransbyhousehold($scope.household).then(function (data) { $scope.transactions = data });
    }
    $scope.getTransactions();

    //$scope.household = "x";  //Later, de-hardcode the household par.
    //$scope.getIncome = function () {
    //    FPortalSvc.getincome($scope.household).then(function (data) { $scope.income = data });
    //}
    //$scope.getincome();

    //$scope.household = "x";  //Later, de-hardcode the household par.
    //$scope.getExpenses = function () {
    //    FPortalSvc.getexpenses($scope.household).then(function (data) { $scope.expenses = data });
    //}
    //$scope.getexpenses();

}]);
