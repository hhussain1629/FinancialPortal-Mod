app.controller('HouseholdController', ['$scope', 'FPortalSvc', 'authSvc', 'authInterceptorSvc', function ($scope, FPortalSvc, authSvc, authInterceptorSvc) {

    $("#inviteButton").hide();
    //$scope.fromUserName = "";
    $scope.toUserName = "";
    $scope.toEmail = "";

    $scope.hideFrame = function () {
        $("#inviteFrame").hide();
        $("#inviteButton").show();
    }

    $scope.showFrame = function () {
        if (authSvc.authentication.isAuth) {
            $scope.toUserName = "";
            $scope.toEmail = "";
            $("#inviteButton").hide();
            $("#inviteFrame").show();
        }
    }

    $scope.getHouseMembers = function () {
        //$scope.household = FPortalSvc.household;
        $scope.household = authSvc.authentication.household;
        FPortalSvc.gethousemembers($scope.household).then(function (data) { $scope.houseMembers = data });
    }

    $scope.inviteUser = function () {
        //$scope.fromUserName = authSvc.authentication.userName;
        FPortalSvc.addinvitation($scope.toUserName, $scope.toEmail)
            .then(function (data) {
                $scope.message = data
                alert($scope.message);
                $("#inviteFrame").hide();
                $("#inviteButton").show();
            });
    }

    $scope.hideFrame();

    if (authSvc.authentication.isAuth) {
        $scope.getHouseMembers();
        $("#inviteButton").show();
    }

}]);