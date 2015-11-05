app.controller('FinAccountController', ['$scope', 'FPortalSvc', 'authSvc', 'authInterceptorSvc', function ($scope, FPortalSvc, authSvc, authInterceptorSvc) {

    $("#addFinAcctForm").hide();
    $("#editFinAcctForm").hide();
    $("#editButton").hide();

    $scope.getFinAccounts = function () {
        $("#addFinAcctForm").hide();
        $("#editFinAcctForm").hide();
        $("#editButton").hide();
        //$scope.household = FPortalSvc.household;
        $scope.household = authSvc.authentication.household;
        $scope.name = "";
        $scope.selectedAccount = [];
        $scope.acctId = 0;
        $scope.oldName = "";
        $scope.newName = "";
        $scope.newBalance = 0;
        $scope.newRecBalance = 0;
        FPortalSvc.getfinaccounts($scope.household).then(function (data) { $scope.finAccounts = data });
        $("#acctTable").show();
        $("#addButton").show();
    }

    if (authSvc.authentication.isAuth) {

        $scope.getFinAccounts();

        $scope.dispAddForm = function () {
            $scope.quantity = 0;
            $("#addButton").hide();
            $("#addFinAcctForm").show()
        }

        $scope.addFinAccount = function () {
            $scope.newBalance = Number($scope.quantity);
            FPortalSvc.addfinaccount($scope.household, $scope.newName, $scope.newBalance).then(function (data) {
                $scope.addresult = data;
                if ($scope.addresult) {
                    $("#addFinAcctForm").hide();
                    alert('The account "' + $scope.newName + '" has been added to household ' + $scope.household + '.');
                    $scope.getFinAccounts();
                }
                else 
                    alert("This household already has an account named ' " + $scope.newName + "'. " +
                        "Please enter a different account name.");
                    $scope.getFinAccounts();

            });
        }



        $scope.$watchCollection("selectedAccount", function () {
            if ($scope.selectedAccount.length != 0)
                $("#editButton").show();
        });

        $scope.dispEditForm = function () {
            $("#addButton").hide();
            $("#editButton").hide();
            $("#acctTable").hide();
            $scope.acctId = $scope.selectedAccount[0].Id;
            $scope.oldName = $scope.selectedAccount[0].Name;
            $scope.newName = $scope.oldName;
            $scope.newBalance = $scope.selectedAccount[0].Balance;
            $scope.newRecBalance = $scope.selectedAccount[0].ReconciledBalance;
            $("#editFinAcctForm").show();
        }

        $scope.editFinAccount = function () {
            FPortalSvc.editfinaccount($scope.acctId, $scope.newName, $scope.newBalance, $scope.newRecBalance).then(function (data) {
                $scope.editresult = data;
                if (data) {
                    $("#editFinAcctForm").hide();
                    alert('The account "' + $scope.oldName + '" has been edited.');
                    $scope.getFinAccounts();
                }
            });
        }
    }

}]);
