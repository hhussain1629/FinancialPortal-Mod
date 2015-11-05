app.controller('TransactionController', ['$scope', '$filter','FPortalSvc', 'authSvc', 'authInterceptorSvc', function ($scope, $filter, FPortalSvc, authSvc, authInterceptorSvc) {

    $("#addTransForm").hide();
    $("#editTransForm").hide();
    $("#modButtons").hide();

    $scope.getTransactions = function () {
        $("#addTransForm").hide();
        $("#editTransForm").hide();
        $("#modButtons").hide();
        $("#addButton").show();
        $scope.selectedTransaction = [];
        //$scope.household = FPortalSvc.household;
        $scope.household = authSvc.authentication.household;
        FPortalSvc.gettransbyhousehold($scope.household).then(function (data) { $scope.transactions = data });
        $("#transTable").show();
    }

    if (authSvc.authentication.isAuth) {

        $scope.getTransactions();

        $scope.getFinAccounts = function () {
            FPortalSvc.getfinaccounts($scope.household).then(function (data) { $scope.finAccounts = data });
        }

        $scope.getCategories = function () {
            FPortalSvc.getcategoriesbyhousehold($scope.household).then(function (data) { $scope.categories = data });
        }

        $scope.dispAddForm = function () {
            $scope.selectedFinAccount = {};
            $scope.selectedCategory = {};
            $scope.description = "";
            $scope.amount = 0;
            $scope.getFinAccounts();
            $("#addButton").hide();
            $("#transTable").hide();
            $("#addTransForm").show();
        }

        $scope.addTransaction = function () {
            if (($scope.selectedFinAccount.Id == null) || ($scope.selectedCategory.Id == null)) {
                alert("To add a transaction, please choose an account and a budget category.");
                $scope.getTransactions();
            }
            else {
                FPortalSvc.addtransaction($scope.selectedFinAccount.Id, $scope.amount, $scope.description, $scope.selectedCategory.Id)
                    .then(function (data) {
                        $scope.result = data
                        $("#addTransForm").hide();
                        alert("The transaction has been added.");
                        $scope.getTransactions();
                    });
            }
        }

        $scope.$watchCollection("selectedTransaction", function () {
            if ($scope.selectedTransaction.length != 0)
                $("#modButtons").show();
        });

        $scope.dispEditForm = function () {
            $("#addButton").hide();
            $("#modButtons").hide();
            $("#transTable").hide();
            $scope.getCategories();
            $scope.date = String($scope.selectedTransaction[0].Date);
            $scope.updated = ($scope.selectedTransaction[0].Updated === null) ? "" : String($scope.selectedTransaction[0].Updated);
            $scope.selectedCategory = $scope.selectedTransaction[0].Category;
            $scope.transId = $scope.selectedTransaction[0].Id;
            $scope.description = $scope.selectedTransaction[0].Description;
            $scope.newAmount = $scope.selectedTransaction[0].Amount;
            $scope.newRecAmount = $scope.selectedTransaction[0].ReconciledAmount;
            $("#editTransForm").show();
        }

        $scope.editTransaction = function () {
            FPortalSvc.edittransaction($scope.selectedTransaction[0].Id, $scope.newAmount, $scope.newRecAmount,
                $scope.description, $scope.selectedCategory.Id)
                .then(function (data) {
                    $scope.result = data;
                    if ($scope.result[0] == 1) {
                        $("#editTransForm").hide();
                        alert("The transaction has been edited.");
                        $scope.getTransactions();
                    }
                });
        }

        $scope.deleteTransaction = function () {
            $("#addButton").hide();
            $("#modButtons").hide();
            $("#transTable").hide();
            var msg = "Are you sure you want to delete the following transaction? \n\n" +
                "Date Created: " + $filter('date')($scope.selectedTransaction[0].Date, "MMM. d, yyyy, h:mma") + "\n" +
                "Account: " + $scope.selectedTransaction[0].FinAccount.Name + "\n" +
                "Category: " + $scope.selectedTransaction[0].Category.Name + "\n" +
                "Description: " + $scope.selectedTransaction[0].Description + "\n" +
                "Amount: $" + $scope.selectedTransaction[0].Amount.toFixed(2) + "\n" +
                "Reconciled Amount: $" + $scope.selectedTransaction[0].ReconciledAmount.toFixed(2) + "\n" +
                "Date Last Updated: " + $filter('date')($scope.selectedTransaction[0].Updated, "MMM. d, yyyy, h:mma") + "\n";
            var proceed = confirm(msg);
            if (proceed) {
                FPortalSvc.deletetransaction($scope.selectedTransaction[0].Id)
                .then(function (data) {
                    $scope.result = data;
                    if ($scope.result[0] == 1) {
                        alert("The transaction has been deleted.");
                        $scope.getTransactions();
                    }
                })
            }
            else
                $scope.getTransactions();
        }

    }

}]);
