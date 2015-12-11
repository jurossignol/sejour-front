'use strict';

describe('Controller : LoginController', function () {

	var $scope;

	beforeEach(function () {

		module('sejourFrontApp');

		inject(function ($controller, $rootScope) {

			$scope = $rootScope.$new();

		    $controller('LoginController', {
		    	$scope: $scope
		    });
		});
	});

	it('should remember me', function () {
		expect($scope.rememberMe).toBeTruthy();
	});
});