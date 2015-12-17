'use strict';

angular.module('sejourFrontApp')
    .controller('NavbarController', function ($rootScope, $scope, $state, AuthService, ENV) {
        
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        $scope.isAuthenticated = function () {
            return $rootScope.account !== undefined;
        };

        $scope.choose = function(userType) {
        	$rootScope.userType = userType;
        };

        $scope.logout = function () {
            AuthService.logout();
        };
    });
