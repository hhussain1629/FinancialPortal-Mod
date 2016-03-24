// Module declarations

var app = angular.module('FinancialPortal', ['ui.router', 'trNgGrid', 'LocalStorageModule']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/Dashboard',
            templateUrl: 'NgApps/Templates/dashboard.html'
        })
        .state('household', {
            url: '/Household',
            templateUrl: 'NgApps/Templates/Household.html'
        })
        .state('finaccounts', {
            url: '/FinAccounts',
            templateUrl: 'NgApps/Templates/FinAccounts.html'
        })
        .state('budget', {
            url: '/Budget',
            templateUrl: 'NgApps/Templates/Budget.html'
        })
        .state('transactions', {
            url: '/Transactions',
            templateUrl: 'NgApps/Templates/Transactions.html'
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
      .state('account', {
          url: "/account",
          templateUrl: "NgApps/Templates/account.html",
          controller: "accountCtrl as account"
      })
      .state('entry', {
          url: "/",
          templateUrl: "NgApps/Templates/Entry.html",
          controller: 'EntryController'
      });
}]);

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