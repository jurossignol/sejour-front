'use strict';

angular.module('sejourFrontApp')
    .controller('NavbarController', function ($rootScope, $scope, $state, ENV) {
        
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        $scope.isAuthenticated = function () {
            return false;
        };

        $scope.choose = function(userType) {
        	$rootScope.userType = userType;
        	$state.go('home');
        };
    });
