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