app.controller('BudgetItemController', ['$scope', 'FPortalSvc', function ($scope, FPortalSvc) {

    $scope.household = "x";  //Later, de-hardcode the household par.

    $scope.getIncomeItems = function () {
        FPortalSvc.getincomeitems($scope.household).then(function (data) { $scope.incomeitems = data });
    }
    $scope.getIncomeItems();

    $scope.getExpenseItems = function () {
        FPortalSvc.getexpenseitems($scope.household).then(function (data) { $scope.expenseitems = data });
    }
    $scope.getExpenseItems();

}]);