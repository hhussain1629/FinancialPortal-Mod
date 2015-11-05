app.controller('BudgetItemController', ['$scope', 'FPortalSvc', 'authSvc', 'authInterceptorSvc', function ($scope, FPortalSvc, authSvc, authInterceptorSvc) {

    $("#bottomButtons").hide();
    $("#editCatsForm").hide();
    $("#createCatForm").hide();
    $("#modCatForm").hide();
    $("#delCatForm").hide();
    $("#addBIForm").hide();
    $("#delBIForm").hide();

    $scope.getBudgetItems = function () {

        $("#bottomButtons").hide();
        $("#editCatsForm").hide();
        $("#createCatForm").hide();
        $("#modCatForm").hide();
        $("#delCatForm").hide();
        $("#addBIForm").hide();
        $("#delBIForm").hide();
        $("#topButtons").show();
        //$scope.household = FPortalSvc.household;  //Later, de-hardcode the household par.
        $scope.household = authSvc.authentication.household;
        $scope.catType = false;
        $scope.catName = "";
        $scope.amount = 0;
        $scope.annualFreq = 0;
        $scope.selectedCategory = {};
        $scope.selectedBI = [];
        $scope.getIncomeItems = function () {
            FPortalSvc.getincomeitems($scope.household)
                .then(function (data) {
                    $scope.incomeitems = data;
                    $scope.income = 0;
                    for (item in $scope.incomeitems) {
                        $scope.income += $scope.incomeitems[item].Amount * $scope.incomeitems[item].AnnualFreq;
                    }
                });
        }
        $scope.getExpenseItems = function () {
            FPortalSvc.getexpenseitems($scope.household)
                .then(function (data) {
                    $scope.expenseitems = data;
                    $scope.expenses = 0;
                    for (item in $scope.expenseitems) {
                        $scope.expenses += $scope.expenseitems[item].Amount * $scope.expenseitems[item].AnnualFreq;
                    }
                    $scope.difference = $scope.income - $scope.expenses;
                });
        }
        $scope.getIncomeItems();
        $scope.getExpenseItems();
        $("#budgetTables").show();
    }

    if (authSvc.authentication.isAuth) {

        $scope.getBudgetItems();

        $scope.$watchCollection("selectedBI", function () {
            if ($scope.selectedBI.length != 0)
                $("#bottomButtons").show();
        });

        $scope.dispEditCatsForm = function () {
            $("#topButtons").hide();
            $("#bottomButtons").hide();
            $("#budgetTables").hide();
            document.getElementById("CNC").checked = false;
            document.getElementById("EC").checked = false;
            document.getElementById("DC").checked = false;
            $("#editCatsForm").show();
        }

        $scope.dispCreateCat = function () {
            $("#topButtons").hide();
            $("#bottomButtons").hide();
            $("#editCatsForm").hide();
            $("#budgetTables").hide();
            $("#createCatForm").show();
        }

        $scope.addCategory = function () {
            FPortalSvc.addcategory($scope.household, $scope.catType, $scope.catName)
                .then(function (data) {
                    succeeded = data;
                    if (!succeeded)
                        alert('The category "' + $scope.catName + '" already exists for Household ' + $scope.household +
                            '. Please choose a different category name.');
                    else
                        alert('The category "' + $scope.catName + '" has been created.');
                    $scope.getBudgetItems();
                });
        }

        $scope.getCategories = function () {
            FPortalSvc.getcategoriesbyhousehold($scope.household).then(function (data) { $scope.categories = data });
        }

        $scope.dispModCat = function () {
            $("#topButtons").hide();
            $("#editCatsForm").hide();
            $("#bottomButtons").hide();
            $("#budgetTables").hide();
            $scope.getCategories();
            $("#modCatForm").show();
        }

        $scope.editCategory = function () {
            FPortalSvc.editcategory($scope.selectedCategory.Id, $scope.household, $scope.selectedCategory.Name)
                .then(function (data) {
                    message = data;
                    if (message != "No such category")
                        alert(message);
                    $scope.getBudgetItems();
                });
        }

        $scope.dispDelCat = function () {
            $("#topButtons").hide();
            $("#bottomButtons").hide();
            $("#editCatsForm").hide();
            $("#budgetTables").hide();
            $scope.getCategories();
            $("#delCatForm").show();
        }

        $scope.deleteCategory = function () {
            var proceed = confirm('Are you sure you want to delete the category "' + $scope.selectedCategory.Name + '"?');
            if (proceed) {
                FPortalSvc.deletecategory($scope.selectedCategory.Id)
                .then(function (data) {
                    message = data;
                    if (message != "No such category")
                        alert(message);
                    $scope.getBudgetItems();
                });
            }
            else {
                $scope.getBudgetItems();
            }
        }

        $scope.dispAddBIForm = function () {
            $("#topButtons").hide();
            $("#bottomButtons").hide();
            $("#budgetTables").hide();
            $scope.getCategories();
            $("#addBIForm").show();
        }

        $scope.addBudgetItem = function () {
            if ($scope.selectedCategory.Id == null) {
                alert("To add a budget item, a budget catgory is required.");
                $scope.getBudgetItems();
            }
            else {
                FPortalSvc.addbudgetitem($scope.household, $scope.selectedCategory.Id, $scope.amount, $scope.annualFreq)
                    .then(function (data) {
                        success = data;
                        if (success)
                            alert("The budget item has been added.");
                        $scope.getBudgetItems();
                    });
            }
        }

        $scope.deleteBudgetItem = function () {
            $("#topButtons").hide();
            $("#bottomButtons").hide();
            $("#budgetTables").hide();
            var message = 'Are you sure you want to delete the following budget item for Household "' +
                $scope.household + '"?\n' +
                'Category: ' + $scope.selectedBI[0].Category.Name + '\n' +
                'Unit Amount: $' + $scope.selectedBI[0].Amount.toFixed(2) + '\n' +
                'Annual Frequency: ' + String($scope.selectedBI[0].AnnualFreq) + '\n' +
                'Annual Amount: $' + ($scope.selectedBI[0].Amount * $scope.selectedBI[0].AnnualFreq).toFixed(2);
            var proceed = confirm(message);
            if (proceed) {
                FPortalSvc.deletebudgetitem($scope.selectedBI[0].Id)
                    .then(function (data) {
                        success = data;
                        if (success)
                            alert("The budget item has been deleted.");
                        $scope.getBudgetItems();
                    });
            }
            else
                $scope.getBudgetItems();
        }

    }

}]);