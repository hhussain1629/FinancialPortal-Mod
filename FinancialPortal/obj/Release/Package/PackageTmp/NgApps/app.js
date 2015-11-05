// Module declarations

var app = angular.module('FinancialPortal', ['ui.router', 'trNgGrid', 'LocalStorageModule']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/Dashboard',
            templateUrl: 'NgApps/Templates/dashboard.html'
            //controller: 'DashboardController'
        })
        .state('household', {
            url: '/Household',
            templateUrl: 'NgApps/Templates/Household.html'
            //controller: 'HouseholdController'
        })
        .state('finaccounts', {
            url: '/FinAccounts',
            templateUrl: 'NgApps/Templates/FinAccounts.html'
            //controller: 'FinAccountController'
        })
        .state('budget', {
            url: '/Budget',
            templateUrl: 'NgApps/Templates/Budget.html',
            //controller: 'BudgetItemController'
        })
        .state('transactions', {
            url: '/Transactions',
            templateUrl: 'NgApps/Templates/Transactions.html'
            //controller: 'TransactionController'
        })
        .state('login', {
            url: "/login",
            templateUrl: "NgApps/Templates/login.html",
            controller: "loginCtrl as login"
        })
      .state('home', {
          url: "/home",
          templateUrl: "NgApps/Templates/home.html",
          controller: "homeCtrl as home"
      })
      .state('register', {
          url: "/register",
          templateUrl: "NgApps/Templates/register.html",
          controller: "registerCtrl as register"
      })
      .state('entry', {
          url: "/",
          templateUrl: "NgApps/Templates/Entry.html",
          controller: 'EntryController'
      });
}]);

//angular
//    .module('app')
//    .config(config)
//        // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
//    // can be injected here. This is to prevent further system configuration during application run time.
//    .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'authService', function ($templateCache, $rootScope, $state, $stateParams, authService) {
//        // Allows to retrieve UI Router state information from inside templates
//        $rootScope.$state = $state;
//        $rootScope.$stateParams = $stateParams;

//        authService.fillAuthData();

//        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//            //For later improved security
//            var authorized = false;

//            if (toState.data.Authorize.indexOf("Anonymous") > -1)
//                authorized = true;
//            else {
//                if (authService.authentication.isAuth) {

//                    if (toState.data.Authorize.indexOf("All") > -1)
//                        authorized = true;
//                    else {
//                        angular.forEach(authService.authentication.Roles, function (value, key) {
//                            if (toState.Authorize.data.indexOf(value))
//                                authorized = true;
//                        });
//                    }
//                }
//            }
//            if (authorized == false) {
//                event.preventDefault();
//                authService.logout();
//                $state.go('login');
//            }
//        });
//    }]);

//var serviceBase = 'http://localhost:59490/';
var serviceBase = 'http://budgetmaster1.azurewebsites.net/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorSvc');
});

app.run(['authSvc', function (authService) {
    authService.fillAuthData();
}]);

app.filter("annualAmount", function () {
    return function (fieldValueUnused, item) {
        return item.Amount * item.AnnualFreq;
    }
});