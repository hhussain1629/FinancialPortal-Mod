app.controller('EntryController', ['$scope', '$state', 'authSvc', 'authInterceptorSvc', function ($scope, $state, authSvc, authInterceptorSvc) {

    if (authSvc.authentication.isAuth)
        $state.go('dashboard');

}]);