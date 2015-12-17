'use strict';

angular.module('sejourFrontApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, AuthService) {
        
        $scope.rememberMe = true;
        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function (event) {
            event.preventDefault();
            AuthService.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                if($rootScope.returnToState && $rootScope.returnToState.name !== 'login') {
                    $state.go($rootScope.returnToState.name);
                } else if ($rootScope.previousStateName === 'activate' || $rootScope.previousStateName === 'register' || $state.get($rootScope.previousStateName) === null) {
                    $state.go('home');
                } else {
                    $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                }
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
    });
