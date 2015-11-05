app.controller('HouseholdController', ['$scope', 'FPortalSvc', function ($scope, FPortalSvc) {

    $scope.household = "x";  //Later, de-hardcode the household par.
    $scope.getHouseMembers = function () {
        FPortalSvc.gethousemembers($scope.household).then(function (data) { $scope.houseMembers = data });
    }
    $scope.getHouseMembers();


}]);