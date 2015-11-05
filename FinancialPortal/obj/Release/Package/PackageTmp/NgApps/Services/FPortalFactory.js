app.factory('FPortalSvc', ['$http', function ($http) {

    var factory = {};
    factory.household = "Household 1"; //De-hardcode this later.
    factory.currentuser = "hhussain1629@gmail.com"; //De-hardcode this later. 

    factory.getcategoriesbyhousehold = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/Category', options).then(function (response) { return response.data });
    }

    factory.addcategory = function (household, isexpense, name) {
        var options = { params: { household: household, isexpense: isexpense, name: name } }
        return $http.get('/api/Category', options).then(function (response) { return response.data });
    }

    factory.editcategory = function (id, household, name) {
        var options = { params: { id: id, household: household, name: name } }
        return $http.get('/api/Category', options).then(function (response) { return response.data });
    }

    factory.deletecategory = function (id) {
        var options = { params: { id: id } }
        return $http.get('/api/Category', options).then(function (response) { return response.data });
    }

    factory.getincomeitems = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/BudgetItem/Income/', options).then(function (response) { return response.data; });
    }

    factory.getexpenseitems = function(household) {
        var options = { params: { household: household } };
        return $http.get('/api/BudgetItem/Expenses/', options).then(function (response) { return response.data; });
    }

    factory.addbudgetitem = function (household, categoryid, amount, annualfreq) {
        var options = { params: { household: household, categoryid: categoryid, amount: amount, annualfreq: annualfreq } };
        return $http.get('/api/BudgetItem/', options).then(function (response) { return response.data; });
    }

    factory.deletebudgetitem = function (id) {
        var options = { params: { id: id } }
        return $http.get('/api/BudgetItem/', options).then(function (response) { return response.data });
    }

    factory.gettransbyhousehold = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/Transaction/', options).then(function (response) { return response.data; });
    }

    factory.getlatesttransactions = function (number, household) {
        var options = { params: { number: number, household: household } };
        return $http.get('/api/Transaction/', options).then(function (response) { return response.data; });
    }

    factory.getmonthlyexpenses = function (household, month) {
        var options = { params: { household: household, month: month + 1 } };
        return $http.get('/api/Transaction/', options).then(function (response) { return response.data; });
    }


    factory.addtransaction = function (finaccountid, amount, description, categoryid) {
        var options = { params: { finaccountid: finaccountid, amount: amount, description: description, categoryid: categoryid } };
        return $http.get('/api/Transaction/', options).then(function (response) { return response.data; });
    }

    factory.edittransaction = function (transactionid, amount, recamount, description, categoryid) {
        var options = {
            params: {
                id: transactionid, amount: amount, reconciledamount: recamount, description: description,
                categoryid: categoryid
            }
        };
        return $http.get('/api/Transaction/', options).then(function (response) { return response.data; });
    }

    factory.deletetransaction = function (transactionid) {
        var options = { params: { id: transactionid } };
        return $http.get('/api/Transaction/Delete', options).then(function (response) { return response.data; });
    }

    //factory.getincome = function (household) {
    //    var options = { params: { household: household } };
    //    return $http.get('/api/Transaction/Income/', options).then(function (response) { return response.data; });
    //}

    //factory.getexpenses = function (household) {
    //    var options = { params: { household: household } };
    //    return $http.get('/api/Transaction/Expenses/', options).then(function (response) { return response.data; });
    //}

    factory.getfinaccounts = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/FinAccount/', options).then(function (response) { return response.data; });
    }

    factory.addfinaccount = function (household, name, balance) {
        var options = { params: { household: household, name: name, balance: balance } };
        return $http.get('/api/FinAccount/', options).then(function (response) { return response.data; });
    }

    factory.editfinaccount = function (id, name, balance, recbalance) {
        var options = { params: { id: id, name: name, balance: balance, reconciledbalance: recbalance } };
        return $http.get('/api/FinAccount/', options).then(function (response) { return response.data; });
    }

    factory.gethousemembers = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/User/', options).then(function (response) { return response.data; });
    }

    factory.addinvitation = function (tousername, toemail) {
        var options = { params: { tousername: tousername, toemail: toemail } };
        return $http.get('/api/User/', options).then(function (response) { return response.data; });
    }

    return factory;

}]);