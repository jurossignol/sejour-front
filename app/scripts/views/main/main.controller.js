'use strict';

angular.module('sejourFrontApp')
    .controller('MainController', function ($rootScope, $scope) {
    	
        $scope.nbPaid = 0;
        $scope.nbScheduled = 0;
        $scope.nbIdentityVerified = 0;
        $scope.nbCivilStateToReconstruct = 0;
        
        $scope.choose = function(userType) {
        	$rootScope.userType = userType;
        };
    });
