app.controller('DashboardController', ['$scope', 'FPortalSvc', 'authSvc', 'authInterceptorSvc', function ($scope, FPortalSvc, authSvc, authInterceptorSvc) {

    $(".templateDisplay").hide();
    $(".waitMessage").hide();
    $scope.authentication = authSvc.authentication;


    $scope.getDashboardData = function () {

        $(".waitMessage").show();
        $scope.household = authSvc.authentication.household;
        //$scope.household = FPortalSvc.household;
        $scope.m = new Array(12);
        $scope.m[0] = "January";
        $scope.m[1] = "February";
        $scope.m[2] = "March";
        $scope.m[3] = "April";
        $scope.m[4] = "May";
        $scope.m[5] = "June";
        $scope.m[6] = "July";
        $scope.m[7] = "August";
        $scope.m[8] = "September";
        $scope.m[9] = "October";
        $scope.m[10] = "November";
        $scope.m[11] = "December";
        $scope.date = new Date();
        $scope.month = $scope.date.getMonth();
        $scope.monthname = $scope.m[$scope.month];
        $scope.year = $scope.date.getFullYear();
        $scope.monthlyincome = 0;
        $scope.monthlyexpenses = 0;
        FPortalSvc.getlatesttransactions(7, $scope.household).then(function (data) {
            $scope.latesttrans = data;
        });
        FPortalSvc.getfinaccounts($scope.household).then(function (data) { $scope.finAccounts = data });
        FPortalSvc.getmonthlyexpenses($scope.household, $scope.month, $scope.year)
            .then(function (data) {
                $scope.monthlyexpenses = Math.abs(data);
                FPortalSvc.getincomeitems($scope.household)
                    .then(function (data) {
                        $scope.incomeitems = data;
                        $scope.monthlyincome = 0;
                        for (item in $scope.incomeitems) {
                            $scope.monthlyincome += $scope.incomeitems[item].Amount * $scope.incomeitems[item].AnnualFreq;
                        }
                        $scope.monthlyincome /= 12;
                        $scope.maxValue = ($scope.monthlyexpenses > $scope.monthlyincome) ? $scope.monthlyexpenses : $scope.monthlyincome;
                        $scope.maxBarHeight = 200; //Must match .bargraph ul.bars li {height} in px on verticalbargraph.css
                        $(".waitMessage").hide();
                        $(".templateDisplay").show();
                });
            });

    }

    if ($scope.authentication.isAuth) {

        $scope.getDashboardData();

        //    function createCanvas(divName) {

        //        var div = document.getElementById(divName);
        //        var canvas = document.createElement('canvas');
        //        div.appendChild(canvas);
        //        if (typeof G_vmlCanvasManager != 'undefined') {
        //            canvas = G_vmlCanvasManager.initElement(canvas);
        //        }
        //        var ctx = canvas.getContext("2d");
        //        return ctx;
        //    }

        //    var ctx = createCanvas("graphDiv1");

        //    var graph = new BarGraph(ctx);
        //    graph.maxValue = ($scope.monthlyexpenses > $scope.monthlyincome) ? $scope.monthlyexpenses : $scope.monthlyincome;
        //    graph.margin = 2;
        //    graph.colors = ["#00ff00", "#ff0000"];
        //    graph.xAxisLabelArr = ["Budget", "Spending"];

        //    setInterval(function () {
        //        graph.update([$scope.incomelabel, $scope.expenselabel]);
        //    }, 1000);

        //    //graph.update([$scope.incomelabel, $scope.expenselabel]);

        

    }

}]);

