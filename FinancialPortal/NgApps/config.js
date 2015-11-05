app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'NgApps/Templates/dashboard.html'
        })
        .state('household', {
            url: '/Household',
            templateUrl: 'NgApps/Templates/Household.html',
            controller: 'HouseholdController'
        })
        .state('finaccounts', {
            url: '/FinAccounts',
            templateUrl: 'NgApps/Templates/FinAccounts.html',
            controller: 'FinAccountController'
        })
        .state('budget', {
            url: '/Budget',
            templateUrl: 'NgApps/Templates/Budget.html',
            controller: 'BudgetItemController'
        })
        .state('transactions', {
            url: '/Transactions',
            templateUrl: 'NgApps/Templates/Transactions.html',
            controller: 'TransactionController'
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
}]);

var serviceBase = 'http://localhost:54761/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorSvc');
});

app.run(['authSvc', function (authService) {
    authService.fillAuthData();
}]);